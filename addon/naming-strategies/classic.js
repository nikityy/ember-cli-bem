import Ember from 'ember';
import BaseNamingStrategy from 'ember-cli-bem/naming-strategies/base';

const {
  get,
} = Ember;

/**
 *  Classic BEM naming implemntation.
 *  Supports modifiers both string (block__elem_modName_modValue)
 *  and boolean (block__elem_modName) modifiers.
 */
export default BaseNamingStrategy.extend({

  elemDelimiter: '__',
  modDelimiter: '_',
  useKeyValuedMods: true,

  /**
   * Generates block class name for provided string value
   * @param {string} blockName
   * @return {string}
   */
  getBlockClassName(blockName) {
    return blockName;
  },

  /**
   * Generates elem class name for provided block name and elem name
   * @param {string} blockName
   * @param {string} elemName
   * @return {string}
   */
  getElemClassName(blockName, elemName) {
    const elemDelimiter = get(this, 'elemDelimiter');
    return `${blockName}${elemDelimiter}${elemName}`;
  },

  /**
   * Generates modifier class name for provided block or elem name and mod definition
   * @param {string} parentName
   * @param {object} modDefinition
   * @return {string}
   */
  getModClassName(parentName, modDefinition) {
    const useKeyValuedMods = get(this, 'useKeyValuedMods');
    const { modValue } = modDefinition;
    if (!useKeyValuedMods || typeof modValue === 'boolean') {
      return this._getBooleanModClassName(parentName, modDefinition);
    } else {
      return this._getKeyValueModClassName(parentName, modDefinition);
    }
  },

  /**
   * Generates modifier class name for boolean value
   * @private
   * @param {string} parentName
   * @param {object} modDefinition
   * @return {string}
   */
  _getBooleanModClassName(parentName, modDefinition) {
    const modDelimiter = get(this, 'modDelimiter');
    const { modName, negativeModName, modValue } = modDefinition;
    const hasNegativeModName = typeof negativeModName !== 'undefined';

    if (hasNegativeModName && !modValue) {
      return `${parentName}${modDelimiter}${negativeModName}`;
    } else if (modValue) {
      return `${parentName}${modDelimiter}${modName}`;
    } else {
      return '';
    }
  },

  /**
   * Generates modifier class name for string value
   * @private
   * @param {string} parentName
   * @param {object} modDefinition
   * @return {string}
   */
  _getKeyValueModClassName(parentName, modDefinition) {
    const modDelimiter = get(this, 'modDelimiter');
    const { modName, modValue } = modDefinition;

    if (modValue) {
      return `${parentName}${modDelimiter}${modName}${modDelimiter}${modValue}`;
    } else {
      return '';
    }
  },

});
