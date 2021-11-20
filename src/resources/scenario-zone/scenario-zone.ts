import { autoinject, BindingEngine, bindable, Disposable, observable } from 'aurelia-framework';
import { Source } from 'resources/model/source';
import { Zone } from 'resources/model/zone';
import './scenario-zone.scss';

export class ScenarioZone {
    @bindable
    public zone: Zone;

    @bindable
    public zones: Zone[];

    @bindable
    public sources: Source[] = [];
    private noSource: Source = { name: 'No source selected', id: null } as Source;

    constructor() {
    }

    attached() {
    }
}
