import BaseNamingStrategy from 'ember-cli-bem/naming-strategies/base';

/**
 *  Classic BEM naming implemntation.
 *  Supports modifiers both string (block__elem_modName_modValue)
 *  and boolean (block__elem_modName) modifiers.
 */
export default class ClassicNamingStrategy extends BaseNamingStrategy {

  constructor(options) {
    super(options);

    const { elemSeparator, modSeparator } = this;

    if (!elemSeparator) {
      this.elemSeparator = '__';
    }

    if (!modSeparator) {
      this.modSeparator = '_';
    }
  }

  /**
   * Generates block class name for provided string value
   * @param {string} blockName
   * @return {string}
   */
  getBlockClassName(blockName) {
    return blockName;
  }

  /**
   * Generates elem class name for provided block name and elem name
   * @param {string} blockName
   * @param {string} elemName
   * @return {string}
   */
  getElemClassName(blockName, elemName) {
    const { elemSeparator } = this;
    return `${blockName}${elemSeparator}${elemName}`;
  }

  /**
   * Generates modifier class name for provided block or elem name and mod definition
   * @param {string} parentName
   * @param {object} modDefinition
   * @return {string}
   */
  getModClassName(parentName, modDefinition) {
    const { modValue } = modDefinition;
    if (typeof modValue === 'boolean') {
      return this._getBooleanModClassName(parentName, modDefinition);
    } else {
      return this._getStringModClassName(parentName, modDefinition);
    }
  }

  /**
   * Generates modifier class name for boolean value
   * @private
   * @param {string} parentName
   * @param {object} modDefinition
   * @return {string}
   */
  _getBooleanModClassName(parentName, modDefinition) {
    const { modSeparator } = this;
    const { modName, negativeModName, modValue } = modDefinition;
    const hasNegativeModName = typeof negativeModName !== 'undefined';

    if (hasNegativeModName && !modValue) {
      return `${parentName}${modSeparator}${negativeModName}`;
    } else if (modValue) {
      return `${parentName}${modSeparator}${modName}`;
    } else {
      return '';
    }
  }

  /**
   * Generates modifier class name for string value
   * @private
   * @param {string} parentName
   * @param {object} modDefinition
   * @return {string}
   */
  _getStringModClassName(parentName, modDefinition) {
    const { modSeparator } = this;
    const { modName, modValue } = modDefinition;

    if (modValue) {
      return `${parentName}${modSeparator}${modName}${modSeparator}${modValue}`;      
    } else {
      return '';
    }
  }

}
