import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class PlayerConnectedParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/"(:<name>.+)[<](:<id>\d+)[>][<](:<steamid>.*)[>]<>" connected(?:, address "(:<ip>.*)")?/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'player-connected',
                data: match.captures,
            };
        }
        return null;
    }
}

new PlayerConnectedParser();