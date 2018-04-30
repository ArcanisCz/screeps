// import {BasicHarvestMission} from "./missions/BasicHarvestMission";

import {TaskHarvest} from './creep-tasks/TaskInstances/task_harvest';
// import {TaskTransfer} from './creep-tasks/TaskInstances/task_transfer';

export class Ai {
    private static creeps: Creep[];
    private static spawn: StructureSpawn;

    public static init() {
        this.creeps = _.values(Game.creeps);
        this.spawn = Game.spawns["Spawn1"];
    }

    public static run() {
        const missingCreeps = [0,1,2,3].filter((index) => !Game.creeps[`creep_${index}`]);
        if(missingCreeps.length > 0){
            this.spawn.spawnCreep([WORK, CARRY, MOVE],`creep_${missingCreeps[0]}`);
        }
        for(let creep of this.creeps){
            if(creep.isIdle){
                this.harvest(creep);
            }
        }
    }

    private static harvest(creep: Creep): void {
        if (creep.carry.energy < creep.carryCapacity) {
            // Harvest from an empty source if there is one, else pick any source
            let sources = creep.room.find(FIND_SOURCES);

            const sourcesByOccupied = _.sortBy(sources, ["targetedBy", "length"]);
            console.log(sourcesByOccupied[0]);
            creep.task = new TaskHarvest(sourcesByOccupied[0], {});
            console.log(creep.task);
        } else {
            // creep.task = Tasks.transfer(this.spawn);
        }
    }
}

