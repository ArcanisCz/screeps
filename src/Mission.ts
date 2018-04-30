import {MySpawn} from "./MySpawn";
import {MyCreep} from "./MyCreep";

export abstract class Mission {
    protected readonly name: string;
    protected readonly spawn: MySpawn;

    protected constructor(name: string, spawn: MySpawn) {
        this.name = name;
        this.spawn = spawn;
    }

    public initCreeps(){}

    public abstract run();

    protected getCreeps(role: string, body: string[], count: number): MyCreep[] {
        const creeps = Object.keys(Game.creeps || [])
            .filter((name) => name.startsWith(`${this.name}_${role}`))
            .map((name) => new MyCreep(name));
        if(creeps.length < count){
            this.spawn.spawnCreep(body, `${this.name}_${role}_${getRandomInt(1, 9999)}`)
        }
        return creeps
            .filter((creep) => !creep.isSpawning());
    }
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
