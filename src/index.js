module.exports.loop = function () {
    const creep = getCreep();
    if(creep.carry.energy < creep.carryCapacity){
        const sources = creep.room.find(FIND_SOURCES);
        const best = getBestSource(sources, creep.pos);

        if(creep.harvest(best) === ERR_NOT_IN_RANGE) {
            creep.moveTo(best);
        }
    } else if (Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
        if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns['Spawn1'],  {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }

};

function getCreep() {
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvester1');
    return Game.creeps["Harvester1"];
}

function getBestSource(sources, pos) {
    const a = sources.filter((source) => source.energy > 50);
    const distances = a.map((source) => Math.sqrt((pos.x * source.pos.x) + (pos.y * source.pos.y)));
    let best = 0;
    a.forEach((source, index) => {
        if(distances[best] > distances[index]){
            best = index;
        }
    });

    return a[best];
}
