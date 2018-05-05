import {memory, Operation} from "./Operation";
import {InvalidOperation} from "./InvalidOperation";
import {BasicOperation} from "./BasicOperation";

export class OperationFactory {
    public static createOperation(memory: memory<any>): Operation<any>{
        switch (memory.type) {
            case BasicOperation.typeName:
                return new BasicOperation(memory.name);
            default:
                return new InvalidOperation(memory.name, null);
        }
    }
}
