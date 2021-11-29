import { Zone } from "./zone";

export class Scenario {
    public id: number;
    public name: string;
    public description: string;
    public zones: Zone[] = [];

    constructor(name: string) {
        this.name = name;
    }
}