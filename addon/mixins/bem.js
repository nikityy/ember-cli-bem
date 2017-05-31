import Ember from 'ember';

const {
  computed,
  defineProperty,
  get,
  Mixin,
  set,
} = Ember;

export function elem(blockName, elemName) {
  return `${blockName}__${elemName}`;
}

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
    const modsDependencies = mods.map((mod) => this._getModValueKey(mod));

    defineProperty(
      this,
      'modsClassNames',
      computed('blockClassName', ...modsDependencies, this._getModsClassNames)
    );
  },

  blockClassName: computed('blockName', 'elemName', function() {
    const blockName = get(this, 'blockName');
    const elemName = get(this, 'elemName');

    if (blockName && elemName) {
      return elem(blockName, elemName);
    } else if (blockName) {
      return `${blockName}`;
    }
  }),

  _getModName(modDefinition) {
    const [modName, modValueProperty] = modDefinition.split(':');
    return modValueProperty || modName;
  },

  _getModValueKey(modDefinition) {
    const [modName] = modDefinition.split(':');
    return modName;
  },

  _getNegativeModName(modDefinition) {
    const [,, negativeModValueProperty] = modDefinition.split(':');
    return negativeModValueProperty;
  },

  _getModsClassNames() {
    const blockClassName = get(this, 'blockClassName');
    const mods = get(this, 'mods');

    const modsClassNames = mods.map((mod) => {
      const modName = this._getModName(mod);
      const negativeModName = this._getNegativeModName(mod);
      const modValueProperty = this._getModValueKey(mod);
      const value = get(this, modValueProperty);

      const hasNegativeModName = typeof negativeModName !== 'undefined';

      if (hasNegativeModName || typeof value === 'boolean') {
        if (value) {
          return `${blockClassName}_${modName}`;
        } else if (hasNegativeModName) {
          return `${blockClassName}_${negativeModName}`;
        }
      } else if (value) {
        return `${blockClassName}_${modName}_${value}`;
      }
    });

    return modsClassNames.join(' ');
  },

});
