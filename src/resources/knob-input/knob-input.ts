import { bindable, autoinject, observable } from 'aurelia-framework';
import { Zone } from 'resources/model/zone';
import './knob-input.scss';

@autoinject
export class KnobInput {
    @bindable
    @observable
    public value: number = 50;
    @bindable
    public min: number = 0;
    @bindable
    public max: number = 100;
    @bindable
    public step: number = 1;
    @bindable
    public zone: Zone;
    @bindable
    public attribute: string;

    private input: HTMLInputElement;
    private label: HTMLLabelElement;
    private svg: SVGElement;
    private indicator: SVGElement;
    private indicatorBack: SVGElement;

    private angle: number = 0;
    private dashOffset: number = 0;

    public get diff(): number {
        return this.max - this.min;
    }

    constructor(private element: Element) {
    }

    valueChanged(newValue, oldValue) {
        let percent = this.value / this.diff;

        this.angle = percent * 132 * 2 - 132;
        this.dashOffset = -percent * 184;
    }

    attached() {
        this.label.onclick = function (e) { e.preventDefault(); };
        const onInput = () => {
            this.value = Math.min(Math.max(this.value, this.min), this.max);

            let percent = this.value / this.diff;

            this.angle = percent * 132 * 2 - 132;
            this.dashOffset = -percent * 184;
        }
        const start = (e: MouseEvent) => {
            if (this.input.disabled || this.input.readOnly) {
                //return;
            }
            document.addEventListener(window.PointerEvent ? 'pointermove' : 'mousemove', move, false);
            document.addEventListener(window.PointerEvent ? 'pointerup' : 'mouseup', end, false);
        }
        const move = (e: MouseEvent) => {
            let box = this.svg.getBoundingClientRect();

            let x = e.pageX - box.left - box.width / 2;
            let y = + box.top + box.height / 2 - e.pageY;

            if (x * x + y * y < 100) {
                return;
            }

            let angle = (Math.atan2(x, y) * 180 / Math.PI + 135) % 360;

            this.input.value = '' + Math.round((this.diff * angle / 270) / this.step) * this.step;
            this.input.dispatchEvent(new Event('input'));
        }
        const end = () => {
            document.removeEventListener(window.PointerEvent ? 'pointermove' : 'mousemove', move, false);
            document.removeEventListener(window.PointerEvent ? 'pointerup' : 'mouseup', end, false);
            this.input.select();
        }
        const wheel = (e: WheelEvent) => {
            var delta = e.deltaY;
            if (delta !== 0) {
                delta < 0 ? this.input.stepUp() : this.input.stepDown();
                this.input.dispatchEvent(new Event('input'));
            }
        }

        this.input.addEventListener('input', onInput, false);
        this.svg.addEventListener('wheel', wheel, false);

        this.svg.addEventListener(window.PointerEvent ? 'pointerdown' : 'mousedown', start);

        this.indicator.addEventListener('click', move);
        this.indicatorBack.addEventListener('click', move);

        onInput();
    }

    rampUp() {
        fetch(`http://localhost:3000/api/zones/${this.zone.id}/${this.attribute}/rampup`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: ""
        });
    }
    rampStop() {
        fetch(`http://localhost:3000/api/zones/${this.zone.id}/${this.attribute}/rampstop`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: ""
        });
    }
    rampDown() {
        fetch(`http://localhost:3000/api/zones/${this.zone.id}/${this.attribute}/rampdown`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: ""
        });
    }
}
