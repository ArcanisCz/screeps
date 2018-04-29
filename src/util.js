export const getClosest = (objectsWithPos, pos) => {
    const distances = objectsWithPos.map((obj) => Math.hypot((obj.pos.x - pos.x), (obj.pos.y - pos.y)));
    let best = 0;
    objectsWithPos.forEach((source, index) => {
        if (distances[best] > distances[index]) {
            best = index;
        }
    });

    return objectsWithPos[best];
};

export const needsEnergy = (structure) => (
    structure.structureType === STRUCTURE_EXTENSION ||
    structure.structureType === STRUCTURE_SPAWN ||
    structure.structureType === STRUCTURE_TOWER
) && structure.energy < structure.energyCapacity;

export const visualizePath = {visualizePathStyle: {}};
