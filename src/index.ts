import * as dgram from 'dgram-as-promised';
import * as freeport from 'freeport-promise';
import resolveIp from './utils/ip-resolver';
import * as Rcon from 'srcds-rcon';
class Server {
    server : any;
    serverAddress : string;
    serverPort : number;
    rcon : any;
    constructor(ip : string, port : number, rcon_password : string) {
        freeport().then((port : number) => {
            this.server = dgram.createSocket('udp4', this.serverMessage.bind(this));
    
            return this.server.bind(port);
        }).then((address : any) => {
            this.serverPort = address.port;
    
            return resolveIp(ip);
        }).then((serverIp : string) => {
            this.serverAddress = serverIp;
            console.log(`Server running on: ${this.serverAddress}:${this.serverPort}`);
        }).then(() => {
            this.rcon = Rcon({
                address: `${ip}:${port}`,
                password: rcon_password
            });
            return this.rcon.connect()
        }).then(() => {
            console.log("Rcon connection successfull");
            return this.rcon.command(`logaddress_delall; log on; logaddress_add ${this.serverAddress}:${this.serverPort}`);
        }).then((result : any) => {
            console.log('Server instance successfully initialized');
        }).catch((err : Error) => {
            console.error(err);
            process.exit(1);
        });
    }

    serverMessage(message : any, rinfo : any) {           
        var msg = message.toString('ascii').slice(5, -1);    
        console.log(msg);
    }
}

export {
    Server
}