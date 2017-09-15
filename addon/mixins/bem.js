import Ember from 'ember';
import config from 'ember-get-config';
import { NAMING_STRATEGY_KEY } from '../variables';
import ClassicNamingStrategy from 'ember-cli-bem/naming-strategies/classic';

const {
  Component,
  computed,
  defineProperty,
  get,
  Mixin,
  set,
} = Ember;

export default Mixin.create({

  classNameBindings: [
    'blockClassName',
    'modsClassNames',
  ],
  concatenatedProperties: ['mods'],

  blockName: null,
  elemName: null,
  mods: null,

  init() {
    this._super(...arguments);

    if (!get(this, 'mods')) {
      set(this, 'mods', []);
    }

    if (!get(this, NAMING_STRATEGY_KEY)) {
      this.__registerNamingStrategy__();
    }

    const mods = get(this, 'mods');
    const modsDependencies = mods.map((mod) => this.__getModValueKey__(mod));

    defineProperty(
      this,
      'modsClassNames',
      computed('blockClassName', ...modsDependencies, this.__getModsClassNames__)
    );
  },

  blockClassName: computed('blockName', 'elemName', function() {
    const blockName = get(this, 'blockName');
    const elemName = get(this, 'elemName');
    const namingStrategy = get(this, '__namingStrategy__');

    if (blockName && elemName) {
      return namingStrategy.getElemClassName(blockName, elemName);
    } else if (blockName) {
      return namingStrategy.getBlockClassName(blockName);
    }
  }),

  __getAddonConfig__() {
    return config['ember-cli-bem'];
  },

  __getNamingStrategyFactory__() {
    return ClassicNamingStrategy;
  },

  __registerNamingStrategy__() {
    const config = this.__getAddonConfig__();
    const namingStrategyFactory = this.__getNamingStrategyFactory__();
    const namingStrategy = namingStrategyFactory.create(config);

    Component.reopen({
      [NAMING_STRATEGY_KEY]: namingStrategy,
    });
    set(this, NAMING_STRATEGY_KEY, namingStrategy);
  },

  __getModName__(modDefinition) {
    const [modName, modValueProperty] = modDefinition.split(':');
    return modValueProperty || modName;
  },

  __getModValueKey__(modDefinition) {
    const [modName] = modDefinition.split(':');
    return modName;
  },

  __getNegativeModName__(modDefinition) {
    const [,, negativeModValueProperty] = modDefinition.split(':');
    return negativeModValueProperty;
  },

  __getModsClassNames__() {
    const blockClassName = get(this, 'blockClassName');
    const namingStrategy = get(this, '__namingStrategy__');
    const mods = get(this, 'mods');

    const modsClassNames = mods.map((modDefinition) => {
      const modName = this.__getModName__(modDefinition);
      const negativeModName = this.__getNegativeModName__(modDefinition);
      const modValueProperty = this.__getModValueKey__(modDefinition);
      const modValue = get(this, modValueProperty);

      return namingStrategy.getModClassName(blockClassName, {
        modName,
        negativeModName,
        modValue
      });
    });

    return modsClassNames.join(' ');
  },

});
