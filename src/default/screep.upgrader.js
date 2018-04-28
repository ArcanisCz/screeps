import {harvester} from "screep.harvester";

const NAME = "upgrader";
const getBody = () => [WORK, CARRY, MOVE, MOVE];
const run = (creep) => {
    if (creep.memory.upgrading && creep.carry.energy === 0) {
        creep.memory.upgrading = false;
        creep.say('🔄 harvest');
    }
    if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
        creep.memory.upgrading = true;
        creep.say('⚡ upgrade');
    }

    if (creep.memory.upgrading) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {...visualizePath});
        }
    } else {
        harvester.run(creep);
    }
};

export const upgrader = {
    NAME,
    getBody,
    run,
};

const visualizePath = {visualizePathStyle: {}};
