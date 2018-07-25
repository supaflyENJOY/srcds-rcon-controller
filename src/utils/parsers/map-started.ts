import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class MapStartedParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/Started map "(:<map>.*?)"/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'map-started',
                data: match.captures,
            };
        }
        return null;
    }
}

new MapStartedParser(); 