import {Tasks} from './creep-tasks/Tasks';
import {TargetCache} from "./creep-tasks/utilities/caching";
import {BasicOperation} from "./operations/BasicOperation";
import {OperationFactory} from "./operations/OperationFactory";
import {Operation} from "./operations/Operation";
import {MiningOperation} from "./operations/MiningOperation";

export class Ai {
    // private static spawn: StructureSpawn;
    // private static requestedCreeps: [BodyPartConstant[], string][];
    private static operations: Operation<any>[];


    public static initMemory() {
        if (!Memory.ai) {
            Memory.ai = {};
        }
        if (!Memory.operations) {
            Memory.operations = {};
        }
    }

    private static cleanMemory() {
        const names = _.keys(Memory.creeps);
        for (let name of names) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log("cleaned memory for", name);
            }
        }
        TargetCache.assert();
    }

    private static initOperations() {
        this.operations = _.values(Memory.operations).map(OperationFactory.createOperation);
    }

    public static init() {
        this.initMemory();
        this.cleanMemory();
        this.initOperations();
        // const operations: Operation<any>[] = _.values(Memory.operations).map(OperationFactory.createOperation);
        // if(operations.length === 0){
        //     operations.push(new BasicOperation("neco"));
        // }
        // for (let operation of operations) {
        //     if (operation.state === "terminated") {
        //         delete Memory.operations[operation.name];
        //     } else {
        //         operation.run();
        //     }
        // }
        // const op = new BasicOperation("operace");
        // op.run();

        // this.spawn = Game.spawns["Spawn1"];
        // this.requestedCreeps = [];
        //
        // if (Game.time % 20 === 0) {
        //     const sources = this.spawn.room.find(FIND_SOURCES);
        //     sources.forEach((source) => {
        //         const path = this.spawn.room.findPath(this.spawn.pos, source.pos, {
        //             ignoreCreeps: true,
        //             ignoreRoads: true,
        //         });
        //         const poly = path.map((item) => new RoomPosition(item.x, item.y, "aaa"));
        //         poly.forEach((pos) => {
        //             this.spawn.room.createConstructionSite(pos, STRUCTURE_ROAD);
        //         });
        //     });
        //     if(this.spawn.room.controller){
        //         const path = this.spawn.room.findPath(this.spawn.pos, this.spawn.room.controller.pos, {
        //             ignoreCreeps: true,
        //             ignoreRoads: true,
        //         });
        //         const poly = path.map((item) => new RoomPosition(item.x, item.y, "aaa"));
        //         poly.forEach((pos) => {
        //             this.spawn.room.createConstructionSite(pos, STRUCTURE_ROAD);
        //         });
        //     }
        // }
    }


    public static run() {
        if (this.operations.length === 0) {
            // this.operations.push(new BasicOperation("neco"));
            const miningOps = Game.spawns["Spawn1"].room.find(FIND_SOURCES)
                .map((source, index) => new MiningOperation("mining" + index, {
                    sourceId: source.id,
                    minersCount: 0,
                }));
            this.operations.push(...miningOps);
        }
        for (let operation of this.operations) {
            if (operation.state === "terminated") {
                delete Memory.operations[operation.name];
            } else {
                operation.run();
            }
        }

        // const basicWorkers = this.headCount("basicWorker", 6, [WORK, CARRY, MOVE, MOVE]);
        // const roadBuilders = this.headCount("roadBuilder", 4, [WORK, CARRY, MOVE, MOVE]);
        //
        // if (this.requestedCreeps.length > 0) {
        //     this.spawn.spawnCreep(this.requestedCreeps[0][0], this.requestedCreeps[0][1]);
        // }
        //
        // for (let basicWorker of basicWorkers) {
        //     if (basicWorker.isIdle && !basicWorker.spawning) {
        //         this.harvest(basicWorker);
        //     }
        //     basicWorker.run();
        // }
        //
        // for (let roadBuilder of roadBuilders) {
        //     if (roadBuilder.isIdle && !roadBuilder.spawning) {
        //         this.buildRoads(roadBuilder);
        //     }
        //     roadBuilder.run();
        // }
    }

    // private static headCount(role: string, requestedCount: number, body: string[]): Creep[] {
    //     const range = _.range(requestedCount);
    //     const creps = range
    //         .filter((index: number) => Game.creeps[`${role}_${index}`])
    //         .map((index: number) => Game.creeps[`${role}_${index}`]);
    //     const missingCreeps = range
    //         .filter((index: number) => !Game.creeps[`${role}_${index}`])
    //         .map((index: number) => [body, `${role}_${index}`]);
    //     this.requestedCreeps.push(...missingCreeps);
    //     return creps;
    // }

    // private static harvest(creep: Creep): void {
    //     if (creep.carry.energy < creep.carryCapacity) {
    //         let sources = creep.room.find(FIND_SOURCES);
    //         const sourcesByOccupied = _.sortBy(sources, (source: any) => source.targetedBy.length);
    //         creep.task = Tasks.harvest(sourcesByOccupied[0]);
    //         creep.say('🔄 harvest');
    //     } else {
    //         if (this.spawn.energy === this.spawn.energyCapacity) {
    //             if (this.spawn.room.controller) {
    //                 creep.task = Tasks.upgrade(this.spawn.room.controller);
    //                 creep.say('⚡ upgrade');
    //             } else {
    //                 console.log("no controller?");
    //             }
    //         } else {
    //             creep.task = Tasks.transfer(this.spawn);
    //             creep.say('🔄 deliver');
    //         }
    //     }
    // }

    // private static buildRoads(creep: Creep): void {
    //     if (creep.carry.energy < creep.carryCapacity) {
    //         const sources = creep.room.find(FIND_SOURCES);
    //         const sourcesByOccupied = _.sortBy(sources, ((source: any) => source.targetedBy.length));
    //         creep.task = Tasks.harvest(sourcesByOccupied[0]);
    //         creep.say('🔄 harvest');
    //     } else {
    //         const constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
    //         if (constructionSites.length > 0) {
    //             const site = creep.pos.findClosestByRange(constructionSites);
    //             creep.task = Tasks.build(site);
    //             creep.say('🔄 build');
    //         } else {
    //             const roads = creep.room.find(FIND_STRUCTURES, {
    //                 filter: (item) => item.structureType === STRUCTURE_ROAD && item.targetedBy.length === 0,
    //             });
    //             if (roads.length > 0) {
    //                 const sorted = _.sortBy(roads, (road: StructureRoad) => road.hits / road.hitsMax);
    //                 creep.task = Tasks.repair(sorted[0]);
    //                 creep.say('🔄 repair');
    //             }
    //         }
    //     }
    // }
}
