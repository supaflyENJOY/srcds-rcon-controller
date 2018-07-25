import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class AssistParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/"(:<assister_name>.+)[<](:<assister_id>\d+)[>][<](:<assister_steamid>.*)[>][<](:<assister_team>CT|TERRORIST|Unassigned|Spectator|Console)[>]" assisted killing "(:<enemy_name>.+)[<](:<enemy_id>\d+)[>][<](:<enemy_steamid>.*)[>][<](:<enemy_team>CT|TERRORIST|Unassigned|Spectator|Console)[>]"/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'assist',
                data: match.captures,
            };
        }
        return null;
    }
}

new AssistParser(); 