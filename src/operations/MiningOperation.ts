import {Operation} from "./Operation";
import {Tasks} from "../creep-tasks/Tasks";

export interface miningOperationMemory {
    sourceId: string;
    containerId?: string;
    containerConstructionId?: string;
    minersCount: number;
}

export class MiningOperation extends Operation<miningOperationMemory> {

    static readonly typeName = "mining";
    private readonly source: Source;
    private containerConstruction:  ConstructionSite| null;
    private container: StructureContainer | null;
    private workers: Creep[];


    constructor(name: string, initialData?: miningOperationMemory) {
        super(MiningOperation.typeName, name, initialData);
        const source = Game.getObjectById(this.data.sourceId) as Source;
        if (source) {
            this.source = source;
        }
        if (this.data.containerId) {
            this.container = Game.getObjectById(this.data.containerId);
        }
        if (this.data.containerConstructionId) {
            this.containerConstruction = Game.getObjectById(this.data.containerConstructionId);
        }
    }

    protected onInit(): void {
        this.data.minersCount = Math.min(this.source.pos.availableNeighbors(true).length, 2);
    }

    protected onRun(): void {
        this.path();
        this.workers = this.headCount(`${this.name}_miner`, this.data.minersCount, [WORK, WORK, CARRY, MOVE]);
        for (let worker of this.workers) {
            if (worker.isIdle && !worker.spawning) {
                this.harvest(worker, this.source);
            }
            worker.run();
        }
    }

    protected onTerminate(): void {
    }


    private harvest(creep: Creep, source: Source): void {
        if (creep.carry.energy < creep.carryCapacity) {
            creep.task = Tasks.harvest(source);
            creep.say('⛏ harvest');
        } else {
            if (this.containerConstruction) {
                creep.task = Tasks.build(this.containerConstruction);
                creep.say('⛑ build');
            } else if (this.container) {
                creep.task = Tasks.transfer(this.container, RESOURCE_ENERGY, creep.carry.energy);
                creep.say('🔄 transfer');
            } else {
                creep.say('???');
            }
        }
    }

    private path() {
        // this.spawn.room.visual.poly(poly);
        // this.spawn.room.visual.circle(poly[poly.length - 2]);
        if (!this.container && !this.containerConstruction) {
            const path = this.spawn.room.findPath(this.spawn.pos, this.source.pos, {
                ignoreCreeps: true,
                ignoreRoads: true,
            });
            const poly = path.map((item) => new RoomPosition(item.x, item.y, "aaa"));
            const containers = this.spawn.room.lookForAt(LOOK_STRUCTURES, poly[poly.length - 2])
                .filter((site) => site.structureType === STRUCTURE_CONTAINER);
            if(containers.length > 0){
                this.data.containerId = containers[0].id;
            }else{
                this.spawn.room.createConstructionSite(poly[poly.length - 2], STRUCTURE_CONTAINER);
                const sites = this.spawn.room.lookForAt(LOOK_CONSTRUCTION_SITES, poly[poly.length - 2])
                    .filter((site) => site.structureType === STRUCTURE_CONTAINER);
                if (sites.length > 0) {
                    this.containerConstruction = sites[0];
                    this.data.containerConstructionId = sites[0].id;
                }
            }
        }
        // poly.forEach((pos) => {
        //     this.spawn.room.createConstructionSite(pos, STRUCTURE_ROAD);
        // });
    }
}
