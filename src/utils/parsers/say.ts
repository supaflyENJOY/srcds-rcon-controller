import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class SayParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/"(:<name>.+)[<](:<id>\d+)[>][<](:<steamid>.*)[>][<](:<team>CT|TERRORIST|Unassigned|Spectator|Console)[>]" say(:<say_team>_team)? "(:<text>.*)"/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'say',
                data: match.captures,
            };
        }
        return null;
    }
}

new SayParser(); 