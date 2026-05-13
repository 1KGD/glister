import * as Colyseus from 'colyseus';
import GameState, { GameMasterState, PlayerState } from '../common/gameState';

interface Metadata {

}

type Client = Colyseus.Client<{
    messages: {
        welcome: string,
    },
}>

export class GameRoom extends Colyseus.Room<{
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
            this.state.gameMaster = new GameMasterState(client.sessionId);
            return;
        }
        this.state.players.set(client.sessionId, new PlayerState(options.name));
    }

    public override onLeave(client: Client): void {
        if (this.state.gameMaster?.id === client.sessionId) {
            this.state.gameMaster = null;
            return;
        }
        this.state.players.delete(client.sessionId);
    }
}