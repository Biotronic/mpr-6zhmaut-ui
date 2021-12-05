import { Scenario } from 'resources/model/Scenario';
import { bindable } from 'aurelia-framework';
import { Source } from 'resources/model/source';
import { Zone } from 'resources/model/zone';
import './amp-setup.scss';

export class AmpSetup {
    @bindable
    public zones: Zone[];

    @bindable
    public sources: Source[];

    @bindable
    public save: (Zone) => void;

    @bindable
    public scenarios: Scenario[];

    @bindable
    selectScenario: (Scenario) => void;
}
