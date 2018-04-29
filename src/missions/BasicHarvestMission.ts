import {Mission} from "../Mission";



export class BasicHarvestMission extends Mission {

    constructor(memory: Object, name: String) {
        super(name);
    }

    initCreeps() {
        const creeps = this.getCreeps("harvester", [WORK, CARRY, MOVE], 2);
    }

    run() {
    }

}
