import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class MapLoadingParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/Loading map "(:<map>.*?)"/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'map-loading',
                data: match.captures,
            };
        }
        return null;
    }
}

new MapLoadingParser(); 