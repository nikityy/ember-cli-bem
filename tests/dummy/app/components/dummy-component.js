import Ember from 'ember';
import BEM from 'ember-cli-bem/mixins/bem';

const {
  Component,
} = Ember;

export default Component.extend(BEM, {

  blockName: null,
  elemName: null,
  classNames: ['dummy-component'],

});
