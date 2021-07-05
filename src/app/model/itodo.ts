export class Itodo {
    constructor(
    public name: string,
    public description: string,
    public priority: string
    ) {}


    getPriority(): string {
        return this.priority;
    }
}
