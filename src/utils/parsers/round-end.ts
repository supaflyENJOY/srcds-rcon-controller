import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class RoundEndParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/Team "(:<team>.*)" triggered "SFUI_Notice_(:<team_win>Terrorists_Win|CTs_Win|Target_Bombed|Target_Saved|Bomb_Defused)" \(CT "(:<ct_score>\d+)"\) \(T "(:<t_score>\d+)"\)/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'round-end',
                data: match.captures,
            };
        }
        return null;
    }
}

new RoundEndParser(); 