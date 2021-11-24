export class Zone {
    public checked: boolean = true;
    public id: number;
    public name: string;
    public power?: boolean = false;
    public pa?: boolean = false;
    public mute?: boolean = false;
    public dnd?: boolean = false;
    public volume: number = 20;
    public volume_checked: boolean = true;
    public treble: number = 7;
    public treble_Checked: boolean = true;
    public bass: number = 7;
    public bass_checked: boolean = true;
    public balance: number = 10;
    public balance_checked: boolean = true;
    public source?: number = 1;

    constructor(id: number, name?: string) {
        this.id = id;
        this.name = name || `Zone ${id}`;
    }
}
