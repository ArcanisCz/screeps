import {harvester} from "./screep.harvester";
import {upgrader} from "./screep.upgrader";

const roleMap = {
    [harvester.NAME]: harvester,
    [upgrader.NAME]: upgrader,
};

export const screep = {
    run: (screep) => roleMap[screep.memory.role].run(screep),
    getBody: (role) => roleMap[role].getBody(),
    HARVESTER: harvester.NAME,
    UPGRADER: upgrader.NAME,
};
