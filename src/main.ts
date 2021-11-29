import {Aurelia} from 'aurelia-framework';
import environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  aurelia.use
  .globalResources(PLATFORM.moduleName('resources/knob-input/knob-input'))
  .globalResources(PLATFORM.moduleName('resources/button-input/button-input'))
  .globalResources(PLATFORM.moduleName('resources/amp-source/amp-source'))
  .globalResources(PLATFORM.moduleName('resources/amp-zone/amp-zone'))
  .globalResources(PLATFORM.moduleName('resources/amp-setup/amp-setup'))
  .globalResources(PLATFORM.moduleName('resources/scenario-builder/scenario-builder'))
  .globalResources(PLATFORM.moduleName('resources/scenario-list-item/scenario-list-item'))
  .globalResources(PLATFORM.moduleName('resources/tab-container/tab-container'));

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
