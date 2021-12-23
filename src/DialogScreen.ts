import KeyListener from './KeyListener.js';
import Scene from './Scene.js';

export default class DialogScreen extends Scene {
  private keyboard: KeyListener;

  private next: boolean;

  private previousScene: Scene;

  private dialogBubbles: string[];

  private countdown: number;

  // X position of the image of the room
  private xPos: number;

  // Y position of the image of the room
  private yPos: number;

  // Image of the room
  private img: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement, previousScene: Scene) {
    super(canvas);
    this.keyboard = new KeyListener();
    this.previousScene = previousScene;
    this.dialogBubbles = [];

    this.dialogBubbles.push('Hey Good Morning!');
    this.dialogBubbles.push('Welcome to school, please go to class!');
    this.countdown = this.dialogBubbles.length;

    this.img = Scene.loadNewImage('./assets/img/dialogscreen.jpg');
    this.xPos = 0;
    this.yPos = 0;
    console.log('hello');

    this.next = false;
  }

  public processInput(): boolean {
    if (this.keyboard.isKeyDown(KeyListener.KEY_SPACE)) {
      return true;
    }
    return false;
  }

  public update(elapsed: number): Scene {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.processInput()) {
      return this.previousScene;
    }
    return null;
  }

  /**
 * Draw the room
 *
 * @param ctx of the canvas
 */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.img,
      this.xPos,
      this.yPos,
    );
  }

  public render(): void {
    this.draw(this.ctx);
    this.writeTextToCanvas(this.dialogBubbles[0], 24, this.canvas.width / 2, this.canvas.height / 2, 'center', 'black');
   // if (this.processInput() && this.countdown > 0) {
    //  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //  this.draw(this.ctx);
     // this.writeTextToCanvas(this.dialogBubbles[1], 24, this.canvas.width / 2, this.canvas.height / 2, 'center', 'black');
    //  this.countdown -= 1;
   // }
  }
}