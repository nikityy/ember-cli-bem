import Ember from 'ember';
import NamingStrategyFactory from 'ember-cli-bem/naming-strategies/factory';

const {
  Component,
} = Ember;

export default {

  name: 'ember-cli-bem',

  initialize(owner) {
    const config = owner.registry.resolve('config:environment');
    const addonConfig = config['ember-cli-bem'];
    const factory = new NamingStrategyFactory();
    const strategy = factory.getStrategy(addonConfig);

    Component.reopen({
      __namingStrategy__: strategy,
    });
  },

}
