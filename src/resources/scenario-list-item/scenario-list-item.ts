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

    constructor(private element: Element) {
        this.handler = this.stopRename.bind(this);
    }

    private selectScenario() {
        this.select();
    }
    private handler: any;
    private renameScenario() {
        this.element.classList.add('editing');
        this.element.querySelector('input').focus();
        document.addEventListener('click', this.handler);
    }
    private deleteScenario() {
        this.delete();
    }
    private stopRename(e: Event) {
        if (e.target == this.element.querySelector('input')) {
            return;
        }
        this.element.classList.remove('editing');
        document.removeEventListener('click', this.handler);
    }
}
