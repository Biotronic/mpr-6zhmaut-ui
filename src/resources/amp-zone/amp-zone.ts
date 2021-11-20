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
    public sources: Source[] = [];

    private subscriptions: Disposable[] = [];

    constructor(private bindingEngine: BindingEngine) {
    }

    attached() {
    }

    zoneChanged(newValue, oldValue) {
        this.subscriptions.forEach((s) => s.dispose());
        this.subscriptions = [];

        if (!newValue) {
            return;
        }

        for (let attribute of Object.keys(newValue)) {
            this.subscriptions.push(this.bindingEngine.propertyObserver(newValue, attribute)
                .subscribe((newValue, oldValue) => {
                }));
        }
    }

    detached() {
        this.subscriptions.forEach((s) => s.dispose());
    }
}
