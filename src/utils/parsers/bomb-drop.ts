import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class BombDropParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/"(:<name>.+)[<](:<id>\d+)[>][<](:<steamid>.*?)[>][<](:<team>CT|TERRORIST|Unassigned|Spectator)[>]" triggered "Dropped_The_Bomb"/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'bomb-drop',
                data: match.captures,
            };
        }
        return null;
    }
}

new BombDropParser(); 