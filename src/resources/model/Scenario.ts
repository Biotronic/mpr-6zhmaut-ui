import { Zone } from "./zone";

export class Scenario {
    public id: number;
    public name: string;
    public description: string;
    public zones: Partial<Zone>[] = [];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}