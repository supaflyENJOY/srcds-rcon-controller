import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class ThrowParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/"(:<name>.+)[<](:<id>\d+)[>][<](:<steamid>.*)[>][<](:<team>CT|TERRORIST|Unassigned|Spectator|Console)[>]" threw (:<grenade>.*) \[(:<x>[-\d]+) (:<y>[-\d]+) (:<z>[-\d]+)\]/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'throw',
                data: match.captures,
            };
        }
        return null;
    }
}

new ThrowParser(); 