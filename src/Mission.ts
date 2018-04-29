import {Spawner} from "./Spawner";
import {MyCreep} from "./MyCreep";

export abstract class Mission {
    private readonly name: String;
    private readonly spawner: Spawner;

    protected constructor(name: String) {
        this.name = name;
        this.spawner = new Spawner("Spawn1");
    }

    public initCreeps(){}

    public abstract run();

    protected getCreeps(role: string, body: string[], count: number): MyCreep[] {
        const creeps = Object.keys(Game.creeps)
            .filter((name) => name.startsWith(`${this.name}_${role}`))
            .map((name) => new MyCreep(name));
        if(creeps.length < count){
            this.spawner.spawnCreep(body, `${this.name}_${role}_${getRandomInt(1, 9999)}`)
        }
        return creeps
            .filter((creep) => !creep.isSpawning());
    }
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
