import { autoinject, bindable, observable } from 'aurelia-framework';
import './tab-container.scss';

export class TabContainer {
    @bindable
    @observable
    public tab: number = 0;

    headerButtons: Element[];
    tabs: Element[];

    private headerElement: HTMLElement;
    private tabsElement: HTMLElement;

    public attached() {
        this.headerButtons = Array.prototype.slice.call(this.headerElement.querySelectorAll(':scope>*'));
        this.tabs = Array.prototype.slice.call(this.tabsElement.querySelectorAll(':scope>*'));


        this.headerButtons.forEach((header: Element, i: number) => {
            if (i >= this.tabs.length) {
                header.classList.add('hidden');
            }
            header.addEventListener('click', (e) => {
                this.tab = i;
            });
        });
        this.tabs.forEach((tab: Element, i: number) => {
            if (i >= this.headerButtons.length) {
                tab.classList.add('hidden');
            }
        });
        this.tabChanged(this.tab, 0);
    }

    public tabChanged(newValue: number, oldValue: number) {
        this.headerButtons.forEach((other, i) => {
            other.classList.toggle('selected', i == newValue);
        });
        this.tabs.forEach((other, i) => {
            other.classList.toggle('selected', i == newValue);
        });
    }
}
