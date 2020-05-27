# canvas_ruler

A very simpler canvas ruler, you can easily use with just one line.

[![npm](https://img.shields.io/npm/v/canvas_ruler)](https://www.npmjs.org/package/canvas_ruler)
[![install size](https://packagephobia.now.sh/badge?p=canvas_ruler)](https://packagephobia.now.sh/result?p=canvas_ruler)
![npm bundle size](https://img.shields.io/bundlephobia/min/canvas_ruler)
![GitHub top language](https://img.shields.io/github/languages/top/lovefengruoqing/canvas_ruler)
![GitHub repo size](https://img.shields.io/github/repo-size/lovefengruoqing/canvas_ruler)
![GitHub last commit](https://img.shields.io/github/last-commit/lovefengruoqing/canvas_ruler)
![NPM](https://img.shields.io/npm/l/canvas_ruler)

## Installing

Using npm:

```bash
$ npm install canvas_ruler
```

Using bower:

```bash
$ bower install canvas_ruler
```

Using yarn:

```bash
$ yarn add canvas_ruler
```

Using jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/canvas_ruler"></script>
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/canvas_ruler"></script>
```

## Example

### module way

```js
import { Ruler, version } from "../dist/ruler.module.js";

console.log(version);

window.ruler = new Ruler({
  canvasId: ".root",
  width: 1000,
  scale: 1,
}).render();
```

### UNPKG way

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/canvas_ruler"></script>
  </head>
  <body>
    <canvas class="root"></canvas>
    <script>
      console.log(canvasRuler.version);

      let ruler = new canvasRuler.Ruler({
        canvasId: ".root",
        width: 1000,
        scale: 1,
      }).render();
    </script>
  </body>
</html>
```