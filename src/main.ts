import {Ai} from "./Ai";

import './creep-tasks/prototypes'

export const loop = () => {
    Ai.init();
    Ai.run();
};
