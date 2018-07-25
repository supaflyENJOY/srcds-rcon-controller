import * as isLocal from 'is-local-ip';
import * as myLocalIp from 'my-ip';
import * as myPublicIp from 'public-ip';
export default (ip : string) : Promise<string> => {
    if(isLocal(ip)) {
        return Promise.resolve(myLocalIp());
    }
    return myPublicIp.v4();
}