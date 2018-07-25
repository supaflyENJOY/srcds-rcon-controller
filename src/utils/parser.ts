import * as requireDir from 'require-dir';

const loadParsers = () => {
    requireDir('./parsers');
}

class ServerEvent {
    event : string;
    data : any;
}

abstract class MessageParser {
    public static parsers : MessageParser[] = [];

    constructor() {
        MessageParser.parsers.push(this);
    }
    public abstract parse(message : string) : ServerEvent;

    public static parse(message : string) : ServerEvent {
        for(let parser of MessageParser.parsers) {
            let result = parser.parse(message);
            if(result !== null) {
                return result;
            }
        }
        return null;
    }
}
export {
    loadParsers,
    MessageParser,
    ServerEvent
}