import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class MatchStartParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/World triggered "Match_Start" on "(:<map>.*)"/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'match-start',
                data: match.captures,
            };
        }
        return null;
    }
}

new MatchStartParser(); 