import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class PurchaseParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/"(:<name>.+)[<](:<id>\d+)[>][<](:<steamid>.*)[>][<](:<team>CT|TERRORIST|Unassigned|Spectator|Console)[>]" purchased "(:<weapon>.*)"/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'purchase',
                data: match.captures,
            };
        }
        return null;
    }
}

new PurchaseParser(); 