import { MessageParser, ServerEvent } from '../parser';
import { named } from 'named-regexp';

class ClantagParser extends MessageParser {

    parse(message : string) : ServerEvent {
        const re = named(/"(:<name>.+)[<](:<id>\d+)[>][<](:<steamid>.*?)[>][<](:<team>CT|TERRORIST|Unassigned|Spectator)[>]" triggered "clantag" \(value "(:<clantag>.*)"\)/);
        const match = re.exec(message);
        if(match !== null) {
            return {
                event: 'clantag',
                data: match.captures,
            };
        }
        return null;
    }
}

new ClantagParser(); 