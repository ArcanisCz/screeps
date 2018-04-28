import {harvester} from "./role.harvester";


const roleMap = {
  [harvester.NAME]: harvester,
};

export const screep = {
    run: (screep) => roleMap[screep.memory.role].run(screep),
    getBody: (role) => roleMap[role].getBody(),
    HARVESTER: harvester.NAME,
};
