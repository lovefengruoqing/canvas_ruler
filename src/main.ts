
import { configInterface } from './interface';

/**
 * @class Ruler
 */
export default class Ruler {
  get canvas() :HTMLCanvasElement {
    return this.config.canvas;
  }

  /**
   * default config
   */
  public config: configInterface = {
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
      lineWidth, scale, color,
    } = this.config;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(20, height - lineWidth / 2);
    ctx.lineTo(width, height - lineWidth / 2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();


    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;

    ctx.moveTo(width / 2, height - lineWidth / 2);
    ctx.lineTo(width / 2, 0);

    const Offset = 8;
    this.renderLabel('0', width / 2 + Offset / 2, 0 + Offset);

    const es = 10 * scale;
    {
      let x = 0;
      let i = 0;
      while (x <= width / 2) {
        i += 1;
        x += es;
        ctx.moveTo(width / 2 + x, height - lineWidth / 2);
        ctx.lineTo(width / 2 + x, i % 5 === 0 ? 0 : height / 2);

        const num = Math.ceil(50 / es);
        if (i % 5 === 0 || num <= 2) {
          ctx.fillText(String(i * 10), width / 2 + x + Offset / 2 / num, 0 + Offset);
        }

        if (x <= width / 2 - 20) {
          ctx.moveTo(width / 2 - x, height - lineWidth / 2);
          ctx.lineTo(width / 2 - x, i % 5 === 0 ? 0 : height / 2);
          if (i % 5 === 0 || num <= 2) {
            ctx.fillText(String(-i * 10), width / 2 - x + Offset / 2 / num, 0 + Offset);
          }
        }
      }
    }
    ctx.stroke();
    ctx.closePath();
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
  renderLabel(text: string, x:number, y:number): Ruler {
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
}
