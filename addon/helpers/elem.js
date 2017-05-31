import Ember from 'ember';
import { elem } from 'ember-cli-bem/mixins/bem';

const {
  HTMLBars: { makeBoundHelper },
} = Ember;

export default makeBoundHelper(function(params, hash) {
  const { blockName } = hash;
  const [ elemName ] = params;

  if (!blockName) {
    throw Error(`blockName is required for 'elem' helper`);
  }

  return elem(blockName, elemName);
});
