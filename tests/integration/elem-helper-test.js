import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { withChai } from 'ember-cli-chai/qunit';

moduleForComponent('helper:elem', 'Integration | Helper | elem', {
  integration: true
});

test('it should get blockName by default', withChai(function(expect, assert) {
  assert.expect(1);

  this.set('blockName', 'foo');
  this.render(hbs`{{elem 'bar'}}`);

  expect(this.$().text().trim()).to.be.equal('foo__bar');
}));

test('it should use specified blockName', withChai(function(expect, assert) {
  assert.expect(1);

  this.render(hbs`{{elem '123' blockName='abc'}}`);

  expect(this.$().text().trim()).to.be.equal('abc__123');
}));

test('it should generate mods class names', withChai(function(expect, assert) {
  assert.expect(1);

  this.set('blockName', 'foo');
  this.render(hbs`{{elem 'bar' hidden=true type='primary' disabled=false}}`);

  const classNames = this.$().text().trim().split(' ').sort();
  expect(classNames).to.be.deep.equal([
    'foo__bar',
    'foo__bar_hidden',
    'foo__bar_type_primary',
  ]);
}));
