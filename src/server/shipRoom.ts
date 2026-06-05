import * as Colyseus from 'colyseus';
import Account from './account';
import ShipState from '../common/shipState';

interface ShipMetadata {
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
}
