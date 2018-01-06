/* eslint-disable no-unused-expressions */

import { module, test } from 'qunit';

import ClassicNamingStrategy from 'ember-cli-bem/naming-strategies/classic';

module('Unit | Naming Strategies | Classic');

test('should generate block class name', function(assert) {
  assert.expect(5);

  const strategy = ClassicNamingStrategy.create();

  const simpleName = 'button';
  const simpleClassName = strategy.getBlockClassName(simpleName);
  assert.equal(simpleClassName, 'button');

  const camelCasedName = 'camelCasedButton';
  const camelCasedClassName = strategy.getBlockClassName(camelCasedName);
  assert.equal(camelCasedClassName, 'camelCasedButton');

  const pascalCasedName = 'PascalCasedButton';
  const pascalCasedClassName = strategy.getBlockClassName(pascalCasedName);
  assert.equal(pascalCasedClassName, 'PascalCasedButton');

  const cssCasedName = 'b-button';
  const cssCasedClassName = strategy.getBlockClassName(cssCasedName);
  assert.equal(cssCasedClassName, 'b-button');

  const emptyName = '';
  const emptyClassName = strategy.getBlockClassName(emptyName);
  assert.equal(emptyClassName, '');
});

test('should generate elem class name', function(assert) {
  assert.expect(5);

  const strategy = ClassicNamingStrategy.create();

  const simpleName = 'button';
  const simpleElemName = 'container';
  const simpleElemClassName = strategy.getElemClassName(simpleName, simpleElemName);
  assert.equal(simpleElemClassName, 'button__container');

  const camelCasedName = 'camelCasedButton';
  const camelCasedElemName = 'containerItem';
  const camelCasedElemClassName = strategy.getElemClassName(camelCasedName, camelCasedElemName);
  assert.equal(camelCasedElemClassName, 'camelCasedButton__containerItem');

  const pascalCasedName = 'PascalCasedButton';
  const pascalCasedElemName = 'elemName';
  const pascalCasedElemClassName = strategy.getElemClassName(pascalCasedName, pascalCasedElemName);
  assert.equal(pascalCasedElemClassName, 'PascalCasedButton__elemName');

  const cssCasedName = 'b-button';
  const cssCasedElemName = 'container-item';
  const cssCasedElemClassName = strategy.getElemClassName(cssCasedName, cssCasedElemName);
  assert.equal(cssCasedElemClassName, 'b-button__container-item');

  const emptyName = '';
  const emptyElemName = 'elem'
  const emptyElemClassName = strategy.getElemClassName(emptyName, emptyElemName);
  assert.equal(emptyElemClassName, '__elem');
});

test('should support custom elem separator', function(assert) {
  assert.expect(1);

  const strategy = ClassicNamingStrategy.create({
    elemDelimiter: '-',
  });

  const simpleName = 'button';
  const simpleElemName = 'container';
  const simpleElemClassName = strategy.getElemClassName(simpleName, simpleElemName);
  assert.equal(simpleElemClassName, 'button-container');
});

test('should generate modifier with string value', function(assert) {
  assert.expect(2);

  const strategy = ClassicNamingStrategy.create();

  const parentName = 'block__elem';
  const modDefinition = {
    modName: 'type',
    modValue: 'cool',
  };
  const modClassName = strategy.getModClassName(parentName, modDefinition);
  assert.equal(modClassName, 'block__elem_type_cool');

  const emptyModDefinition = {
    modName: 'type',
    modValue: '',
  };
  const emptyModClassName = strategy.getModClassName(parentName, emptyModDefinition);
  assert.equal(emptyModClassName, '');
});

test('should calculate mod with boolean value', function(assert) {
  assert.expect(2);

  const strategy = ClassicNamingStrategy.create();

  const parentName = 'block__elem';
  const modDefinition = {
    modName: 'disabled',
    modValue: true,
  };
  const modClassName = strategy.getModClassName(parentName, modDefinition);
  assert.equal(modClassName, 'block__elem_disabled');

  const emptyModDefinition = {
    modName: 'type',
    modValue: false,
  };
  const emptyModClassName = strategy.getModClassName(parentName, emptyModDefinition);
  assert.equal(emptyModClassName, '');
});

test('should generate negative mod name if it exists and value is false', function(assert) {
  assert.expect(2);

  const strategy = ClassicNamingStrategy.create();

  const parentName = 'block__elem';
  const modDefinition = {
    modName: 'disabled',
    negativeModName: 'enabled',
    modValue: false,
  };
  const modClassName = strategy.getModClassName(parentName, modDefinition);
  assert.equal(modClassName, 'block__elem_enabled');

  const anotherModDefinition = {
    modName: 'type',
    negativeModName: 'enabled',
    modValue: '',
  };
  const anotherModClassName = strategy.getModClassName(parentName, anotherModDefinition);
  assert.equal(anotherModClassName, '');
});

test('should generate negative mod name if it exists and value is false', function(assert) {
  assert.expect(1);

  const strategy = ClassicNamingStrategy.create({
    modDelimiter: '--',
  });

  const parentName = 'block__elem';
  const modDefinition = {
    modName: 'type',
    modValue: 'cool',
  };
  const modClassName = strategy.getModClassName(parentName, modDefinition);
  assert.equal(modClassName, 'block__elem--type--cool');
});

test('should use only boolean mods in useKeyValuedMods if false', function(assert) {
  assert.expect(1);

  const strategy = ClassicNamingStrategy.create({
    useKeyValuedMods: false,
  });

  const parentName = 'block__elem';
  const modDefinition = {
    modName: 'disabled',
    modValue: 'maybe',
  };
  const modClassName = strategy.getModClassName(parentName, modDefinition);
  assert.equal(modClassName, 'block__elem_disabled');
});
