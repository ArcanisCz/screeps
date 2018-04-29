import {Mission} from "./Mission";
import {BasicHarvestMission} from "./missions/BasicHarvestMission";

export class Ai {
    private static operations: Mission[] = [];

    public static init() {
        const missionName = "harvest";
        if(!Memory.missions){
            Memory.missions = {};
        }
        if(!Memory.missions[missionName]){
            Memory.missions[missionName] = {};
        }
        this.operations = [new BasicHarvestMission(Memory.missions[missionName], missionName)];
    }

    public static run() {
        this.operations.forEach((operation) => {
           operation.initCreeps();
        });
    }
}

