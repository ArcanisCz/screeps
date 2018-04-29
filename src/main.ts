// import {spawnCreeps} from "./spawner";
// import {screep} from "./screep";
import {Ai} from "./Ai";

export const loop = () => {
    Ai.init();
    Ai.run();
    // spawnCreeps(Game.spawns['Spawn1']);
    //
    // Object.keys(Game.creeps).forEach((name) => {
    //     screep.run(Game.creeps[name]);
    // });
};
