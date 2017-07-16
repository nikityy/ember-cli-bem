import Ember from 'ember';
import ENV from '../config/environment';

const {
  getOwner,
} = Ember;

export function initialize(app) {
  const registry = getOwner(app);
  const addonConfig = ENV['ember-cli-bem'] || {};
  const namingStrategy = registry.lookup('naming-strategie:application');
  namingStrategy.reopen(addonConfig);

  const inject = registry.inject || registry.injection;
  inject.call(registry, 'component', '__namingStrategy__', 'naming-strategie:application');
}

export default {

  name: 'ember-cli-bem',
  initialize,

}
