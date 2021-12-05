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

    private editor: HTMLElement;
    private id = '_'+uuid();
    private handler: any;

    constructor(private element: Element){
        this.handler = this.stopRename.bind(this);
    }

    renameSource() {
        this.element.classList.add('editing');
        setTimeout(() => this.editor.focus(), 100);
        document.addEventListener('click', this.handler);
    }

    selectSource() {
        this.zone.source = this.source.id;
    }

    stopRename(e: Event) {
        if (this.editor.contains(e.target as Node)) {
            return;
        }
        this.element.classList.remove('editing');
        document.removeEventListener('click', this.handler);
    }

    keyup(e: KeyboardEvent) {
        if (e.key == 'Enter') {
            this.stopRename(new Event(''));
        }
    }
}
