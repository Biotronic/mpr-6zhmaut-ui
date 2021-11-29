import { autoinject, bindable, BindingEngine, Disposable, observable } from 'aurelia-framework';
import { Scenario } from 'resources/model/Scenario';
import { Source } from 'resources/model/source';
import { Zone } from 'resources/model/zone';
import './scenario-builder.scss';

@autoinject
export class ScenarioBuilder {
    @bindable
    public scenarios: Scenario[];

    @bindable
    public sources: Source[];

    @bindable
    @observable
    public allZones: Zone[];

    private zones: Zone[] = [];
    private subscription: Disposable;

    constructor(private bindingEngine: BindingEngine) {
    }

    detached() {
        this.subscription.dispose();
    }

    allZonesChanged(newValue: Zone[]) {
        if (this.subscription) {
            this.subscription.dispose();
        }
        this.subscription = this.bindingEngine.collectionObserver(this.allZones)
            .subscribe(this.allZonesElementChanged.bind(this));
    }

    allZonesElementChanged(newValue: Zone[]) {
        this.zones = [];
        for (let z of this.allZones) {
            this.zones.push(new Zone(z.id, z.name));
        }
    }

    newScenario() {
        this.scenarios.push(new Scenario('New scenario'));
    }

    select(scenario: Scenario) {
        for (let zone of this.zones) {
            zone.checked = false;
        }
        for (let zone of this.zones) {
            let zz = scenario.zones.find(z => z.id == zone.id);
            if (zz) {
                Object.assign(zone, zz);
                zone.checked = true;
            }
        }
    }

    delete(scenario: Scenario) {
        let index = this.scenarios.findIndex(s => scenario.id == s.id);
        if (index != -1) {
            this.scenarios.splice(index, 1);
        }
    }
}
