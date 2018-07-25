import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class FreezeStartParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/Starting Freeze period/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'freeze-start',
                data: match.captures,
            };
        }
        return null;
    }
}

new FreezeStartParser(); 