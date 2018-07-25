import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class BombPlantParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/"(:<name>.+)[<](:<id>\d+)[>][<](:<steamid>.*)[>][<](:<team>CT|TERRORIST|Unassigned|Spectator|Console)[>]" triggered "Planted_The_Bomb"/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'bomb-plant',
                data: match.captures,
            };
        }
        return null;
    }
}

new BombPlantParser(); 