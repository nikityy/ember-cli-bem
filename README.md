# ember-cli-bem [![Build Status](https://travis-ci.org/nikityy/ember-cli-bem.svg?branch=master)](https://travis-ci.org/nikityy/ember-cli-bem) [![Ember Observer Score](https://emberobserver.com/badges/ember-cli-bem.svg)](https://emberobserver.com/addons/ember-cli-bem)

Make your project BEM-flavoured. It incapsulates all [BEM](https://en.bem.info/methodology/) naming logic, so you don't have to care about it in your components. Simply define [blocks](https://en.bem.info/methodology/key-concepts/#block), [elements](https://en.bem.info/methodology/key-concepts/#element) and [modifiers](https://en.bem.info/methodology/key-concepts/#modifier) in your components and templates.

## Introduction

Why use another class names addon in your Ember project, if you're already
using something like [`ember-component-css`](https://github.com/ebryn/ember-component-css)? Because BEM-way
classes look ugly in these addons.

For example, compare how to create an element with [`ember-component-css`](https://github.com/ebryn/ember-component-css) and with `ember-cli-bem`:
```hbs
  {{!-- With ember-component-css --}}
  <div class="{{componentCssClassName}}__container"></div>

  {{!-- With ember-cli-bem --}}
  <div class="{{elem 'container'}}"></div>
```

Moreover, how to define an element with modifiers? If you want to get following class names `header__item header__item_disabled header__item_type_highlighted`, plus if `disabled` modifier
applies only if some condition matches, you have to write something like this:

```hbs
  {{!-- With ember-component-css --}}
  <div class="
    {{componentCssClassName}}__container
    {{if someCondition (concat componentCssClassName '__container_disabled')}}
    {{componentCssClassName}}__type_highlighted
  "></div>

  {{!-- With ember-cli-bem --}}
  <div class="{{elem 'container' disabled=someCondition highlighted=true}}"></div>
```

Or let's say you just want to define some modifier in your component:

```js
// With ember-component-css
import Ember from 'ember';
export default Ember.Component.extend({
  classNameBindings: ['typeMod'],
  type: 'highlighted',
  typeMod: Ember.computed('componentCssClassName', 'type', function() {
    const type = this.get('type');
    if (type) {
      return `${this.get('componentCssClassName')}_type_${type}`
    } else {
      return '';
    }
  }),
});

// With ember-cli-bem
import Ember from 'ember';
import BEM from 'ember-cli-bem/mixins/bem';

export default Ember.Component.extend({
  blockName: 'button',
  mods: ['type'],
  type: 'highlighted',
});
```

Once again, `ember-cli-bem` incapsulates all BEM naming logic, so you don't have to care
about it in your components.

## Defining Blocks and Elements

To define a [block](https://en.bem.info/methodology/key-concepts/#block) with `ember-cli-bem`, you should mix BEM mixin into your component. Blocks in `ember-cli-bem` requires only one field — `blockName`. If you left this property empty, component will throw an error. `blockName` just concatenates with `classNames` property.

If you want to define an [element](https://en.bem.info/methodology/key-concepts/#element) component (with `block__element` class name and custom logic), you just add
`elemName` property in component definition:

```js
import Ember from 'ember';
import BEM from 'ember-cli-bem/mixins/bem';

export default Ember.Component.extend(BEM, {
  blockName: 'button',
  elemName: 'icon'
});
```

This component will have a `button__icon` class.

## Defining Modifiers

When you want to define a [modifier](https://en.bem.info/methodology/key-concepts/#modifier) for your component, you should define `mods` array, which acts just like `classNameBindings`, but with some BEM attached:

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

This component will have a `button` class with following modifier classes:
* `button_disabled`
* `button_type_submit`
* `button_without-clear`

## Using elem helper

In templates of your BEM-components you could use `elem` helper to generate BEM class names:

```hbs
  <div class="{{elem 'icon'}}"></div>
  <div class="{{elem 'caption'}}">
    {{text}}
  </div>
```

Applying `button` example, these elements will have `button__icon` and `button__caption` classes accordingly.

Also `elem` helper supports modifiers:
```hbs
  <div class="{{elem 'container' collapsed=true type='float'}}">
    {{yield}}
  </div>
```

So `container` element will have following class names:
* `button__container`
* `button__container_collapsed`
* `button__container_type_float`

## Installation

```sh
ember install ember-cli-bem
```

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
