import Ember from 'ember';
import NamingStrategyFactory from 'ember-cli-bem/naming-strategies/factory';

const {
  computed,
  defineProperty,
  get,
  getOwner,
  Logger: { error },
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

  __namingStrategy__: computed(function() {
    const factory = new NamingStrategyFactory();

    try {
      const environment = getOwner(this).lookup('config:environment');
      const config = environment['ember-cli-bem'];
      return factory.getStrategy(config);
    } catch (e) {
      error('Cannot access config', e);
      const defaultConfig = {
        namingStrategy: 'classic',
      };
      return factory.getStrategy(defaultConfig);
    }
  }),

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
