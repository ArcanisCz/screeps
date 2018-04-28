
const desiredCreeps = [
    [[WORK, CARRY, MOVE], 'Basic harvester 1'],
    [[WORK, CARRY, MOVE], 'Basic harvester 2'],
    [[WORK, CARRY, MOVE], 'Basic harvester 3'],
];

export const spawnCreeps = (spawner) => {
    const toSpawn = desiredCreeps
        .filter(creepNotExists)
        .filter(canCreate(spawner));

    if(toSpawn.length > 0){
        spawner.spawnCreep(...toSpawn[0]);
    }
};

const creepNotExists = (creep) => !Game.creeps[creep[1]];
const canCreate = (spawner) => (creep) => spawner.spawnCreep(...creep, {dryRun: true}) === OK;
