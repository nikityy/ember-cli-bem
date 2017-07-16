import ClassicNamingStrategy from 'ember-cli-bem/naming-strategies/classic';

export function initialize(application) {
  application.register('naming-strategies:classic', ClassicNamingStrategy);
}

export default {

  name: 'classic-naming-strategy',
  initialize,

}
