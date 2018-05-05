import {Operation} from "./Operation";
import {Tasks} from "../creep-tasks/Tasks";

export interface basicOperatioNMemory {
    sources: string[];
}

export class BasicOperation extends Operation<basicOperatioNMemory> {

    static readonly typeName = "BasicOperation";

    constructor(name: string) {
        super(BasicOperation.typeName, name);
    }

    protected onInit(): void {
        this.data.sources = this.spawn.room
            .find(FIND_SOURCES)
            .map((source) => source.id);
    }

    protected onRun(): void {
        const basicWorkers = this.headCount(
            `${this.name}_basicWorker`,
            this.data.sources.length * 2,
            [WORK, CARRY, MOVE]
        );
        basicWorkers.forEach((worker, index) => {
            if (worker.isIdle && !worker.spawning) {
                this.harvest(worker, this.data.sources[index % this.data.sources.length]);
            }
            worker.run();
        })
    }

    protected onTerminate(): void {
        console.log("terminated");
    }

    private harvest(creep: Creep, sourceId: string): void {
        if (creep.carry.energy < creep.carryCapacity) {
            creep.task = Tasks.harvest(Game.getObjectById(sourceId) as Source);
            creep.say('🔄 harvest');
        } else {
            if (this.spawn.energy === this.spawn.energyCapacity) {
                if (this.spawn.room.controller) {
                    creep.task = Tasks.upgrade(this.spawn.room.controller);
                    creep.say('⚡ upgrade');
                } else {
                    console.log("no controller?");
                }
            } else {
                creep.task = Tasks.transfer(this.spawn);
                creep.say('🔄 deliver');
            }
        }
    }
}
