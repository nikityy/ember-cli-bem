import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { withChai } from 'ember-cli-chai/qunit';

const {
  get,
  run,
  set,
} = Ember;

moduleForComponent('dummy-component', 'Integration | Components | dummy-component', {
  unit: true
});

test('should correctly calculate blockClassName with blockName', withChai(function(expect, assert) {
  assert.expect(1);

  const block = this.subject({
    blockName: 'checkbox',
  });

  const blockClassName = get(block, 'blockClassName');
  expect(blockClassName).to.be.equal('checkbox');
}));

test('should correctly calculate blockClassName with blockName and elemName', withChai(function(expect, assert) {
  assert.expect(1);

  const block = this.subject({
    blockName: 'checkbox',
    elemName: 'label',
  });

  const blockClassName = get(block, 'blockClassName');
  expect(blockClassName).to.be.equal('checkbox__label');
}));

test('should calculate mod with string value', withChai(function(expect, assert) {
  assert.expect(1);

  const redButton = this.subject({
    blockName: 'button',
    mods: [
      'color',
    ],
    color: 'red',
  });

  const modsClassNames = get(redButton, 'modsClassNames');
  expect(modsClassNames).to.be.equal('button_color_red');
}));

test('should calculate mod with boolean value', withChai(function(expect, assert) {
  assert.expect(1);

  const disabledButton = this.subject({
    blockName: 'button',
    mods: [
      'disabled',
    ],
    disabled: true,
  });

  const modsClassNames = get(disabledButton, 'modsClassNames');
  expect(modsClassNames).to.be.equal('button_disabled');
}));

test('should calculate mod with custom value key', withChai(function(expect, assert) {
  assert.expect(1);

  const selectModeButton = this.subject({
    blockName: 'button',
    mods: [
      'selectMode:select-mode',
    ],
    selectMode: true,
  });

  const modsClassNames = get(selectModeButton, 'modsClassNames');
  expect(modsClassNames).to.be.equal('button_select-mode');
}));

test('should hide mod with false boolean value', withChai(function(expect, assert) {
  assert.expect(1);

  const hiddenButton = this.subject({
    blockName: 'button',
    mods: [
      'hidden',
    ],
    hidden: false,
  });

  const modsClassNames = get(hiddenButton, 'modsClassNames');
  expect(modsClassNames).to.be.equal('');
}));

test('should use negative mod name if it exists and value if false', withChai(function(expect, assert) {
  assert.expect(1);

  const negativeStateButton = this.subject({
    blockName: 'button',
    mods: [
      'pressed:pressed:non-pressed',
    ],
    pressed: false,
  });

  const modsClassNames = get(negativeStateButton, 'modsClassNames');
  expect(modsClassNames).to.be.equal('button_non-pressed');
}));

test('should calculate multiple mods', withChai(function(expect, assert) {
  assert.expect(1);

  const complexButton = this.subject({
    blockName: 'button',
    mods: [
      'disabled',
      'color',
    ],
    disabled: true,
    color: 'black',
  });

  const modsClassNames = get(complexButton, 'modsClassNames');
  expect(modsClassNames).to.be.equal('button_disabled button_color_black');
}));

test('should recalculate modsClassNames when dependent property has changed', withChai(function(expect, assert) {
  assert.expect(2);

  const button = this.subject({
    blockName: 'button',
    mods: [
      'color',
    ],
    color: 'red',
  });

  expect(get(button, 'modsClassNames')).to.be.equal('button_color_red');

  run(() => {
    set(button, 'color', 'black');
  });

  expect(
    get(button, 'modsClassNames'),
    'should recalculate mod when dependent key has changed'
  ).to.be.equal('button_color_black');
}));
