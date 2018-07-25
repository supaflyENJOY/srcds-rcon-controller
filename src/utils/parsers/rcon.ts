import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class RconParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/rcon from "(:<ip>.*)": command "(:<command>.*)"/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'rcon',
                data: match.captures,
            };
        }
        return null;
    }
}

new RconParser(); 