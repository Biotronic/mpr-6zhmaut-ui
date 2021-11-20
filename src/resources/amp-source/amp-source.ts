import { bindable, observable } from 'aurelia-framework';
import { Source } from 'resources/model/source';
import { Zone } from 'resources/model/zone';
import { v4 as uuid } from 'uuid';
import './amp-source.scss';

export class AmpSource {
    @bindable
    public source: Source;

    @bindable
    public zone: Zone;

    @observable
    private checked: boolean;

    private input: HTMLInputElement;
    private element: HTMLElement;
    private editButton: HTMLElement;
    private editor: HTMLElement;
    private id = uuid();
    private editClass: string = 'normal';

    private exitMenuFn;

    attached() {
        this.input.checked = this.zone.source == this.source.id;
        this.editor.addEventListener('focusout', () => this.stopEditing());
        document.addEventListener('contextmenu', (e) => {
            if (this.element.contains(e.target as Node)) {
                e.preventDefault();
                this.showMenu();
            }
        });
        this.editButton.addEventListener('click', () => this.startEditor());
        this.exitMenuFn = () => this.exitMenu();
        this.input.addEventListener('input', () => {
            if (this.input.checked) {
                this.zone.source = this.source.id;
            }
        });
    }

    showMenu() {
        this.editClass = 'menuOpen';
        document.addEventListener('click', this.exitMenuFn);
    }

    startEditor() {
        this.editClass = 'editing';
        setTimeout(() => this.editor.focus(), 100);
        document.removeEventListener('click', this.exitMenuFn);
    }

    stopEditing() {
        this.editClass = 'normal';
    }

    exitMenu() {
        this.editClass = 'normal';
        document.removeEventListener('click', this.exitMenuFn);
    }

    checkedChanged() {
        if (this.checked) {
            this.zone.source = this.source.id;
        }
    }
}
