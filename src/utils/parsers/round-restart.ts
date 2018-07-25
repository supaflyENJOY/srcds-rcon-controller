import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class RoundRestartParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/World triggered "Restart_Round_\((:<seconds>\d*)_seconds?\)"/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'round-restart',
                data: match.captures,
            };
        }
        return null;
    }
}

new RoundRestartParser(); 