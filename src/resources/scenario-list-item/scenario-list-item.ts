import { autoinject, bindable, BindingEngine, observable } from 'aurelia-framework'
import { Scenario } from 'resources/model/Scenario';
import './scenario-list-item.scss';

@autoinject
export class ScenarioListItem {
    @bindable
    public scenario: Scenario;

    @bindable
    public select: () => void;

    @bindable
    public delete: () => void;

    @bindable
    public readOnly: boolean;

    private editor: HTMLElement;

    constructor(private element: Element) {
        this.handler = this.stopRename.bind(this);
    }

    private selectScenario() {
        this.select();
    }

    private handler: any;
    private renameScenario() {
        this.element.classList.add('editing');
        this.editor.focus();
        document.addEventListener('click', this.handler);
    }

    private deleteScenario() {
        this.delete();
    }

    private stopRename(e: Event) {
        if (this.editor.contains(e.target as Node)) {
            return;
        }
        this.element.classList.remove('editing');
        document.removeEventListener('click', this.handler);
    }
}
