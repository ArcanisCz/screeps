export class Spawner {
    private spawn: Spawn;

    constructor(name) {
        this.spawn = Game.spawns[name];
    }

    public spawnCreep(body: string[], name: string): number {
        if (this.spawn.spawning) {
            this.spawn.room.visual.text(
                '🛠️' + this.spawn.spawning.name,
                this.spawn.pos.x + 1,
                this.spawn.pos.y,
                {align: 'left', opacity: 0.8});
        } else {
            return this.spawn.spawnCreep(body, name);
        }
    }
}
