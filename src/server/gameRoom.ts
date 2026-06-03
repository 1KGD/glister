import * as Colyseus from 'colyseus';
import GameState, * as State from '../common/gameState';
import accountManager from './accountManager';
import config from '../../config';
import PlayerState from '../common/playerState';

export interface Metadata {
}

type ClientAuth = { name: string }

type Client = Colyseus.Client<{
    messages: {
    },
    auth: ClientAuth,
}>

export default class GameRoom extends Colyseus.Room<{
    state: GameState,
    metadata: Metadata,
    client: Client,
}> {
    public override state: GameState;

    public override messages = {

    };

    public override onCreate(options: { systemId: string }): void {
        this.state = new GameState(options.systemId);
    }

    public override async onAuth(_client: Colyseus.Client, _options: unknown, context: Colyseus.AuthContext): Promise<ClientAuth | boolean> {
        const tokenRegex = /token=(?<token>[\w\d-]*)/gm.exec(context.headers.get("cookie"));
        if (!tokenRegex || !tokenRegex.groups?.token) return false;
        const account = await accountManager.verify(tokenRegex.groups.token);
        if (!account) return false;
        return { name: account.name };
    }

    public override onJoin(client: Client, options?: {}): void {
        this.state.players.set(client.sessionId, new PlayerState(client.auth.name));
    }

    public override onLeave(client: Client): void {
    }
}