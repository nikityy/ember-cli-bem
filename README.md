# ember-cli-bem [![Build Status](https://travis-ci.org/nikityy/ember-cli-bem.svg?branch=master)](https://travis-ci.org/nikityy/ember-cli-bem) [![Ember Observer Score](https://emberobserver.com/badges/ember-cli-bem.svg)](https://emberobserver.com/addons/ember-cli-bem)

This addon helps you define class names in BEM way. Make your templates shorter with a help of [`elem`](https://github.com/nikityy/ember-cli-bem/blob/master/addon/helpers/elem.js) helper. Save your lifetime and use convenient modifier definitions in [BEM mixin](https://github.com/nikityy/ember-cli-bem/blob/master/addon/mixins/bem.js). ember-cli-bem encapsulates all BEM naming logic so you don't have to reinvent the wheel.

## Installation

The addon requires Ember version to be 2.4 or newer. It doesn't touch CSS bundling, so it may be used with any CSS preprocessor.

```sh
ember install ember-cli-bem
```

## Motivation

When you decide to use BEM in your project, your code often turns into something like this:

```hbs
  {{!-- Don't do this! --}}
  <div class="
    {{componentCssClassName}}__item
    {{if someCondition (concat componentCssClassName '__item_disabled')}}
    {{componentCssClassName}}__item_type_highlighted
  "></div>
```

Or like this:

```js
import Component from '@ember/component';
import { computed } from '@ember/object';

/**
 *  Please don't do like this
 */
export default Component.extend({
  classNameBindings: ['typeMod'],
  type: 'highlighted',
  typeMod: computed('componentCssClassName', 'type', function() {
    const type = this.get('type');
    if (type) {
      return `${this.get('componentCssClassName')}_type_${type}`
    } else {
      return '';
    }
  }),
});
```

This breaks DRY principle, you duplicate BEM naming logic everywhere in your code. Now with `ember-cli-bem` this problem is solved.


## Blocks

Block, according to the [official documentation](https://en.bem.info/methodology/key-concepts/#block), is a logically and functionally independent component. There is no other functionally independent component as button, so let's create it for example.

```js
// app/components/b-button/component.js
import Component from '@ember/component';
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  // Mandatory field
  blockName: 'button',

  // Mods has the same syntax as `classNameBindings`,
  // so you can use something like `someProperty:modifier-name`
  mods: ['disabled:is-disabled', 'size'],
});
```

In these lines a great power is being contained. Now look what happens when you use the button in your template:

```hbs
{{b-button disabled=true size='m'}}

{{!-- turns into --}}

<div class="button button_is-disabled button_size_m"></div>
```

All modifiers defined in `mods` array turned into separate classes. It's a great opportunity to split your styles into small and reusable chunks.


## Elements

Sometimes you need to define an inline entity, which won't be used outside a block. In BEM we call such entity an element. Let's define some header block first:

```js
// app/components/h-header/component.js
import Component from '@ember/component';
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  blockName: 'header',
});
```

Then add a template for it. Just look what happens then:

```hbs
  {{!-- app/components/h-header/template.hbs --}}
  {{#b-button
    size='m'
    className=(elem 'tab' active=true type='link')
  }}
    <div class={{elem 'caption'}}></div>
  {{/b-button}}

  {{!-- turns into --}}

  <div class="button button_size_m header__tab header__tab_active header__tab_type_link">
    <div class="header__caption"></div>
  </div>
```

Under the hood, `elem` helper obtained its wrapping component's `blockName` and composed an element name from it. Every named property passed to `elem` helper turned into a modifier.

While the `caption` element looks pretty straightforward, the `tab` isn't that simple. When we assign an element class name to the block, we call it a [mix](https://en.bem.info/methodology/key-concepts/#mix) in BEM. In our example, we used a mix to make the button look different exactly at one place — at the header.

## Configuring Addon

BEM-naming can be configured.

```js
// config/environment.js
ENV['ember-cli-bem'] = {
  elemDelimiter: '__',
  modDelimiter: '_',
  useKeyValuedMods: true,
}
```

### elemDelimiter
Default value: `'__'`

Defines how to separate block and element names.

### modDelimiter
Default value: `'_'`

It defines how to separate modifier name from the rest of the class name.

### useKeyValuedMods
Default value: `true`

If false, addon will not create key-value modifiers. Refer to the following
table to understand what class will be generated with this option enabled or disabled:

| Modifier Value | With `useKeyValuedMods`  | Without `useKeyValuedMods` |
|----------------|--------------------------|----------------------------|
| `true`         | `'block_disabled'`       | `'block_disabled'`         |
| `'force'`      | `'block_disabled_force'` | `'block_disabled'`         |
| `false`        | `''`                     | `''`                       |
| `''`           | `''`                     | `''`                       |

Note the case with `'force'` modifier value.
