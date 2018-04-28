import {harvester} from "screep.harvester";

const NAME = "upgrader";
const getBody = () => [WORK, CARRY, MOVE, MOVE];
const run = (creep) => {
    if (creep.carry.energy === creep.carryCapacity) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {...visualizePath});
        }
        // creep.say('⚡ upgrade');
    } else {
        harvester.run(creep);
        // creep.say('🔄 harvest');
    }
};

export const upgrader = {
    NAME,
    getBody,
    run,
};

const visualizePath = {visualizePathStyle: {}};
