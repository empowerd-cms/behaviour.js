# behavior.js: Keep JavaScript Extendible for AI.
- Try in the browser or on your phone via https://empowerd.dev CMS!

`behavior.js` makes it easy to use custom vanilla JS and extend your functionality over time, so you can more easily use AI to keep generating new behaviors.

---

## Features

* Define reusable behaviors with `.define`
* Bind behaviors to selectors and events with `.add`
* Automatic initialization on DOMContentLoaded
* Works even with elements added dynamically later 
* Trigger behaviors programmatically using `.trigger` or `.triggerEl`
* Incrementally extendable and suitable for AI-assisted code generation

---

### Usage
```js
<textarea class="emp_editor">Hello</textarea>
<textarea class="emp_editor">World</textarea>

<script src="behavior.js"></script>
<script>
  // Define behaviors
  behavior.define('resizeTextarea', el => {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  });

  behavior.define('addHi', el => el.value += ' -- hi');

  behavior.define('alertClick', el => alert('Clicked!'));

  // Bind behaviors
  behavior.add('textarea::input,DOMContentLoaded', 'resizeTextarea'); // auto-resize
  behavior.add('.emp_editor::myCustomEvent', 'addHi');   // custom event
  behavior.add('textarea::click', 'alertClick');         // click alert

  // Auto-initialized on DOMContentLoaded
  // Auto-applied to dynamically added elements
</script>
```

## Progressive Examples

### 1. Start with a small core behavior

```html
<textarea class="emp_editor">Hello</textarea>

<script src="behavior.js"></script>
<script>
behavior.define('resizeTextarea', el => {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
});

behavior.add('textarea::input,DOMContentLoaded', 'resizeTextarea');
</script>
```

Effect: The textarea automatically resizes when typing.

---

### 2. Add a custom behavior

```js
behavior.define('addHi', el => el.value += ' -- hi');
behavior.add('.emp_editor::myCustomEvent', 'addHi');

// Trigger the custom event
behavior.trigger('.emp_editor', 'myCustomEvent');
```

Effect: The textarea content updates when the custom event is triggered.

---

### 3. Add interactivity

```js
behavior.define('alertClick', el => alert('Clicked!'));
behavior.add('textarea::click', 'alertClick');
```

Effect: Clicking the textarea shows an alert without modifying the element directly.

---

### 4. Support dynamically added elements

```js
const newTA = document.createElement('textarea');
newTA.className = 'emp_editor';
newTA.value = 'I am new!';
document.body.appendChild(newTA);
```

Effect: New elements automatically get all behaviors without extra code.

---

### 5. Multi-event binding

```js
behavior.add('textarea::focus,blur,input', el => {
  console.log('Event triggered on:', el);
});
```

Effect: A single behavior can handle multiple events.

---

### 6. Build progressively and extend

```js
// Core behavior
behavior.define('resizeTextarea', el => { /* ... */ });

// Extend with modular behaviors
behavior.define('addTimestamp', el => el.value += ` [${new Date().toLocaleTimeString()}]`);
behavior.define('highlightOnFocus', el => el.style.backgroundColor = 'lightyellow');

// Bind behaviors to events
behavior.add('textarea::DOMContentLoaded,input', 'resizeTextarea');
behavior.add('textarea::myCustomEvent', 'addTimestamp');
behavior.add('textarea::focus', 'highlightOnFocus');
```

Effect: Behaviors remain small, modular, and composable. This structure makes it easy to copy the core setup to a new page and then add more behaviors over time.

---

### 7. AI-assisted extensions

* The library separates **behavior definitions** and **bindings**, so new functionality can be added incrementally.
* You can ask AI to generate new behaviors such as:

  * Trim whitespace on blur
  * Highlight empty textareas on submit
  * Animate borders when content changes

This allows you to extend the system without touching existing code.

---

## Trigger custom events

```js
behavior.trigger('.emp_editor', 'myCustomEvent', { info: 'demo' });

const ta = document.querySelector('.emp_editor');
behavior.triggerEl(ta, 'myCustomEvent');
```

Effect: You can programmatically trigger behaviors on all or specific elements.

---

`behavior.js` enables modular, reusable behaviors, automatic initialization, dynamic support, and easy incremental extension. It is ideal for progressively enhancing web interfaces and for leveraging AI to generate new behaviors quickly.

