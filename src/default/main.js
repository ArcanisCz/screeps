import {spawnCreeps} from "spawner";
import {screep} from "./screep";

export const loop = () => {
    spawnCreeps(Game.spawns['Spawn1']);

    Object.keys(Game.creeps).forEach((name) => {
        screep.run(Game.creeps[name]);
    });


    // console.log(neco);
    // const creep = getCreep();
    // if(creep.carry.energy < creep.carryCapacity){
    //     const sources = creep.room.find(FIND_SOURCES);
    //     const best = getBestSource(sources, creep.pos);
    //
    //     if(creep.harvest(best) === ERR_NOT_IN_RANGE) {
    //         creep.moveTo(best);
    //     }
    // } else if (Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
    //     if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    //         creep.moveTo(Game.spawns['Spawn1'],  {visualizePathStyle: {stroke: '#ffaa00'}});
    //     }
    // }

};

// const getCreep = () => {
//     Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvester1');
//     return Game.creeps["Harvester1"];
// }
//

