import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class EnteredGameParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/"(:<name>.+)[<](:<id>\d+)[>][<](:<steamid>.*)[>]<>" entered the game/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'entered-game',
                data: match.captures,
            };
        }
        return null;
    }
}

new EnteredGameParser();