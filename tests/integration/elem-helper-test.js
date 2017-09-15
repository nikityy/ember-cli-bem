import hbs from 'htmlbars-inline-precompile';
import ClassicNamingStrategy from 'ember-cli-bem/naming-strategies/classic';
import { moduleForComponent, test } from 'ember-qunit';
import { withChai } from 'ember-cli-chai/qunit';

moduleForComponent('helper:elem', 'Integration | Helper | elem', {
  integration: true
});

test('it should get blockName by default', withChai(function(expect, assert) {
  assert.expect(1);

  const strategy = new ClassicNamingStrategy();

  this.set('blockName', 'foo');
  this.set('__namingStrategy__', strategy);
  this.render(hbs`{{elem 'bar'}}`);

  expect(this.$().text().trim()).to.be.equal('foo__bar');
}));

test('it should use specified blockName', withChai(function(expect, assert) {
  assert.expect(1);

  const strategy = new ClassicNamingStrategy();

  this.set('__namingStrategy__', strategy);
  this.render(hbs`{{elem '123' blockName='abc'}}`);

  expect(this.$().text().trim()).to.be.equal('abc__123');
}));

test('it should generate mods class names', withChai(function(expect, assert) {
  assert.expect(1);

  const strategy = new ClassicNamingStrategy();

  this.set('blockName', 'foo');
  this.set('__namingStrategy__', strategy);
  this.render(hbs`{{elem 'bar' hidden=true type='primary' disabled=false}}`);

  const classNames = this.$().text().trim().split(' ').sort();
  expect(classNames).to.be.deep.equal([
    'foo__bar',
    'foo__bar_hidden',
    'foo__bar_type_primary',
  ]);
}));
