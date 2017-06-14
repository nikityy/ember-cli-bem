import Ember from 'ember';
import { elem, mod } from 'ember-cli-bem/mixins/bem';

const {
  Helper: { helper }
} = Ember;

const BLOCK_KEY = 'blockName';

export default helper(function(params, hash) {
  const blockName = hash[BLOCK_KEY];
  const [ elemName ] = params;

  if (!blockName) {
    throw Error(`${BLOCK_KEY} is required for 'elem' helper`);
  }

  const elemClassName = elem(blockName, elemName);

  const modNames = Object.keys(hash).filter((key) => key !== BLOCK_KEY);
  const modClassNames = modNames.map((modName) => {
    const modValue = hash[modName];
    return mod(elemClassName, { modName, modValue });
  });

  return [elemClassName, ...modClassNames].filter(Boolean).join(' ');
});
