import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class SuicideParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/"(:<name>.+)[<](:<id>\d+)[>][<](:<steamid>.*)[>][<](:<team>CT|TERRORIST|Unassigned|Spectator|Console)[>]" \[(:<x>[-\d]+) (:<y>[-\d]+) (:<z>[-\d]+)\] committed suicide with "(:<weapon>.+)"/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'suicide',
                data: match.captures,
            };
        }
        return null;
    }
}

new SuicideParser(); 