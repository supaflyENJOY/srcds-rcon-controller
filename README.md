# SRCDS Server Controller
## Development
Library fully written using TypeScript and transpiled to ES5.

Currently, i have created event parsers for CS:GO SRCDS server, but you can create your own parsers (examples could be found in `src/utils/parsers/`)

Server instance extends EventEmitter, so you may use `.on` to receive server events

You can find example in `src/examples/main/index.ts`

## Events

### event
> Main event, using which you can receive all other events
#### Fields
Field | Type | Comment
--- | --- | ---
*event* | `string` | Event name
*data* | `any` | Event attributes

### unknown
> Unresolved event for which you may write parser
#### Fields
Field | Type | Comment
--- | --- | ---
*message* | `string` | Log string

### assist
> Emitted when obtained assisted kill
#### Fields
Field | Type | Comment
--- | --- | ---
*assister_name* | `string` | Assister name
*assister_id* | `number` | Assister id
*assister_steamid* | `string` | Assister steamid
*assister_team* | `string` | Assister team (**CT**, **TERRORIST**)
*enemy_name* | `string` | Enemy name
*enemy_id* | `number` | Enemy id
*enemy_steamid* | `string` | Enemy steamid
*enemy_team* | `string` | Enemy team (**CT**, **TERRORIST**)

### bomb-drop
> Emitted when bomb dropped by player to the ground
#### Fields
Field | Type | Comment
--- | --- | ---
*name* | `string` | Carry name
*id* | `number` | Carry id
*steamid* | `string` | Carry steamid
*team* | `string` | Carry team (**CT**, **TERRORIST**)

### bomb-pickup
> Emitted when bomb picked up by player
#### Fields
Field | Type | Comment
--- | --- | ---
*name* | `string` | Carry name
*id* | `number` | Carry id
*steamid* | `string` | Carry steamid
*team* | `string` | Carry team (**CT**, **TERRORIST**)

### bomb-plant
> Emitted when bomb has been planted
#### Fields
Field | Type | Comment
--- | --- | ---
*name* | `string` | Player name
*id* | `number` | Player id
*steamid* | `string` | Player steamid
*team* | `string` | Player team (**CT**, **TERRORIST**)

### clantag
> Emitted when clantag being assigned to player
#### Fields
Field | Type | Comment
--- | --- | ---
*name* | `string` | Player name
*id* | `number` | Player id
*steamid* | `string` | Player steamid
*team* | `string` | Player team (**CT**, **TERRORIST**)
*clantag* | `string` | Assigned clan tag

### cvar
> Emitted when server changed cvar
#### Fields
Field | Type | Comment
--- | --- | ---
*var* | `string` | Variable name
*value* | `any` | Variable value

### disconnect
> Emitted when player disconnect
#### Fields
Field | Type | Comment
--- | --- | ---
*name* | `string` | Player name
*id* | `number` | Player id
*steamid* | `string` | Player steamid
*team* | `string` | Player team (**CT**, **TERRORIST**)

### entered-game
> Emitted when player entered the game
#### Fields
Field | Type | Comment
--- | --- | ---
*name* | `string` | Player name
*id* | `number` | Player id
*steamid* | `string` | Player steamid

### freeze-start
> Emitted when freeze-time started

### join-team
> Emitted when player joining the team
#### Fields
Field | Type | Comment
--- | --- | ---
*name* | `string` | Player name
*id* | `number` | Player id
*steamid* | `string` | Player steamid
*team* | `string` | Player previous team (**CT**, **TERRORIST**)
*new_team* | `string` | Player new team (**CT**, **TERRORIST**)

### kill
> Emitted when player joining the team
#### Fields
Field | Type | Comment
--- | --- | ---
*killer_name* | `string` | Killer name
*killer_id* | `number` | Killer id
*killer_steamid* | `string` | Killer steamid
*killer_team* | `string` | Killer team (**CT**, **TERRORIST**)
*killer_x* | `number` | Killer x position
*killer_y* | `number` | Killer y position
*killer_z* | `number` | Killer z position
*enemy_name* | `string` | Enemy name
*enemy_id* | `number` | Enemy id
*enemy_steamid* | `string` | Enemy steamid
*enemy_team* | `string` | Enemy team (**CT**, **TERRORIST**)
*enemy_x* | `number` | Enemy x position
*enemy_y* | `number` | Enemy y position
*enemy_z* | `number` | Enemy z position
*weapon* | `string` | Weapon used to kill
*headshot* | `any` | undefined if not headshot or string

### map-loading
> Emitted when map started loading
#### Fields
Field | Type | Comment
--- | --- | ---
*map* | `string` | Map name

### map-started
> Emitted when map started
#### Fields
Field | Type | Comment
--- | --- | ---
*map* | `string` | Map name

### match-start
> Emitted when match starting
#### Fields
Field | Type | Comment
--- | --- | ---
*map* | `string` | Map name

### player-connected
> Emitted when player connected
#### Fields
Field | Type | Comment
--- | --- | ---
*name* | `string` | Player name
*id* | `number` | Player id
*steamid* | `string` | Player steamid
*ip* | `string` | Player ip

### purchase
> Emitted when player purchased item
#### Fields
Field | Type | Comment
--- | --- | ---
*name* | `string` | Player name
*id* | `number` | Player id
*steamid* | `string` | Player steamid
*team* | `string` | Player team (**CT**, **TERRORIST**)
*weapon* | `string` | Purchased item

### rcon
> Emitted when received rcon command
#### Fields
Field | Type | Comment
--- | --- | ---
*ip* | `string` | Sender IP
*command* | `string` | Command

### round-end
> Emitted when round end
#### Fields
Field | Type | Comment
--- | --- | ---
*team* | `string` | Winner team
*team_win* | `string` | Win reason
*ct_score* | `number` | CT score after round
*t_score* | `number` | T score after round

### round-restart
> Emitted when round restarting
#### Fields
Field | Type | Comment
--- | --- | ---
*seconds* | `number` | Delay in seconds

### round-start
> Emitted when round started(after freezetime)

### say
> Emitted when say in chat
#### Fields
Field | Type | Comment
--- | --- | ---
*name* | `string` | Player name
*id* | `number` | Player id
*steamid* | `string` | Player steamid
*team* | `string` | Player team (**CT**, **TERRORIST**)
*say_team* | `any` | string if message in team chat or undefined
*text* | `string` | Message

### suicide
> Emitted when player suiceded
#### Fields
Field | Type | Comment
--- | --- | ---
*name* | `string` | Player name
*id* | `number` | Player id
*steamid* | `string` | Player steamid
*team* | `string` | Player team (**CT**, **TERRORIST**)
*x* | `number` | Player x position
*y* | `number` | Player y position
*z* | `number` | Player z position
*weapon* | `string` | Reason of suicide

### team-scored
> Emitted when team scored points
#### Fields
Field | Type | Comment
--- | --- | ---
*team* | `string` | Team name
*score* | `number` | Score value
*players* | `number` | Players count

### throw
> Emitted when player throw nade
#### Fields
Field | Type | Comment
--- | --- | ---
*name* | `string` | Player name
*id* | `number` | Player id
*steamid* | `string` | Player steamid
*team* | `string` | Player team (**CT**, **TERRORIST**)
*x* | `number` | Player x position
*y* | `number` | Player y position
*z* | `number` | Player z position
*grenade* | `string` | Grenade name