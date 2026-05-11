import * as Colyseus from 'colyseus';
import GameState, { GameMasterState } from '../common/gameState';

interface Metadata {

}

type Client = Colyseus.Client<{
    messages: {
        error: string,
        welcome: string,
    },
}>

export class GameRoom extends Colyseus.Room<{
    state: GameState,
    metadata: Metadata,
    client: Client,
}> {
    public override state: GameState = new GameState();

    public override onJoin(client: Client, options?: { isGameMaster: boolean }): void {
        if (options.isGameMaster) {
            if (this.state.gameMaster) {
                client.leave(1000, "game master already exists");
                return;
            }
            console.log("game master connected");
            this.state.gameMaster = new GameMasterState(client.sessionId);
        }
    }
}