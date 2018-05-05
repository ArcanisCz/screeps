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
    }

    private init(): void {
        this.onInit();
        this.memory.state = "running";
    }

    public run(): void {
        if (this.memory.state === "started") {
            this.init();
        }
        if(this.memory.state !== "terminated"){
            this.onRun();
        }
    };

    public terminate(): void {
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
}
