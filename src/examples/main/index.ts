import { Server } from '../../index';
 
const server = new Server("192.168.89.2", 27015, "supa1337");    
server.on('event', (data : any) => {
    console.log('event:', data.event);
    console.log(data.data);
    if(data.event == 'kill') {
        server.rcon.command('mp_restartgame 1');
    }
});
server.on('debug', (data : any) => {
    console.log('debug', data);
}); 
server.connect().then(() => {
    console.log('connected');
});