import {spawnCreeps} from "./spawner";
import {screep} from "./screep";

export const loop = () => {
    console.log("DAAA");
    spawnCreeps(Game.spawns['Spawn1']);

    Object.keys(Game.creeps).forEach((name) => {
        screep.run(Game.creeps[name]);
    });
};
