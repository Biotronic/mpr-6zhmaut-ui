import { autoinject, bindable, observable } from 'aurelia-framework';
import './tab-container.scss';

export class TabContainer {
    @bindable
    @observable
    public selectedTab: number = 0;

    tabs: Element[];

    private tabsElement: HTMLElement;

    public attached() {
        this.tabs = Array.prototype.slice.call(this.tabsElement.querySelectorAll(':scope>*'));
        this.selectedTabChanged(this.selectedTab, 0);
    }

    private selectTab(index: number) {
        this.selectedTab = index;
    }

    public selectedTabChanged(newValue: number, oldValue: number) {
        this.tabs.forEach((other, i) => {
            other.classList.toggle('selected', i == newValue);
        });
    }
}
