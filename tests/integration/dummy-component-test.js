import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import emberCliBemInitializer from 'dummy/initializers/ember-cli-bem';
import { moduleForComponent, test } from 'ember-qunit';
import { withChai } from 'ember-cli-chai/qunit';

const {
  run,
  set,
} = Ember;

moduleForComponent(
  'dummy-component',
  'Integration | Components | dummy-component',
  {
    integration: true,
    beforeEach() {
      emberCliBemInitializer.initialize(this);
    },
  }
);

const dummyComponentSelector = '.dummy-component';

test('should add block class name', withChai(function(expect, assert) {
  assert.expect(1);

  const blockName = 'checkbox';
  this.set('blockName', blockName);

  this.render(hbs`
    {{dummy-component
      blockName=blockName
    }}
  `);

  const hasBlockClassName = this.$(dummyComponentSelector).hasClass(blockName);
  expect(hasBlockClassName).to.be.ok;
}));

test('should add element class name', withChai(function(expect, assert) {
  assert.expect(1);

  const blockName = 'checkbox';
  const elemName = 'input';
  this.set('blockName', blockName);
  this.set('elemName', elemName);

  this.render(hbs`
    {{dummy-component
      blockName=blockName
      elemName=elemName
    }}
  `);

  const hasElemClassName = this.$(dummyComponentSelector).hasClass(`${blockName}__${elemName}`);
  expect(hasElemClassName).to.be.ok;
}));

test('should add key-value mod', withChai(function(expect, assert) {
  assert.expect(1);

  const blockName = 'checkbox';
  this.set('blockName', blockName);

  const mods = [
    'color',
  ];
  this.set('mods', mods);

  const color = 'red';
  this.set('color', color);

  this.render(hbs`
    {{dummy-component
      blockName=blockName
      mods=mods
      color=color
    }}
  `);

  const hasKeyValueModClass = this.$(dummyComponentSelector).hasClass(`${blockName}_color_${color}`);
  expect(hasKeyValueModClass).to.be.ok;
}));

test('should add boolean mod', withChai(function(expect, assert) {
  assert.expect(1);

  const blockName = 'checkbox';
  this.set('blockName', blockName);

  const mods = [
    'disabled',
  ];
  this.set('mods', mods);

  this.set('disabled', true);

  this.render(hbs`
    {{dummy-component
      blockName=blockName
      mods=mods
      disabled=disabled
    }}
  `);

  const hasBooleanModClass = this.$(dummyComponentSelector).hasClass(`${blockName}_disabled`);
  expect(hasBooleanModClass).to.be.ok;
}));

test('should add mod with custom name', withChai(function(expect, assert) {
  assert.expect(1);

  const blockName = 'checkbox';
  this.set('blockName', blockName);

  const mods = [
    'selectMode:select-mode',
  ];
  this.set('mods', mods);

  this.set('selectMode', true);

  this.render(hbs`
    {{dummy-component
      blockName=blockName
      mods=mods
      selectMode=selectMode
    }}
  `);

  const hasCustomNameModClass = this.$(dummyComponentSelector).hasClass(`${blockName}_select-mode`);
  expect(hasCustomNameModClass).to.be.ok;
}));

test('should not add mod with false value', withChai(function(expect, assert) {
  assert.expect(1);

  const blockName = 'checkbox';
  this.set('blockName', blockName);

  const mods = [
    'hidden',
  ];
  this.set('mods', mods);

  this.set('hidden', false);

  this.render(hbs`
    {{dummy-component
      blockName=blockName
      mods=mods
      hidden=hidden
    }}
  `);

  const hasFalseModClass = this.$(dummyComponentSelector).hasClass(`${blockName}_disabled`);
  expect(hasFalseModClass).to.be.not.ok;
}));

test('should add negative mod name if value is false', withChai(function(expect, assert) {
  assert.expect(1);

  const blockName = 'checkbox';
  this.set('blockName', blockName);

  const mods = [
    'pressed:pressed:non-pressed',
  ];
  this.set('mods', mods);

  this.set('pressed', false);

  this.render(hbs`
    {{dummy-component
      blockName=blockName
      mods=mods
      pressed=pressed
    }}
  `);

  const hasNegativeModClass = this.$(dummyComponentSelector).hasClass(`${blockName}_non-pressed`);
  expect(hasNegativeModClass).to.be.ok;
}));

test('should add multiple mods class names', withChai(function(expect, assert) {
  assert.expect(2);

  const blockName = 'checkbox';
  this.set('blockName', blockName);

  const mods = [
    'color',
    'disabled'
  ];
  this.set('mods', mods);

  const color = 'black';
  this.set('color', color);
  this.set('disabled', true);

  this.render(hbs`
    {{dummy-component
      blockName=blockName
      mods=mods
      color=color
      disabled=disabled
    }}
  `);

  const component = this.$(dummyComponentSelector);

  const hasColorModClass = component.hasClass(`${blockName}_color_${color}`);
  expect(hasColorModClass).to.be.ok;

  const hasDisabledModClass = component.hasClass(`${blockName}_disabled`);
  expect(hasDisabledModClass).to.be.ok;
}));

test('should recalculate modsClassNames when dependent property has changed', withChai(function(expect, assert) {
  assert.expect(1);

  const blockName = 'checkbox';
  this.set('blockName', blockName);

  const mods = [
    'color',
  ];
  this.set('mods', mods);

  const color = 'red';
  this.set('color', color);

  this.render(hbs`
    {{dummy-component
      blockName=blockName
      mods=mods
      color=color
    }}
  `);

  const newColor = 'black';
  run(() => {
    set(this, 'color', newColor);
  })

  const hasNewModClass = this.$(dummyComponentSelector).hasClass(`${blockName}_color_${newColor}`);
  expect(hasNewModClass).to.be.ok;
}));
