const NAME = "harvester";
const getBody = () => [WORK, CARRY, MOVE];
const run = (creep) => {
    if (creep.carry.energy < creep.carryCapacity) {
        const sources = creep.room.find(FIND_SOURCES_ACTIVE);
        const bestSource = getBestSource(sources, creep.pos);

        if (creep.harvest(bestSource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(bestSource, {...visualizePath});
        }
    }
    else {
        const targets = creep.room.find(FIND_STRUCTURES, {filter: needsEnergy});
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {...visualizePath});
            }
        } else {
            const spawn = creep.room.find(FIND_MY_SPAWNS);
            creep.moveTo(spawn[0], {...visualizePath});
        }
    }
};

export const harvester = {
    NAME,
    getBody,
    run,
};

const visualizePath = {visualizePathStyle: {}};

const needsEnergy = (structure) => (
    structure.structureType === STRUCTURE_EXTENSION ||
    structure.structureType === STRUCTURE_SPAWN ||
    structure.structureType === STRUCTURE_TOWER
) && structure.energy < structure.energyCapacity;

function getBestSource(sources, pos) {
    const a = sources.filter((source) => source.energy > 50);
    const distances = a.map((source) => Math.hypot((pos.x - source.pos.x) + (pos.y - source.pos.y)));
    let best = 0;
    a.forEach((source, index) => {
        if (distances[best] > distances[index]) {
            best = index;
        }
    });

    return a[best];
}
