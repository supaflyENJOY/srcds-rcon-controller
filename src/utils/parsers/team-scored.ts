import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class TeamScoredParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/Team "(:<team>.*)" scored "(:<score>\d*)" with "(:<players>\d*)" players/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'team-scored',
                data: match.captures,
            };
        }
        return null;
    }
}

new TeamScoredParser(); 