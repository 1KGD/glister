import * as Colyseus from 'colyseus';
import GameState, * as State from '../common/gameState';

interface Metadata {

}

type Client = Colyseus.Client<{
    messages: {
        welcome: string,
    },
}>

export default class GameRoom extends Colyseus.Room<{
    state: GameState,
    metadata: Metadata,
    client: Client,
}> {
    public override state: GameState = new GameState();

    public override messages = {
        "moveCreature": (client: Colyseus.Client, payload: { idx: number, x: number, y: number }): void => {
            if (client.sessionId !== this.state.gameMaster.id) return;
            const position = this.state.creatures[payload.idx].position;
            position.x = payload.x;
            position.y = payload.y;
        }
    };

    public override onJoin(client: Client, options?: { isGameMaster: boolean, name?: string }): void {
        if (options.isGameMaster) {
            if (this.state.gameMaster) {
                client.leave(1000, "game master already exists");
                return;
            }
            console.log("game master connected");
            this.state.gameMaster = new State.GameMasterState(client.sessionId);
            return;
        }
        const creature = new State.CreatureState(client.sessionId, State.CreatureType.Player);
        this.state.players.set(client.sessionId, new State.PlayerState(options.name, creature));
        this.state.creatures.push(creature);
    }

    public override onLeave(client: Client): void {
        if (this.state.gameMaster?.id === client.sessionId) {
            this.state.gameMaster = null;
            return;
        };
        this.state.creatures.splice(this.state.creatures.indexOf(this.state.players.get(client.sessionId).creature), 1);
        this.state.players.delete(client.sessionId);
    }
}