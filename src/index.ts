import * as dgram from 'dgram-as-promised';
import * as freeport from 'freeport-promise';
import resolveIp from './utils/ip-resolver';
import * as Rcon from 'srcds-rcon';
import { named } from 'named-regexp';
import * as events from 'events';
import { MessageParser, loadParsers } from './utils/parser';

loadParsers();

class CsgoServer {
    ip : string;
    port : number;
    rcon_password : string;
}

class Server extends events.EventEmitter {
    server : any;
    serverAddress : string;
    serverPort : number;
    rcon : any;
    csgoServer : CsgoServer;
    constructor(ip : string, port : number, rcon_password : string) {
        super();
        this.csgoServer = new CsgoServer();
        this.csgoServer.ip = ip;
        this.csgoServer.port = port;
        this.csgoServer.rcon_password = rcon_password;
    }

    connect() : Promise<void> {
        return freeport().then((port : number) => {
            this.server = dgram.createSocket('udp4', this.serverMessage.bind(this));
    
            return this.server.bind(port);
        }).then((address : any) => {
            this.serverPort = address.port;
    
            return resolveIp(this.csgoServer.ip);
        }).then((serverIp : string) => {
            this.serverAddress = serverIp;
            this.emit(`Server running on: ${this.serverAddress}:${this.serverPort}`);
        }).then(() => {
            this.rcon = Rcon({
                address: `${this.csgoServer.ip}:${this.csgoServer.port}`,
                password: this.csgoServer.rcon_password
            });
            return this.rcon.connect()
        }).then(() => {
            this.emit('debug', "Rcon connection successfull");
            return this.rcon.command(`logaddress_delall; log on; logaddress_add ${this.serverAddress}:${this.serverPort}`);
        }).then((result : any) => {
            this.emit('debug', 'Server instance successfully initialized');
        }).catch((err : Error) => {
            this.emit('error', err);
        });
    }

    serverMessage(message : any, rinfo : any) {           
        var msg = message.toString('ascii').slice(5, -1).trim();    
        let re = named(/L (:<month>\d{2})\/(:<day>\d{2})\/(:<year>\d{4}) - (:<hour>\d{2}):(:<minute>\d{2}):(:<second>\d{2}): (:<log>[\w\W]*)/);
        let match = re.exec(msg);
        let date = new Date(match.capture("year"), match.capture("month")-1, match.capture("day"), match.capture("hour"), match.capture("minute"), match.capture("second"));
        let log = match.capture("log");

        this.proceedLog(date, log);
    }

    proceedLog(date : Date, log : string) {
        let parsedResult = MessageParser.parse(log);
        if(!parsedResult) {
            parsedResult = {
                event: 'unknown',
                data: {
                    message: log
                }
            }
        }
        parsedResult.data.date = date;
        this.emit('event', parsedResult);
        this.emit(parsedResult.event, parsedResult.data);
    }
}

export {
    Server
}