# html-vision

A set of utility functions to query html document and more.

## Usage

### cquerySelector / cquerySelectorAll

Similar to `document.querySelector` but will pass through shadow hosts (custom elements) too,

```
<body>
	<li>zero</li>

	<my-custom-element>
		# shadow-root
			<li>one</li>
			<li>two</li>
			<li>three</li>
	</my-custom-element>
</body>
```

```ts
import {cquerySelector, cquerySelectorAll} from 'html-vision';

const lis = cquerySelectorAll('li');
lis.length; // output: 4
```

### getElement

Similar to `document.querySelector` but if the element doesn't exist yet, it will poll until it finds it.

```js
try {
	const element = await getElement('#important-element', {
		timeoutMs: 2000, // after 2s of not finding, reject.
		pollMs: 500, // checks every 500ms (default)
	});
	// element is now available, do something
} catch {
	// Error: The element couldn't be found after 2s of searching
}
```

### scrollIfNeeded

Scroll an element in the center of the screen if not in the view yet.

## Installation

```bash
npm i -D html-vision
```
