import { autoinject, BindingEngine, bindable, Disposable, observable } from 'aurelia-framework';
import { Source } from 'resources/model/source';
import { Zone } from 'resources/model/zone';
import { v4 as uuid } from 'uuid';
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

    @bindable
    public save: () => void;

    private id = '_' + uuid();
    private className: string;
    private subscriptions: Disposable[] = [];
    private noSource: Source = { name: 'No change', id: 0 } as Source;

    constructor(private bindingEngine: BindingEngine) {
    }

    attached() {
        this.updateClass();
    }

    updateClass() {
        if (this.isScenario) {
            this.className = this.zone?.checked ? 'editable active' : 'editable inactive';
        } else {
            this.className = 'fixed active';
        }
    }

    zoneChanged(newValue: Zone, oldValue: Zone) {
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

    changed(attribute: string, newValue: any, oldValue: any) {
        if (newValue == oldValue) return;

        if (attribute == 'checked') {
            this.updateClass();
        }

        if (!!this.save) {
            this.save();
        }
    }

    detached() {
        this.subscriptions.forEach((s) => s.dispose());
    }
}
