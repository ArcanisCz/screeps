export class MyCreep {
    private creep: Creep;

    constructor(name: string) {
        this.creep = Game.creeps[name];
    }

    public isSpawning(): boolean {
        return this.creep.spawning;
    }

    toString(){
        return `[MyCreep ${this.creep.name}]`;
    }
}
