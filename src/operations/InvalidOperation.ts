import {Operation} from "./Operation";

export class InvalidOperation extends Operation<null> {


    constructor(name: string, initialData: null) {
        super("InvalidOperation", name, initialData);
        console.log("INVALID OPERATION FROM MEMORY", name);
    }

    protected onInit(): void {
    }

    protected onRun(): void {
        this.terminate();
    }

    protected onTerminate(): void {
    }

}
