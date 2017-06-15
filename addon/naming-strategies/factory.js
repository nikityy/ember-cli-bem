import ClassicNamingStrategy from 'ember-cli-bem/naming-strategies/classic';
import TwoDashesNamingStrategy from 'ember-cli-bem/naming-strategies/two-dashes';


export default class NamingStrategyFactory {

  constructor() {
    this.mapping = {
      'classic': ClassicNamingStrategy,
      'two-dashes': TwoDashesNamingStrategy,
    };
  }

  getStrategy({ namingStrategy, elemSeparator, modSeparator }) {
    const { mapping } = this;
    const namingStrategyConstructor = mapping[namingStrategy];

    if (!namingStrategy) {
      throw Error(`Unknown naming strategy: ${namingStrategy}`);
    }

    return new namingStrategyConstructor({
      elemSeparator,
      modSeparator,
    });
  }

}
