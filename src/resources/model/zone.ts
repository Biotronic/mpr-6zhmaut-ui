export class Zone {
    public checked: boolean;
    public id: number;
    public name: string;
    public power?: boolean = false;
    public pa: boolean = false;
    public mute: boolean = false;
    public dnd: boolean = false;
    public volume: number = 20;
    public treble: number = 7;
    public bass: number = 7;
    public balance: number = 10;
    public source: number = 1;

    constructor(id: number, name?: string) {
        this.id = id;
        this.name = name || `Zone ${id}`;
    }
}
