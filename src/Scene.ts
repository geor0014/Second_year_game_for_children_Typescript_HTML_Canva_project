import UserData from './UserData.js';

/**
 * A superclass for objects that must be able to be animated by a `GameLoop`.
 *
 * Implementing classes must override the three methods `processInput()`,
 * `update(elapsed)` and `render()`.
 *
 * @see GameLoop
 * @author BugSlayer
 */
export default abstract class Scene {
  protected canvas: HTMLCanvasElement;

  protected ctx: CanvasRenderingContext2D;

  protected userData: UserData;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    console.log('creating new user date');
    this.userData = new UserData();
  }

  /**
   * Handles any user input that has happened since the last call
   */
  public abstract processInput(): void;

  /**
   * Advances the game simulation one step. It may run AI and physics (usually
   * in that order). The return value of this method determines what the `GameLoop`
   * that is animating this object will do next. If `null` is returned, the
   * GameLoop will render this scene and proceeds to the next animation frame.
   * If this methods returns a `Scene` (subclass) object, it will NOT render this
   * scene but will start considering that object as the current scene to animate.
   * In other words, by returning a Scene object, you can set the next scene to
   * animate.
   *
   * @param elapsed the time in ms that has been elapsed since the previous
   *   call
   * @returns a new `Scene` object if the game should start animating that scene
   *   on the next animation frame. If the game should just continue with the
   *   current scene, just return `null`
   */
  public abstract update(elapsed: number): Scene;

  /**
   * Draw the game so the player can see what happened
   */
  public abstract render(): void;

  /**
   * Writes text to the canvas
   *
   * @param text - Text to write
   * @param fontSize - Font size in pixels
   * @param xCoordinate - Horizontal coordinate in pixels
   * @param yCoordinate - Vertical coordinate in pixels
   * @param alignment - Where to align the text
   * @param color - The color of the text
   */
  protected writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = 'center',
    color: string = 'white'
  ): void {
    this.ctx.font = `${fontSize}px 'VT323', monospace`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   * Method to load an image
   *
   * @param source the source
   * @returns HTMLImageElement - returns an image
   */
  protected static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }
}
