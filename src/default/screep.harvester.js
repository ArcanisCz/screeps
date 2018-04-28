const NAME = "harvester";
const getBody = () => [WORK, CARRY, MOVE];
const run = (creep) => {
    if (creep.carry.energy < creep.carryCapacity) {
        const sources = creep.room.find(FIND_SOURCES_ACTIVE);
        if (sources.length > 0) {
            const closest = getClosest(sources, creep.pos);
            if (creep.harvest(closest) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closest, {...visualizePath});
            }
        }
    } else {
        const targets = creep.room.find(FIND_STRUCTURES, {filter: needsEnergy});
        if (targets.length > 0) {
            const closest = getClosest(targets, creep.pos);
            if (creep.transfer(closest, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closest, {...visualizePath});
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

function getClosest(objectsWithPos, pos) {
    const distances = objectsWithPos.map((obj) => Math.hypot((obj.pos.x - pos.x), (obj.pos.y - pos.y)));
    let best = 0;
    objectsWithPos.forEach((source, index) => {
        if (distances[best] > distances[index]) {
            best = index;
        }
    });

    return objectsWithPos[best];
}
