import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class RoundStartParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/World triggered "Round_Start"/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'round-start',
                data: match.captures,
            };
        }
        return null;
    }
}

new RoundStartParser(); 