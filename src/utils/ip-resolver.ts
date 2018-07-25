import * as isLocal from 'is-local-ip';
import * as myLocalIp from 'my-ip';
import * as myPublicIp from 'public-ip';
export default (ip : string) : Promise<string> => {
    if(isLocal(ip)) {
        console.log('Using local ip address...');
        return Promise.resolve(myLocalIp());
    }
    console.log('Using public ip address...');
    return myPublicIp.v4();
}