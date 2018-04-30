import {MySource} from "./MySource";

export class MyCreep {
    private creep: Creep;
    public carry: StoreDefinition;
    public carryCapacity: number;

    constructor(name: string) {
        this.creep = Game.creeps[name];
        this.carry = this.creep.carry;
        this.carryCapacity = this.creep.carryCapacity;
    }

    public isSpawning(): boolean {
        return this.creep.spawning;
    }

    harvest(source: Source) {
        return this.creep.harvest(source);
    }

    moveTo(target) {
        return this.creep.moveTo(target);
    }

    transfer(target, resource: string) {
        return this.creep.transfer(target, resource);
    }

    toString() {
        return `[MyCreep ${this.creep.name}]`;
    }
}
