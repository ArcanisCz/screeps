// import {BasicHarvestMission} from "./missions/BasicHarvestMission";

import {Tasks} from './creep-tasks/Tasks';
import {TargetCache} from "./creep-tasks/utilities/caching";

// import {TaskTransfer} from './creep-tasks/TaskInstances/task_transfer';

export class Ai {
    private static creeps: Creep[];
    private static spawn: StructureSpawn;
    private static requestedCreeps: [BodyPartConstant[], string][];

    public static init() {
        this.creeps = _.values(Game.creeps);
        this.spawn = Game.spawns["Spawn1"];
        this.requestedCreeps = [];
    }


    public static run() {
        const basicWorkers = this.headCount("basicWorker", 8, [WORK, CARRY, MOVE, MOVE]);

        if(this.requestedCreeps.length > 0){
            this.spawn.spawnCreep(this.requestedCreeps[0][0], this.requestedCreeps[0][1]);
        }

        for (let basicWorker of basicWorkers) {
            if (basicWorker.isIdle && !basicWorker.spawning) {
                this.harvest(basicWorker);
            }
            basicWorker.run();
        }
    }

    public static cleanMemory() {
        const names = _.keys(Memory.creeps);
        for (let name of names) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log("cleaned memory for", name);
            }
        }
        TargetCache.assert();
    }

    private static headCount(role: string, requestedCount: number, body: string[]): Creep[] {
        const range = _.range(requestedCount);
        const creps = range
            .filter((index:number) => Game.creeps[`${role}_${index}`])
            .map((index: number) => Game.creeps[`${role}_${index}`]);
        const missingCreeps = range
            .filter((index:number) => !Game.creeps[`${role}_${index}`])
            .map((index: number) => [body, `${role}_${index}`]);
        this.requestedCreeps.push(...missingCreeps);
        return creps;
    }

    private static harvest(creep: Creep): void {
        if (creep.carry.energy < creep.carryCapacity) {
            // Harvest from an empty source if there is one, else pick any source
            let sources = creep.room.find(FIND_SOURCES);
            const sourcesByOccupied = _.sortBy(sources, ((source: any) => source.targetedBy.length));
            creep.task = Tasks.harvest(sourcesByOccupied[0]);
        } else {
            if (this.spawn.energy === this.spawn.energyCapacity) {
                if (this.spawn.room.controller) {
                    creep.task = Tasks.upgrade(this.spawn.room.controller);
                } else {
                    console.log("no controller?");
                }
            } else {
                creep.task = Tasks.transfer(this.spawn);
            }
        }
    }
}
