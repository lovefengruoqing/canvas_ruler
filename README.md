# canvas_ruler

A very simpler canvas ruler, you can easily use with just one line.

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