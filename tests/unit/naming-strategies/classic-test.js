/* eslint-disable no-unused-expressions */

import { module, test } from 'qunit';
import { withChai } from 'ember-cli-chai/qunit';

import ClassicNamingStrategy from 'ember-cli-bem/naming-strategies/classic';

module('Unit | Naming Strategies | Classic');

test('should generate block class name', withChai(function(expect, assert) {
  assert.expect(5);

  const strategy = new ClassicNamingStrategy();

  const simpleName = 'button';
  const simpleClassName = strategy.getBlockClassName(simpleName);
  expect(simpleClassName).to.be.equal('button');

  const camelCasedName = 'camelCasedButton';
  const camelCasedClassName = strategy.getBlockClassName(camelCasedName);
  expect(camelCasedClassName).to.be.equal('camelCasedButton');

  const pascalCasedName = 'PascalCasedButton';
  const pascalCasedClassName = strategy.getBlockClassName(pascalCasedName);
  expect(pascalCasedClassName).to.be.equal('PascalCasedButton');

  const cssCasedName = 'b-button';
  const cssCasedClassName = strategy.getBlockClassName(cssCasedName);
  expect(cssCasedClassName).to.be.equal('b-button');

  const emptyName = '';
  const emptyClassName = strategy.getBlockClassName(emptyName);
  expect(emptyClassName).to.be.equal('');
}));

test('should generate elem class name', withChai(function(expect, assert) {
  assert.expect(5);

  const strategy = new ClassicNamingStrategy();

  const simpleName = 'button';
  const simpleElemName = 'container';
  const simpleElemClassName = strategy.getElemClassName(simpleName, simpleElemName);
  expect(simpleElemClassName).to.be.equal('button__container');

  const camelCasedName = 'camelCasedButton';
  const camelCasedElemName = 'containerItem';
  const camelCasedElemClassName = strategy.getElemClassName(camelCasedName, camelCasedElemName);
  expect(camelCasedElemClassName).to.be.equal('camelCasedButton__containerItem');

  const pascalCasedName = 'PascalCasedButton';
  const pascalCasedElemName = 'elemName';
  const pascalCasedElemClassName = strategy.getElemClassName(pascalCasedName, pascalCasedElemName);
  expect(pascalCasedElemClassName).to.be.equal('PascalCasedButton__elemName');

  const cssCasedName = 'b-button';
  const cssCasedElemName = 'container-item';
  const cssCasedElemClassName = strategy.getElemClassName(cssCasedName, cssCasedElemName);
  expect(cssCasedElemClassName).to.be.equal('b-button__container-item');

  const emptyName = '';
  const emptyElemName = 'elem'
  const emptyElemClassName = strategy.getElemClassName(emptyName, emptyElemName);
  expect(emptyElemClassName).to.be.equal('__elem');
}));

test('should support custom elem separator', withChai(function(expect, assert) {
  assert.expect(1);

  const strategy = new ClassicNamingStrategy({
    elemDelimiter: '-',
  });

  const simpleName = 'button';
  const simpleElemName = 'container';
  const simpleElemClassName = strategy.getElemClassName(simpleName, simpleElemName);
  expect(simpleElemClassName).to.be.equal('button-container');
}));

test('should generate modifier with string value', withChai(function(expect, assert) {
  assert.expect(2);

  const strategy = new ClassicNamingStrategy();

  const parentName = 'block__elem';
  const modDefinition = {
    modName: 'type',
    modValue: 'cool',
  };
  const modClassName = strategy.getModClassName(parentName, modDefinition);
  expect(modClassName).to.be.equal('block__elem_type_cool');

  const emptyModDefinition = {
    modName: 'type',
    modValue: '',
  };
  const emptyModClassName = strategy.getModClassName(parentName, emptyModDefinition);
  expect(emptyModClassName).to.be.equal('');
}));

test('should calculate mod with boolean value', withChai(function(expect, assert) {
  assert.expect(2);

  const strategy = new ClassicNamingStrategy();

  const parentName = 'block__elem';
  const modDefinition = {
    modName: 'disabled',
    modValue: true,
  };
  const modClassName = strategy.getModClassName(parentName, modDefinition);
  expect(modClassName).to.be.equal('block__elem_disabled');

  const emptyModDefinition = {
    modName: 'type',
    modValue: false,
  };
  const emptyModClassName = strategy.getModClassName(parentName, emptyModDefinition);
  expect(emptyModClassName).to.be.equal('');
}));

test('should generate negative mod name if it exists and value is false', withChai(function(expect, assert) {
  assert.expect(2);

  const strategy = new ClassicNamingStrategy();

  const parentName = 'block__elem';
  const modDefinition = {
    modName: 'disabled',
    negativeModName: 'enabled',
    modValue: false,
  };
  const modClassName = strategy.getModClassName(parentName, modDefinition);
  expect(modClassName).to.be.equal('block__elem_enabled');

  const anotherModDefinition = {
    modName: 'type',
    negativeModName: 'enabled',
    modValue: '',
  };
  const anotherModClassName = strategy.getModClassName(parentName, anotherModDefinition);
  expect(anotherModClassName).to.be.equal('');
}));

test('should generate negative mod name if it exists and value is false', withChai(function(expect, assert) {
  assert.expect(1);

  const strategy = new ClassicNamingStrategy({
    modDelimiter: '--',
  });

  const parentName = 'block__elem';
  const modDefinition = {
    modName: 'type',
    modValue: 'cool',
  };
  const modClassName = strategy.getModClassName(parentName, modDefinition);
  expect(modClassName).to.be.equal('block__elem--type--cool');
}));

test('should use only boolean mods in useKeyValuedMods if false', withChai(function(expect, assert) {
  assert.expect(1);

  const strategy = new ClassicNamingStrategy({
    useKeyValuedMods: false,
  });

  const parentName = 'block__elem';
  const modDefinition = {
    modName: 'disabled',
    modValue: 'maybe',
  };
  const modClassName = strategy.getModClassName(parentName, modDefinition);
  expect(modClassName).to.be.equal('block__elem_disabled');
}));
