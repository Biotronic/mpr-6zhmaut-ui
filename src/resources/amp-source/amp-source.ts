import { autoinject, bindable, observable } from 'aurelia-framework';
import { Source } from 'resources/model/source';
import { Zone } from 'resources/model/zone';
import { v4 as uuid } from 'uuid';
import './amp-source.scss';

@autoinject
export class AmpSource {
    @bindable
    public source: Source;

    @bindable
    public zone: Zone;

    private input: HTMLInputElement;
    private editor: HTMLElement;
    private id = '_'+uuid();
    private editClass: string = 'normal';
    private handler: any;

    constructor(){
        this.handler = this.stopRename.bind(this);
    }

    renameSource() {
        this.editClass = 'editing';
        setTimeout(() => this.editor.focus(), 100);
        document.addEventListener('click', this.handler);
    }

    selectSource() {
        this.zone.source = this.source.id;
    }

    private stopRename(e: Event) {
        if (this.editor.contains(e.target as Node)) {
            return;
        }
        this.editClass = 'normal';
        document.removeEventListener('click', this.handler);
    }
}
