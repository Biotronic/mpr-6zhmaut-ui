import { autoinject, BindingEngine, bindable, Disposable, observable } from 'aurelia-framework';
import { Source } from 'resources/model/source';
import { Zone } from 'resources/model/zone';
import './amp-zone.scss';

@autoinject
export class AmpZone {
    @bindable
    @observable
    public zone: Zone = new Zone(11);

    @bindable
    public isScenario: boolean = false;

    @bindable
    public sources: Source[] = [];


    private className: string;
    private subscriptions: Disposable[] = [];
    private noSource: Source = { name: 'Don\'t change zones', id: null } as Source;

    constructor(private bindingEngine: BindingEngine) {
    }

    attached() {
        if (this.isScenario) {
            this.className = this.zone?.checked ? 'editable active' : 'editable inactive';
        } else {
            this.className = 'fixed active';
        }
    }

    zoneChanged(newValue, oldValue) {
        this.subscriptions.forEach((s) => s.dispose());
        this.subscriptions = [];

        if (!newValue) {
            return;
        }

        for (let attribute of Object.keys(newValue)) {
            this.subscriptions.push(this.bindingEngine.propertyObserver(newValue, attribute)
                .subscribe((newValue, oldValue) => this.changed(attribute, newValue, oldValue)));
        }
    }

    changed(attribute: string, newValue : any, oldValue : any) {

    }

    detached() {
        this.subscriptions.forEach((s) => s.dispose());
    }
}
