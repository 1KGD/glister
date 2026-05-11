import * as Colyseus from 'colyseus';
import GameState from '../common/gameState';

interface Metadata {

}

type Client = Colyseus.Client<{
    messages: {
        welcome: string,
    }
}>

export class GameRoom extends Colyseus.Room<{
    state: GameState,
    metadata: Metadata,
    client: Client,
}> {
    public override state: GameState = new GameState();

    public override onJoin(client: Client, options?: {}): void {
        client.send("welcome", "Welcome to the room!");
    }
}