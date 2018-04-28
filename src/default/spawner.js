import {screep} from "./screep";

const desiredCreeps = {
    [screep.HARVESTER]: 1,
    [screep.UPGRADER]: 1,
};

export const spawnCreeps = (spawner) => {
    if (spawner.spawning) {
        spawner.room.visual.text(
            '🛠️' + spawner.spawning.name,
            spawner.pos.x + 1,
            spawner.pos.y,
            {align: 'left', opacity: 0.8});
    } else {
        const toSpawn = Object.keys(desiredCreeps)
            .reduce((acc, role) => {
                for(let i = 0; i < desiredCreeps[role]; i++){
                    acc.push([screep.getBody(role), role+" "+i, {memory: {role}}])
                }
                return acc;
            }, [])
            .filter(creepNotExists)
            .filter(canCreate(spawner));

        if (toSpawn.length > 0) {
            spawner.spawnCreep(...toSpawn[0]);
        }
    }
};

const creepNotExists = (creep) => !Game.creeps[creep[1]];
const canCreate = (spawner) => (creep) => spawner.spawnCreep(...creep, {dryRun: true}) === OK;
