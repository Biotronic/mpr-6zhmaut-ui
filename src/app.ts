import { autoinject, BindingEngine, bindable, Disposable } from 'aurelia-framework';
import { Source } from "resources/model/source";
import { Zone } from "resources/model/zone";
import './app.scss';

@autoinject
export class App {
    public zones: Zone[] = [];
    public scenarioZones: Zone[] = [];
    public sources: Source[] = [];
    private updating: boolean;

    private subscriptions: Disposable[] = [];

    constructor(private bindingEngine: BindingEngine) {
        for (let i = 1; i <= 6; ++i) {
            let zone = new Zone(10 + i);
            this.zones[i - 1] = zone;
            for (let attribute of Object.keys(zone)) {
                this.subscriptions.push(
                    bindingEngine.propertyObserver(zone, attribute)
                        .subscribe((n, o) => this.zoneChanged(zone, attribute, n, o)));

            }
        }
        for (let i = 1; i <= 6; ++i) {
            let zone = new Zone(10 + i);
            this.scenarioZones[i - 1] = zone;
        }
        for (let i = 1; i <= 6; ++i) {
            let source = new Source(i);
            this.sources[i - 1] = source;
            for (let attribute of Object.keys(source)) {
                this.subscriptions.push(
                    bindingEngine.propertyObserver(source, attribute)
                        .subscribe((n, o) => this.sourceChanged(source, attribute, n, o)));

            }
        }

        setInterval(() => this.updateZones(), 250);
        this.updateSources();
    }

    private fromUpdates: Zone[];
    private updateZones() {
        fetch(`http://localhost:3000/api/zones`, {
            method: "GET"
        }).then((response) => response.json()
        ).then((data: Zone[]) => {
            this.updating = true;
            this.fromUpdates = data;
            for (let i in data) {
                if (+i > 6) {
                    break;
                }

                let existing = this.zones.find((z) => z.id == data[i].id);
                if (existing) {
                    Object.assign(existing, data[i]);
                }
            }
            this.updating = false;
        });
    }

    private updateSources() {
        fetch(`http://localhost:3000/api/sources`, {
            method: "GET"
        }).then((response) => response.json()
        ).then((data: Source[]) => {
            for (let i in data) {
                if (+i > 6) {
                    break;
                }

                let existing = this.sources.find((z) => z.id == data[i].id);
                if (existing) {
                    Object.assign(existing, data[i]);
                }
            }
        });
    }

    private zoneChanged(zone: Zone, attribute: string, newValue, oldValue) {
        if (oldValue == newValue) {
            return;
        }
        if (this.updating) {
            return;
        }
        
        let zoneFromUpdates = this.fromUpdates ? this.fromUpdates.find(z => z.id == zone.id) : null;
        if (zoneFromUpdates && zoneFromUpdates[attribute] == newValue) {
            zoneFromUpdates[attribute] = undefined;
            return;
        }

        let update = { id: zone.id };
        update[attribute] = newValue;
        fetch(`http://localhost:3000/api/zones/${zone.id}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(update)
        });
    }

    private sourceChanged(source: Source, attribute: string, newValue, oldValue) {
        console.log(`Source ${source.id} changed: ${attribute} ${oldValue} => ${newValue}`);
        if (oldValue == newValue) {
            return;
        }
        let update = { id: source.id };
        update[attribute] = newValue;
        fetch(`http://localhost:3000/api/sources/0${source.id}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(update)
        });
    }
}
