import { bindable, observable, Disposable } from 'aurelia-framework';
import { v4 as uuid } from 'uuid';
import './button-input.scss';

export class ButtonInput {
    @bindable
    @observable
    public value?: boolean;

    @bindable
    public type: 'twostate' | 'tristate' = 'twostate';

    private checked: boolean = false;

    private id = '_' + uuid();

    private state: string = 'unchecked';

    private clicked(e) {
        if (this.type == 'tristate') {
            this.value = this.value ? false : (this.value === false) ? null : true;
        } else {
            this.value = !this.value;
        }
    }

    private valueChanged(newValue) {
        this.state = newValue ? 'checked' : (newValue === false) ? 'unchecked' : 'indeterminate';
    }
}
