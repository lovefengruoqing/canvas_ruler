
import { configInterface, Point } from './interface';

import { version } from './utils';

/**
 * @class Ruler
 */
export default class Ruler {
  get canvas(): HTMLCanvasElement {
    return this.config.canvas;
  }

  animateTimer: number

  /**
   * default config
   */
  config: configInterface = {
    width: 500,
    height: 24,
    color: '#000',
    background: '#fff',
    labelColor: '#345',
    labelFontSize: 10,
    labelFontFamily: 'Arial',
    lineWidth: 1,
    scale: 1,
    labelScale: 10,
    canvas: document.createElement('canvas'),
    start: 0,
    beginOffset: 0,
    endOffset: 0,
    base: 10,
    originOffset: 10,
  };

  constructor(config?: configInterface) {
    Object.assign(this.config, config);
    this.checkCanvas();
    this.resize();
  }

  /**
   * resize the base canvas
   */
  resize(): Ruler {
    const { config } = this;
    const { canvas, width, height } = config;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    return this;
  }

  /** render the ruler */
  render(): Ruler {
    return this.beforeRender().rendering().afterRender();
  }

  /** update the config of the ruler and refresh it */
  update(config: configInterface): Ruler {
    const { scale } = this.config;
    Object.assign(this.config, config);
    if (config.width || config.height) this.resize();
    if (config.scale) {
      this.addAnimate({ type: 'scale', from: scale, to: config.scale });
    } else {
      this.render();
    }
    return this;
  }

  addAnimate({ type, from, to }:{type:string, from: number, to: number}): Ruler {
    if (type === 'scale') {
      let cur = from;
      const sign = Math.sign(to - from);

      let start: number | null;
      // let elapsed:number;

      const doAnimate = (timestamp:number) => {
        if (!start) start = timestamp;
        // elapsed = timestamp - start;
        // console.log(elapsed);

        cur += sign * 0.02;
        Object.assign(this.config, { scale: cur });
        this.render();

        if ((to - cur) * sign >= 0) {
          this.animateTimer = requestAnimationFrame(doAnimate);
        }
      };


      this.animateTimer = requestAnimationFrame(doAnimate);
    }

    return this;
  }

  /** befroe render the ruler */
  beforeRender(): Ruler {
    const ctx = this.canvas.getContext('2d');

    const { width, height } = this.canvas;
    ctx.clearRect(0, 0, width, height);

    const { background } = this.config;
    ctx.save();
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    return this;
  }

  /**
   * do rendering
   */
  rendering(): Ruler {
    const ctx = this.canvas.getContext('2d');
    const { width, height } = this.canvas;
    const {
      lineWidth, scale, color, beginOffset, endOffset, base, labelScale, originOffset,
    } = this.config;

    /** each space of scale on the screen */
    const es = base * scale;

    const pointsArr: Array<Array<Point>> = [];
    const LabelArr = [];

    /** draw the baseLine of the ruler */
    pointsArr.push([
      [beginOffset, height - lineWidth / 2],
      [width - endOffset, height - lineWidth / 2],
    ]);

    const splitLine: Array<Array<Point>> = [];
    const ZeroPos = beginOffset + originOffset * labelScale;
    let cur = ZeroPos;
    let count = 0;
    while (cur < width - endOffset) {
      // if ((es <= 5 && count % 5 === 0) || es > 5) {
      const from: Point = [cur - lineWidth / 2, height];
      // eslint-disable-next-line no-nested-ternary
      const ty = count % 5 ? height / 2 : (count % 10 ? height / 3 : 0);
      const to: Point = [cur - lineWidth / 2, ty];
      splitLine.push([from, to]);

      if (count % 5 === 0) {
        LabelArr.push({
          point: to,
          text: String((count * base) / labelScale),
          type: count % 2,
        });
        // }
      }

      cur += es;
      count += 1;
    }
    pointsArr.push(...splitLine);

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    pointsArr.forEach((oneItem) => {
      oneItem.forEach((p, index: number) => {
        const [x, y] = p;

        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
    });
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    ctx.save();
    LabelArr.forEach(({ point, text, type }) => {
      this.renderLabel(text, point[0], point[1], type);
    });
    ctx.restore();

    return this;
  }

  /**
   * after rendered
   */
  afterRender(): Ruler {
    return this;
  }

  /**
   * render the label of the ruler
   */
  renderLabel(text: string, x: number, y: number, type: number): Ruler {
    const { canvas, labelFontFamily, labelColor } = this.config;
    let { labelFontSize } = this.config;
    const ctx = canvas.getContext('2d');
    let textBaseline:CanvasTextBaseline;
    let textAlign:CanvasTextAlign;
    switch (type) {
      case 0:
        textBaseline = 'top';
        textAlign = 'left';
        x += 1;
        break;
      case 1:
        textBaseline = 'middle';
        textAlign = 'left';
        x += 1;
        y -= 1;
        labelFontSize -= 1;
        break;

      default:
        break;
    }
    ctx.textBaseline = textBaseline;
    ctx.textAlign = textAlign;
    ctx.font = `${labelFontSize}px ${labelFontFamily}`;
    ctx.fillStyle = labelColor;
    ctx.fillText(text, x, y);
    return this;
  }

  /**
   * check the canvas of config
   */
  checkCanvas(): Ruler {
    const { canvasId, canvasClass } = this.config;
    if (canvasClass) {
      this.config.canvas = document.querySelector(canvasId);
    }
    if (canvasId) {
      this.config.canvas = document.querySelector(canvasId);
    }

    return this;
  }

  /**
   * destory the instance
   */
  dispose(): Ruler {
    // this.config.canvas = null;
    this.config = null;

    return this;
  }

  /**
   * show ruler
   */
  show(): Ruler {
    this.canvas.style.display = 'block';
    return this;
  }

  /**
   * hidden ruler
   */
  hidden(): Ruler {
    this.canvas.style.display = 'none';
    return this;
  }

  /**
   * get the version of this Ruler
   */
  public getVersion(): string {
    return version;
  }
}
