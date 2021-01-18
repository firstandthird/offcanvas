<h1 align="center">offcanvas</h1>

<p align="center">
  <a href="https://github.com/firstandthird/offcanvas/actions">
    <img src="https://img.shields.io/github/workflow/status/firstandthird/offcanvas/Lint/master?label=Lint&style=for-the-badge" alt="Lint Status"/>
  </a>
  <img src="https://img.shields.io/npm/v/offcanvas.svg?label=npm&style=for-the-badge" alt="NPM" />
</p>

Javascript library for off canvas (mobile style) menus.

## Installation

```sh
npm install offcanvas
```

_or_

```sh
yarn add offcanvas
```

## Usage

Use the [CSS](example/offcanvas.css) that's shown on the example and customise to your needs. Keep `width` and `translate` similar.

### HTML

```html
<body>
 <div class="offcanvas-wrapper">
    <div class="offcanvas left" data-offcanvas="navleft">
      <p>this is the left nav</p>
    </div>
    <div class="offcanvas-content" data-offcanvas-content>
      <button type="button" data-offcanvas-trigger="navleft">Show left nav</button>
      <p>Diam nascetur a natoque gravida odio scelerisque vitae ante ligula est cum convallis ullamcorper suspendisse magnis rutrum dignissim. Lorem a amet faucibus suscipit suspendisse ultrices adipiscing vestibulum morbi nibh habitasse gravida orci condimentum magnis eleifend condimentum leo a quisque condimentum phasellus eros accumsan. Vestibulum ut vestibulum a tempor adipiscing nec fringilla semper purus nisl rhoncus a bibendum a at condimentum. Gravida facilisi cras vivamus et class habitant lacinia ridiculus laoreet parturient sapien pulvinar dui parturient sociis dis augue litora himenaeos ante. Ante nunc a augue nam ullamcorper nulla tortor et rhoncus non scelerisque adipiscing himenaeos a ullamcorper parturient vivamus donec vestibulum vel potenti ultrices diam leo ac a dignissim. A pharetra sagittis vestibulum a condimentum aliquam tristique tincidunt ad lacinia a quisque non a ante.</p>
    </div>
  </div>
</body>
```

If you are using a fixed element to stick a navigation to the top, you can add the attribute `data-offcanvas-fixed` so once the offcanvas is shown it doesn't go to the top due to transform causing fixed elements to be absolute. See the [example](example/index.html) for more information.

### CSS

```css
@import 'offcanvas/offcanvas.css';
```
### JavaScript

```js
import 'offcanvas';
```

---

<a href="https://firstandthird.com"><img src="https://firstandthird.com/_static/ui/images/safari-pinned-tab-62813db097.svg" height="32" width="32" align="right"></a>

_A [First + Third](https://firstandthird.com) Project_
