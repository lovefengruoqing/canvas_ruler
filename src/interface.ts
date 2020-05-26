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

  /**
   * the scale of the label
   */
  labelScale?: number;

  /** the start scale of the ruler */
  start?: number;

  /** the start of the ruler scale offset */
  beginOffset?: number;

  /** the end of the ruler scale offset */
  endOffset?: number;

  /** the sceen pixel value of the each interval when the scale is 1 */
  base?: number;


  /** the origin of the ruler offset */
  originOffset: number;
}

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift'
export type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> =
  Pick<TObj, Exclude<keyof TObj, ArrayLengthMutationKeys>>
  & {
    readonly length: L
    [ I : number ] : T
    [Symbol.iterator]: () => IterableIterator<T>
  }

/**
 * Two-dimensional coordinates
 */
export type Point = FixedLengthArray<number, 2>
