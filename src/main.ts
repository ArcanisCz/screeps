import {Ai} from "./Ai";

// import './creep-tasks/prototypes'

export const loop = () => {
    Ai.init();
    Ai.run();
    // console.log(Game.cpu.getUsed());
    // console.log(Game.cpu.getHeapStatistics());
};
