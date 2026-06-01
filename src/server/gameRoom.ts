import * as Colyseus from 'colyseus';
import GameState, * as State from '../common/gameState';
import accountManager from './accountManager';
import config from '../../config';

export interface Metadata {
    name: string
}

type ClientAuth = { name: string }

type Client = Colyseus.Client<{
    messages: {
        welcome: string,
    },
    auth: ClientAuth,
}>

export default class GameRoom extends Colyseus.Room<{
    state: GameState,
    metadata: Metadata,
    client: Client,
}> {
    public override state: GameState = new GameState();

    public override readonly autoDispose = false;

    private disposeTimer: Colyseus.Delayed;

    public override messages = {
        "moveCreature": (client: Colyseus.Client, payload: { id: string, x: number, y: number }): void => {
            if (client.sessionId !== this.state.gameMaster.id) return;
            const position = this.state.creatures.get(payload.id).position;
            position.x = payload.x;
            position.y = payload.y;
        }
    };

    public override async onCreate(options: { adventureId: string }): Promise<void> {
        this.metadata = { name: (await accountManager.getAdventure(options.adventureId)).name };
    }

    public static override async onAuth(_token: string, options: { adventureId: string }, context: Colyseus.AuthContext): Promise<ClientAuth | false> {
        const tokenRegex = /token=(?<token>[\w\d-]*)/gm.exec(context.headers.get("cookie"));
        if (!tokenRegex) return false;
        const account = await accountManager.verify(tokenRegex.groups.token);
        if (!account) return false;
        //if ((await (await accountManager.getAdventure(options.adventureId)).owner).id !== account.id) return false;
        return { name: account.name };
    }

    public override onJoin(client: Client, options?: { isGameMaster: boolean, name?: string }): void {
        if (this.disposeTimer) this.disposeTimer.clear();
        if (options.isGameMaster) {
            if (this.state.gameMaster) {
                client.leave(1000, "game master already exists");
                return;
            }
            console.log("game master connected");
            this.state.gameMaster = new State.GameMasterState(client.sessionId);
            return;
        }
        const creature = new State.CreatureState(client.auth.name, State.CreatureType.Player);
        this.state.players.set(client.sessionId, new State.PlayerState(options.name, this.state.addCreature(creature)));
    }

    private attemptTimeout(): void {
        if (this.clients.length === 0) this.disposeTimer = this.clock.setTimeout(() => this.disconnect(), config.multiplayer.roomTimeout);
    }

    public override onLeave(client: Client): void {
        this.attemptTimeout();
        if (this.state.gameMaster?.id === client.sessionId) {
            this.state.gameMaster = null;
            return;
        };
        this.state.creatures.delete(this.state.players.get(client.sessionId).creatureId);
        this.state.players.delete(client.sessionId);
    }
}