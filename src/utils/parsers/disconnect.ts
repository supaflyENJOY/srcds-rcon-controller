import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class DisconnectParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/"(:<name>.+)[<](:<id>\d+)[>][<](:<steamid>.*)[>][<](:<team>CT|TERRORIST|Unassigned|Spectator)[>]" disconnected/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'disconnect',
                data: match.captures,
            };
        }
        return null;
    }
}

new DisconnectParser(); 