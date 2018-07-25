import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class JoinTeamParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/"(:<name>.+)[<](:<id>\d+)[>][<](:<steamid>.*)[>]" switched from team [<](:<team>CT|TERRORIST|Unassigned|Spectator)[>] to [<](:<new_team>CT|TERRORIST|Unassigned|Spectator)[>]/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'join-team',
                data: match.captures,
            };
        }
        return null;
    }
}

new JoinTeamParser(); 