import {memory, Operation} from "./Operation";
import {InvalidOperation} from "./InvalidOperation";
import {BasicOperation} from "./BasicOperation";
import {MiningOperation} from "./MiningOperation";

export class OperationFactory {
    public static createOperation(memory: memory<any>): Operation<any>{
        switch (memory.type) {
            case BasicOperation.typeName:
                return new BasicOperation(memory.name);
            case MiningOperation.typeName:
                return new MiningOperation(memory.name);
            default:
                return new InvalidOperation(memory.name, null);
        }
    }
}
