/**
 * the config interface
 */
export interface configInterface {
  /**
   * canvas element
   */
  canvas?: HTMLCanvasElement;
  /**
   * canvas id
   */
  canvasId?: string;
  /**
   * canvas id
   */
  canvasClass?: string;

  /**
   * canvas width
   */
  width?: number;
  /**
   * canvas height
   */
  height?: number;
  /**
   * canvas color
   */
  color?: string;
  /**
   * canvas background
   */
  background?: string;

  // label config
  /**
   * label color
   */
  labelColor?: string;
  /**
   * label font size
   */
  labelFontSize?: number;
  /**
   * label font family
   */
  labelFontFamily?: string;

  /**
   * the split line width
   */
  lineWidth?: number;
  /**
   * the scale of the ruler
   */
  scale?: number;
}
