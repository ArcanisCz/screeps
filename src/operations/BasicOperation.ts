import {Operation} from "./Operation";

export interface basicOperatioNMemory {
    count: number;
}

export class BasicOperation extends Operation<basicOperatioNMemory> {

    static readonly typeName = "BasicOperation";

    constructor(name: string) {
        super(BasicOperation.typeName, name);
    }

    protected onInit(): void {
        console.log("onInit");
        this.data.count = 0;
    }

    protected onRun(): void {
        console.log("onRun", this.data.count);
        if(this.data.count > 10) {
            this.terminate();
        }
        this.data.count++;
    }

    protected onTerminate(): void {
        console.log("terminated");
    }
}
