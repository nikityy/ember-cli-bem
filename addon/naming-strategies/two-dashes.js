import BaseNamingStrategy from 'ember-cli-bem/naming-strategies/base';

/**
 *  Two dashed naming strategy.
 *  Uses only boolean modifiers, without modifier value.
 */
export default class TwoDashesNamingStrategy extends BaseNamingStrategy {

  constructor(options) {
    super(options);

    const { elemSeparator, modSeparator } = this;

    if (!elemSeparator) {
      this.elemSeparator = '__';
    }

    if (!modSeparator) {
      this.modSeparator = '--';
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
    const { modSeparator } = this;
    const { modName, negativeModName, modValue } = modDefinition;
    const hasNegativeModName = typeof negativeModName !== 'undefined';

    if (hasNegativeModName && !modValue) {
      return `${parentName}${modSeparator}${negativeModName}`
    } else if (modValue) {
      return `${parentName}${modSeparator}${modName}`
    } else {
      return '';
    }
  }

}
