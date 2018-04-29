let memory = Memory.ai = {
    count: 0,
};

const operations = [];

const init = () => {
    console.log(Game.flags.test_moje);
    memory = Memory.ai;

};

const loop = () => {
    memory.count++;
};

export const Ai = {
  init,
  loop,
};
