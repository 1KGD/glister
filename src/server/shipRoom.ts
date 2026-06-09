import * as Colyseus from 'colyseus';
import Account from './account';
import ShipState from '../common/shipState';

interface ShipMetadata {
    readonly shipId: string;
}

type CelestialSystemClient = Colyseus.Client<{
    messages: {
    },
    auth: Account,
}>

export default class ShipRoom extends Colyseus.Room<{
    state: ShipState,
    metadata: ShipMetadata,
    client: CelestialSystemClient,
}> {
    public override state: ShipState;

    public override onCreate(options: { shipId: string }): void {
        this.metadata = { shipId: options.shipId };
        this.state = new ShipState;
    }
}
