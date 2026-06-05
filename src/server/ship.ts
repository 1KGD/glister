import * as ORM from 'typeorm';
import Account from './account';
import * as $ from '@colyseus/schema';
import * as Colyseus from 'colyseus';
import CelestialSystem from './celestialSystem';
import ormDataSource from './ormDataSource';
import { CelestialShipState } from '../common/celestialSystemState';
import PositionState from '../common/positionState';

@ORM.Entity()
export default class Ship {
    @ORM.PrimaryGeneratedColumn("uuid")
    public readonly id: string;

    @ORM.ManyToOne(() => Account, account => account.ships, { lazy: true, cascade: true, nullable: true })
    public readonly owner: Promise<Account>;

    @ORM.Column("float")
    public x: number = 0;

    @ORM.Column("float")
    public y: number = 0;

    @ORM.Column("float")
    public z: number = 0;

    @ORM.ManyToOne(() => CelestialSystem, celestialSystem => celestialSystem.ships, { lazy: true, cascade: true, nullable: true })
    public system: Promise<CelestialSystem>;

    public constructor(owner: Account) {
        this.owner = Promise.resolve(owner);
    }

    public async setupPosition(): Promise<void> {
        this.system = Promise.resolve(await ormDataSource.manager.findOneBy(CelestialSystem, {}));
        await ormDataSource.manager.save(this);
    }

    public toSchemaState(): CelestialShipState {
        const state = new CelestialShipState;
        state.position.set(this.x, this.y, this.z);
        return state;
    }

    public positionFromState(state: PositionState): void {
        this.x = state.x;
        this.y = state.y;
        this.z = state.z;
    }
}