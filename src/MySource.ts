export class MySource {
    private source: Source;

    public pos: RoomPosition;
    public id: string;

    constructor(source: Source) {
        this.source = source;
        this.pos = source.pos
        this.id = source.id;
    }

    public getSource(): Source {
        return this.source;
    }

    toString(): string {
        return `[MySource ${this.source.id}]`;
    }
}
