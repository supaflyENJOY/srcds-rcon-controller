import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class KillParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/"(:<killer_name>.+)[<](:<killer_id>\d+)[>][<](:<killer_steamid>.*)[>][<](:<killer_team>CT|TERRORIST|Unassigned|Spectator|Console)[>]" \[(:<killer_x>[-\d]+) (:<killer_y>[-\d]+) (:<killer_z>[-\d]+)\] killed "(:<enemy_name>.+)[<](:<enemy_id>\d+)[>][<](:<enemy_steamid>.*)[>][<](:<enemy_team>CT|TERRORIST|Unassigned|Spectator|Console)[>]" \[(:<enemy_x>[-\d]+) (:<enemy_y>[-\d]+) (:<enemy_z>[-\d]+)\] with "(:<weapon>.+)"(:<headshot> \(headshot\))?/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'kill',
                data: match.captures,
            };
        }
        return null;
    }
}

new KillParser(); 