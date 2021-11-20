import { bindable } from 'aurelia-framework';
import { v4 as uuid } from 'uuid';
import './button-input.scss';

export class ButtonInput {
    @bindable
    public value: boolean;

    private id = uuid();
}
