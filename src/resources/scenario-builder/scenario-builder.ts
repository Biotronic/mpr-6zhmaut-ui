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

    @observable
    private zones: Zone[] = [];
    private allZonesSubscription: Disposable;
    private zoneSubscriptions: Disposable[] = [];

    private selected: Scenario;

    constructor(private bindingEngine: BindingEngine) {
    }

    attached() {
        if (this.scenarios.length) {
            this.select(this.scenarios[0]);
        }
    }

    detached() {
        this.allZonesSubscription.dispose();
    }

    zonesChanged(newValue: Zone[]) {
        this.allZonesSubscription = this.bindingEngine.collectionObserver(this.zones)
            .subscribe(this.zonesElementChanged.bind(this));
        this.zonesElementChanged(newValue);
    }

    zonesElementChanged(newValue: Zone[]) {
        console.log('zonesElementChanged:', newValue);
    }

    allZonesChanged(newValue: Zone[]) {
        console.log(newValue);
        if (this.allZonesSubscription) {
            this.allZonesSubscription.dispose();
        }
        this.allZonesSubscription = this.bindingEngine.collectionObserver(this.allZones)
            .subscribe(this.allZonesElementChanged.bind(this));
        this.allZonesElementChanged(newValue);
    }

    allZonesElementChanged(newValue: Zone[]) {
        console.log(newValue);
        this.zones = [];
        for (let z of this.allZones) {
            this.zones.push(new Zone(z.id, z.name));
        }
    }

    newScenario() {
        let id = Math.max(0, ...this.scenarios.map(s => s.id)) + 1;
        let newScenario = new Scenario(id, 'New scenario');
        this.scenarios.push(newScenario);
        this.select(newScenario);
    }

    select(scenario: Scenario) {
        if (this.selected) {
            this.selected['selected'] = false;
        }
        this.selected = scenario;
        this.selected['selected'] = true;
        for (let zone of this.zones) {
            let existing = this.convertToEditor(scenario.zones.find(z => z.id == zone.id), zone.id);
            Object.assign(zone, existing);
        }
        console.log(this.selected);
    }

    convertToEditor(zone: Partial<Zone>, id: number): Zone {
        if (!zone) {
            return {
                id: id,
                name: "",
                checked: false,
                pa: false,
                power: false,
                mute: false,
                dnd: false,
                volume_checked: false,
                volume: 20,
                treble_Checked: false,
                treble: 7,
                bass_checked: false,
                bass: 7,
                balance_checked: false,
                balance: 10,
                source: 0
            };
        }
        return {
            id: zone.id,
            name: zone.name,
            checked: true,
            pa: zone.pa,
            power: zone.power,
            mute: zone.mute,
            dnd: zone.dnd,
            volume_checked: !!zone.volume,
            volume: zone.volume ?? 20,
            treble_Checked: !!zone.treble,
            treble: zone.treble ?? 7,
            bass_checked: !!zone.bass,
            bass: zone.bass ?? 7,
            balance_checked: !!zone.balance,
            balance: zone.balance ?? 10,
            source: !!zone.source ? zone.source : null,
        };
    }

    convertFromEditor(zone: Zone): Partial<Zone> {
        if (zone.checked) {
            return null;
        }
        return {
            id: zone.id,
            pa: zone.pa,
            power: zone.power,
            mute: zone.mute,
            dnd: zone.dnd,
            volume: zone.volume_checked ? zone.volume : null,
            treble: zone.treble_Checked ? zone.treble : null,
            bass: zone.bass_checked ? zone.bass : null,
            balance: zone.balance_checked ? zone.balance : null,
            source: zone.source > 0 ? zone.source : null,
        };
    }

    delete(scenario: Scenario) {
        let index = this.scenarios.findIndex(s => scenario.id == s.id);
        if (index != -1) {
            this.scenarios.splice(index, 1);
        }
    }
}
