export class MySpawn {
    private spawn: Spawn;

    public room: Room;
    public pos: RoomPosition;

    constructor(name) {
        this.spawn = Game.spawns[name];
        this.room = this.spawn.room;
        this.pos = this.spawn.pos;
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

    getSpawn(): Spawn {
        return this.spawn;
    }

    toString(): string {
        return `[MySpawn ${this.spawn.name}]`;
    }
}
