import {getClosest, visualizePath} from "./util";

const NAME = "upgrader";
const getBody = () => [WORK, CARRY, MOVE, MOVE];
const run = (creep) => {
    if (!creep.memory.source && creep.carry.energy === 0) {
        const sources = creep.room.find(FIND_SOURCES_ACTIVE);
        creep.memory.source = getClosest(sources, creep.room.controller.pos).id;
        creep.memory.upgrading = false;
        creep.say('🔄 harvest');
    }
    if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
        creep.memory.source = null;
        creep.memory.upgrading = true;
        creep.say('⚡ upgrade');
    }

    if (creep.memory.upgrading) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {...visualizePath});
        }
    } else {
        const source = Game.getObjectById(creep.memory.source);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {...visualizePath});
        }
    }
};

export const upgrader = {
    NAME,
    getBody,
    run,
};

