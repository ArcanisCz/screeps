export type lifecycle = "started" | "running" | "terminated";

export interface memory<T> {
    data: T;
    type: string;
    state: lifecycle;
    name: string;
}

export abstract class Operation<T> {
    private readonly memory: memory<T>;
    protected readonly data: T;
    protected readonly typeName: string;
    protected readonly spawn: StructureSpawn;

    protected constructor(typeName: string, name: string, initialData: T = {} as T) {
        this.typeName = typeName;
        if (!Memory.operations[name]) {
            Memory.operations[name] = {
                data: initialData,
                type: typeName,
                state: "started",
                name,
            } as memory<T>;
        }
        this.memory = Memory.operations[name];
        this.data = this.memory.data;
        this.spawn = Game.spawns["Spawn1"]; // TODO multi room
    }

    private init(): void {
        this.onInit();
        this.memory.state = "running";
    }

    run(): void {
        if (this.memory.state === "started") {
            this.init();
        }
        if(this.memory.state !== "terminated"){
            this.onRun();
        }
    };

    terminate(): void {
        this.onTerminate();
        this.memory.state = "terminated";
    }

    get state() {
        return this.memory.state;
    }

    get name(){
        return this.memory.name;
    }

    protected abstract onInit(): void;

    protected abstract onRun(): void;

    protected abstract onTerminate(): void;

    protected headCount(role: string, requestedCount: number, body: string[]): Creep[] {
        const range = _.range(requestedCount);
        const creps = range
            .filter((index: number) => Game.creeps[`${role}_${index}`])
            .map((index: number) => Game.creeps[`${role}_${index}`]);
        const missingCreeps = range
            .filter((index: number) => !Game.creeps[`${role}_${index}`])
            .map((index: number) => [body, `${role}_${index}`]);
        if (missingCreeps.length > 0 && !this.spawn.spawning) {
            this.spawn.spawnCreep(missingCreeps[0][0], missingCreeps[0][1]);
        }
        return creps;
    }
}
