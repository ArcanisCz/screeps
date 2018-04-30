import {Mission} from "../Mission";
import {MyCreep} from "../MyCreep";
import {MySource} from "../MySource";
import {MySpawn} from "../MySpawn";


export class BasicHarvestMission extends Mission {
    private miners: MyCreep[];
    private readonly source: MySource;


    constructor(name: string, source: MySource, spawn: MySpawn) {
        super(name, spawn);
        this.source = source;
    }

    initCreeps() {
        this.miners = this.getCreeps("harvester", [WORK, CARRY, MOVE], 2);
    }

    run() {
        const path = this.spawn.pos.findPathTo(this.source.pos.x,this.source.pos.y, {
            ignoreCreeps: true,
            ignoreRoads: true,
            ignoreDestructibleStructures: true,
        });
        const points = path.map((step) => <[number, number]>[step.x, step.y]);
        this.spawn.room.visual.poly(points, {
            lineStyle: "dotted",
        });
        this.spawn.room.visual.text(this.name, this.source.pos.x, this.source.pos.y-1, {
            size: 0.5,
        });


        for (let miner of this.miners) {
            this.minerAction(miner);
        }
    }

    private minerAction(miner: MyCreep) {
        if (miner.carry.energy === miner.carryCapacity) {
            if (miner.transfer(this.spawn.getSpawn(), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                miner.moveTo(this.spawn.getSpawn());
            }
        } else if (miner.carry.energy < miner.carryCapacity) {
            if (miner.harvest(this.source.getSource()) === ERR_NOT_IN_RANGE) {
                miner.moveTo(this.source.getSource());
            }
        }

        // if(!creep.memory.source && creep.carry.energy === 0){
        //     const sources = creep.room.find(FIND_SOURCES_ACTIVE);
        //     if (sources.length > 0) {
        //         creep.memory.target = null;
        //         creep.memory.source = getClosest(sources, creep.pos).id;
        //         creep.say('🔄 harvest');
        //     } else {
        //         creep.memory.source = null;
        //         creep.say('X sources');
        //     }
        // }else if(!creep.memory.target && creep.carry.energy === creep.carryCapacity){
        //     const targets = creep.room.find(FIND_STRUCTURES, {filter: needsEnergy});
        //     if (targets.length > 0) {
        //         creep.memory.source = null;
        //         creep.memory.target = getClosest(targets, creep.pos).id;
        //         creep.say('🔄 deliver');
        //     } else {
        //         const spawns = creep.room.find(FIND_MY_SPAWNS);
        //         creep.memory.source = null;
        //         creep.memory.target = getClosest(spawns, creep.pos).id;
        //         creep.say('X targets');
        //     }
        // }
        //
        // if (creep.memory.source) {
        //     const source = Game.getObjectById(creep.memory.source);
        //     if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        //         creep.moveTo(source, {...visualizePath});
        //     }
        // } else if (creep.memory.target) {
        //     const target = Game.getObjectById(creep.memory.target);
        //     if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        //         creep.moveTo(target, {...visualizePath});
        //     }
        // }
    }

}
