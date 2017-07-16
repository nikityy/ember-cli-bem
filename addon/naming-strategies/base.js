export default class BaseNamingStrategy {

  constructor({ elemDelimiter, modDelimiter, useKeyValuedMods } = {}) {
    this.elemDelimiter = elemDelimiter;
    this.modDelimiter = modDelimiter;
    this.useKeyValuedMods = useKeyValuedMods;
  }

}
