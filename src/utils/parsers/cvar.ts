import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class CvarParser extends MessageParser {

    parse(message : string) : ServerEvent {
        let re = named(/"(:<var>.*)" = "(:<value>.*)"/);
        let match = re.exec(message);
        if(match !== null) {
            return {
                event: 'cvar',
                data: match.captures,
            };
        }
        re = named(/server_cvar: "(:<var>.*)" "(:<value>.*)"/);
        match = re.exec(message);
        if(match !== null) {
            return {
                event: 'cvar',
                data: match.captures,
            };
        }
        return null;
    }
}

new CvarParser(); 