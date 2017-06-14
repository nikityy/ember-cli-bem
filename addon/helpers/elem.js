import Ember from 'ember';
import { elem, mod } from 'ember-cli-bem/mixins/bem';

const {
  HTMLBars: { makeBoundHelper },
} = Ember;

export default makeBoundHelper(function(params, hash) {
  const { blockName } = hash
  const [ elemName ] = params;

  if (!blockName) {
    throw Error(`blockName is required for 'elem' helper`);
  }

  const elemClassName = elem(blockName, elemName);

  const modNames = Object.keys(hash).filter((key) => key !== 'blockName');
  const modClassNames = modNames.map((modName) => {
    const modValue = hash[modName];
    return mod(elemClassName, { modName, modValue });
  });

  return [elemClassName, ...modClassNames].filter(Boolean).join(' ');
});
