import Ember from 'ember';
import NamingStrategyFactory from 'ember-cli-bem/naming-strategies/factory';
import BEM from 'ember-cli-bem/mixins/bem';

const {
  Component,
} = Ember;

export default Component.extend(BEM, {

  __namingStrategy__: (function() {
    const factory = new NamingStrategyFactory();
    const config = {
      namingStrategy: 'classic',
    };

    return factory.getStrategy(config);
  })(),

});
