# ember-cli-bem

Dumb addon to add some BEM into your project.

## Defining Blocks and Elements

Mix an `ember-cli-bem/mixins/bem` mixin into your component, then you
could define `blockName` and `elemName` for your component. Look at the example below:

```js
import Ember from 'ember';
import BEM from 'ember-cli-bem/mixins/bem';

export default Ember.Component.extend(BEM, {
  blockName: 'button',
  elemName: 'icon'
});
```

This component will have a `button__icon` class.

## Defining Modificators

With the same `ember-cli-bem/mixins/bem`, you
could set `mods` array to your component. This example:

```js
import Ember from 'ember';
import BEM from 'ember-cli-bem/mixins/bem';

export default Ember.Component.extend(BEM, {
  blockName: 'button',

  mods: [
    'disabled',
    'type',
    'clear:with-clear:without-clear'
  ],

  disabled: true,
  type: 'submit',
  clear: false,
});
```

This component will have a `button` class with following modificators classes:
* `button_disabled`
* `button_type_submit`
* `button_without-clear`

## Using elem helper

When you applied BEM mixin, you also can use `elem` helper in your templates.

```hbs
  <div class="{{elem 'icon'}}"></div>
  <div class="{{elem 'caption'}}">
    {{text}}
  </div>
```

Applying to the above example with the button, these elements will have
`button__icon` and `button__caption` classes accordingly.

## Installation

```sh
ember install ember-cli-bem
```

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
