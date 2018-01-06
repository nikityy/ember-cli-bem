import { run } from '@ember/runloop';
import { set } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent(
  'dummy-component',
  'Integration | Components | dummy-component',
  {
    integration: true,
  }
);

const dummyComponentSelector = '.dummy-component';

test('should add block class name', function(assert) {
  assert.expect(1);

  const blockName = 'checkbox';
  this.set('blockName', blockName);

  this.render(hbs`
    {{dummy-component
      blockName=blockName
    }}
  `);

  const hasBlockClassName = this.$(dummyComponentSelector).hasClass(blockName);
  assert.ok(hasBlockClassName);
});

test('should add element class name', function(assert) {
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
  assert.ok(hasElemClassName);
});

test('should add key-value mod', function(assert) {
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
  assert.ok(hasKeyValueModClass);
});

test('should add boolean mod', function(assert) {
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
  assert.ok(hasBooleanModClass);
});

test('should add mod with custom name', function(assert) {
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
  assert.ok(hasCustomNameModClass);
});

test('should not add mod with false value', function(assert) {
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
  assert.ok(hasFalseModClass);
});

test('should add negative mod name if value is false', function(assert) {
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
  assert.ok(hasNegativeModClass);
});

test('should add multiple mods class names', function(assert) {
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
  assert.ok(hasColorModClass);

  const hasDisabledModClass = component.hasClass(`${blockName}_disabled`);
  assert.ok(hasDisabledModClass);
});

test('should recalculate modsClassNames when dependent property has changed', function(assert) {
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
  assert.ok(hasNewModClass);
});
