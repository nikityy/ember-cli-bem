import Ember from 'ember';
import { NAMING_STRATEGY_KEY } from '../variables';

const {
  Helper: { helper }
} = Ember;

const BLOCK_KEY = 'blockName';

export default helper(function(params, hash) {
  const blockName = hash[BLOCK_KEY];
  const namingStrategy = hash[NAMING_STRATEGY_KEY];
  const [ elemName ] = params;

  if (!blockName) {
    throw Error(`${BLOCK_KEY} is required for 'elem' helper`);
  }

  const elemClassName = namingStrategy.getElemClassName(blockName, elemName);

  const modNames = Object.keys(hash).filter((key) => key !== BLOCK_KEY && key !== NAMING_STRATEGY_KEY);
  const modClassNames = modNames.map((modName) => {
    const modValue = hash[modName];
    return namingStrategy.getModClassName(elemClassName, { modName, modValue });
  });

  return [elemClassName, ...modClassNames].filter(Boolean).join(' ');
});
