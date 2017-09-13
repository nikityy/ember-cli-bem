import Ember from 'ember';
import ClassicNamingStrategy from 'ember-cli-bem/naming-strategies/classic';

const {
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

    // Fallback to classic naming strategy if it hasn't been injected
    if (!get(this, '__namingStrategy__')) {
      set(this, '__namingStrategy__', ClassicNamingStrategy.create());
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
