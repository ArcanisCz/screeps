import {getClosest, needsEnergy, visualizePath} from "../util";

const NAME = "harvester";
const getBody = () => [WORK, CARRY, MOVE, MOVE];
const run = (creep) => {
    if(!creep.memory.source && creep.carry.energy === 0){
        const sources = creep.room.find(FIND_SOURCES_ACTIVE);
        if (sources.length > 0) {
            creep.memory.target = null;
            creep.memory.source = getClosest(sources, creep.pos).id;
            creep.say('🔄 harvest');
        } else {
            creep.memory.source = null;
            creep.say('X sources');
        }
    }else if(!creep.memory.target && creep.carry.energy === creep.carryCapacity){
        const targets = creep.room.find(FIND_STRUCTURES, {filter: needsEnergy});
        if (targets.length > 0) {
            creep.memory.source = null;
            creep.memory.target = getClosest(targets, creep.pos).id;
            creep.say('🔄 deliver');
        } else {
            const spawns = creep.room.find(FIND_MY_SPAWNS);
            creep.memory.source = null;
            creep.memory.target = getClosest(spawns, creep.pos).id;
            creep.say('X targets');
        }
    }

    if (creep.memory.source) {
        const source = Game.getObjectById(creep.memory.source);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {...visualizePath});
        }
    } else if (creep.memory.target) {
        const target = Game.getObjectById(creep.memory.target);
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {...visualizePath});
        }
    }
};
export const harvester = {
    NAME,
    getBody,
    run,
};
