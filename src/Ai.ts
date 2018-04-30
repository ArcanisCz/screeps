import {Mission} from "./Mission";
import {BasicHarvestMission} from "./missions/BasicHarvestMission";
import {MySpawn} from "./MySpawn";
import {MySource} from "./MySource";

export class Ai {
    private static operations: Mission[] = [];

    public static init() {
        const spawn = new MySpawn("Spawn1");
        const missions = spawn.room
            .find(FIND_SOURCES_ACTIVE)
            .map((source:Source) => new MySource(source))
            .map((mySource) => new BasicHarvestMission(`harvest-${mySource.id.substr(0, 5)}`, mySource, spawn));

        this.operations = missions;
    }

    public static run() {
        for(let operation of this.operations){
            operation.initCreeps();
        }

        for(let operation of this.operations){
            operation.run();
        }
    }
}

