import {Ai} from "./Ai";

import './creep-tasks/prototypes'

export const loop = () => {
    Ai.cleanMemory();
    Ai.init();
    Ai.run();
};
