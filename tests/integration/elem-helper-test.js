import hbs from 'htmlbars-inline-precompile';
import ClassicNamingStrategy from 'ember-cli-bem/naming-strategies/classic';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('helper:elem', 'Integration | Helper | elem', {
  integration: true
});

test('it should get blockName by default', function(assert) {
  assert.expect(1);

  const strategy = new ClassicNamingStrategy();

  this.set('blockName', 'foo');
  this.set('__namingStrategy__', strategy);
  this.render(hbs`{{elem 'bar'}}`);

  assert.equal(this.$().text().trim(), 'foo__bar');
});

test('it should use specified blockName', function(assert) {
  assert.expect(1);

  const strategy = new ClassicNamingStrategy();

  this.set('__namingStrategy__', strategy);
  this.render(hbs`{{elem '123' blockName='abc'}}`);

  assert.equal(this.$().text().trim(), 'abc__123');
});

test('it should generate mods class names', function(assert) {
  assert.expect(1);

  const strategy = new ClassicNamingStrategy();

  this.set('blockName', 'foo');
  this.set('__namingStrategy__', strategy);
  this.render(hbs`{{elem 'bar' hidden=true type='primary' disabled=false}}`);

  const classNames = this.$().text().trim().split(' ').sort();
  assert.deepEqual(classNames, [
    'foo__bar',
    'foo__bar_hidden',
    'foo__bar_type_primary',
  ]);
});
