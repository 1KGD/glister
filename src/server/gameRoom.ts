import * as Colyseus from 'colyseus';
import GameState, * as State from '../common/gameState';
import accountManager from './accountManager';
import config from '../../config';

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
    public override state: GameState = new GameState();

    public override messages = {

    };

    public override async onCreate(options: { adventureId: string }): Promise<void> {
    }

    /*
    public static override async onAuth(_token: string, options: { adventureId: string }, context: Colyseus.AuthContext): Promise<ClientAuth | false> {
        const tokenRegex = /token=(?<token>[\w\d-]*)/gm.exec(context.headers.get("cookie"));
        if (!tokenRegex || !tokenRegex.groups.token) return false;
        const account = await accountManager.verify(tokenRegex.groups.token);
        if (!account) return false;
        return { name: account.name };
    }*/

    public override onJoin(client: Client, options?: {}): void {
    }

    public override onLeave(client: Client): void {
    }
}