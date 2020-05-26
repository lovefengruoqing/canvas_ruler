# canvas_ruler

---

A very simpler canvas ruler, you can easily use with just one line.

## Example

```js
import { Ruler, version } from "../dist/ruler.module.js";

console.log(version);

window.ruler = new Ruler({
  canvasId: ".root",
  width: 1000,
  scale: 1,
}).render();
```