
import { configInterface, Point } from './interface';

import { version } from './utils';

/**
 * @class Ruler
 */
export default class Ruler {
  get canvas(): HTMLCanvasElement {
    return this.config.canvas;
  }

  /**
   * default config
   */
  config: configInterface = {
    width: 500,
    height: 24,
    color: '#000',
    background: '#fff',
    labelColor: '#red',
    labelFontSize: 10,
    labelFontFamily: 'Arial',
    lineWidth: 1,
    scale: 1,
    canvas: document.createElement('canvas'),
    start: 0,
    beginOffset: 0,
    endOffset: 0,
  };

  constructor(config?: configInterface) {
    Object.assign(this.config, config);
    this.checkCanvas();
    this.resize();
  }

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
    Object.assign(this.config, config);
    if (config.width || config.height) this.resize();
    return this.render();
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
      lineWidth, scale, color, beginOffset, endOffset,
    } = this.config;

    /** each space of scale on the screen */
    const es = 10 * scale;

    const pointsArr: Array<Array<Point>> = [];

    /** draw the baseLine of the ruler */
    pointsArr.push([
      [beginOffset, height - lineWidth / 2],
      [width - endOffset, height - lineWidth / 2],
    ]);

    const splitLine: Array<Array<Point>> = [];
    let cur = beginOffset;
    let count = 0;
    while (cur < width - endOffset) {
      const from: Point = [cur - lineWidth / 2, height];
      // eslint-disable-next-line no-nested-ternary
      const ty = count % 5 ? height / 2 : (count % 10 ? height / 3 : 0);
      const to: Point = [cur - lineWidth / 2, ty];
      splitLine.push([from, to]);

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
  renderLabel(text: string, x: number, y: number): Ruler {
    const { canvas, labelFontSize, labelFontFamily } = this.config;
    const ctx = canvas.getContext('2d');
    ctx.font = `${labelFontSize}px ${labelFontFamily}`;
    ctx.fillStyle = '#345';
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
