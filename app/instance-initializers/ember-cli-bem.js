import Ember from 'ember';

const {
  Component,
} = Ember;

export function initialize(applicationInstance) {
  const config = applicationInstance.registry.resolve('config:environment');
  const addonConfig = config['ember-cli-bem'];

  const strategyName = addonConfig.namingStrategy;
  const StrategyFactory = applicationInstance.registry.resolve(`naming-strategies:${strategyName}`);
  const strategy = StrategyFactory.create(addonConfig);

  if (!strategy) {
    throw Error(`Cannot find BEM naming strategy with name ${strategyName}`);
  }

  Component.reopen({
    __namingStrategy__: strategy,
  });
}

export default {

  name: 'ember-cli-bem',
  initialize,

}
