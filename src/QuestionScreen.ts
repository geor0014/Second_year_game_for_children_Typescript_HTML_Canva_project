import Scene from './Scene.js';
import Room from './Room.js';
import Question from './Question.js';
import InteractiveScreen from './InteractiveScreen.js';

export default class QuestionScreen extends InteractiveScreen {
  private questions: Question[];

  /**
   * Creates new Question Screen
   *
   * @param canvas canvas
   * @param previousScene previous scene to return to
   * @param questions an array of questions string
   */
  constructor(
    canvas: HTMLCanvasElement,
    previousScene: Room,
    questions: Question[],
  ) {
    super(canvas, previousScene, './assets/img/computerScreen.png');

    // sets the questions
    this.questions = questions;

    this.setTextToPresent('No answer recieved');
  }

  /**
   * Update method
   *
   * @param elapsed time elapsed
   * @returns previous Scene
   */
  public update(elapsed: number): Scene {
    // checks if player moved to next question
    this.moveBetweenInteractions();
    if (
      this.getNextText() &&
      this.getTCounter() < this.questions.length - 1 &&
      this.getFrameCounter() === 10
    ) {
      this.setTCounter( this.getTCounter() + 1);
      this.setTextToPresent('No answer recieved');
    }

    const userData = this.questions[this.getTCounter()].getUserData();
    // console.log(` frame counter ${this.frameCounter}`);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // console.log(this.qCounter);

    // if player wants to exit dialog
    if (this.processInput()) {
      return this.getPreviousScene();
    }

    // checks if answer was registered and player pressed ok with frame count
    let answerRecived = 0;
    if (this.getFrameCounter() % 10 === 0) {
      if (this.getOkPressed() === false) {
        answerRecived = this.reciveAnswer();
      }
      // console.log(`answer Recived ${answerRecived}`);
      if (answerRecived !== 0 && this.getOkPressed() === true) {
        // this.okPressed = false;
        this.setTextToPresent('your answer has been registered, please go to the next question >>');
      }

      // check if the answer chosen is correct
      if (answerRecived === this.questions[this.getTCounter()].getRPos() + 1) {
        // console.log('right answer selected');
        userData.setScore(userData.getScore() + 1);
      }
      // answerRecived = 0;
    }

    // resets the frame counter after it got to 10
    if (this.getFrameCounter() === 10) {
      this.setFrameCounter(0);
    }
    this.setFrameCounter(this.getFrameCounter() + 1);
    this.setOkPressed(false);
    return null;
  }

  /**
   * draws everything on screen
   */
  public render(): void {
    this.draw(this.ctx);
    // draws the questions counter and how many left
    if (this.getTCounter() < this.questions.length) {
      this.writeTextToCanvas(
        `Q num ${this.getTCounter() + 1} / ${this.questions.length}`,
        24,
        this.canvas.width / 5,
        230,
        'center',
        'Red'
      );

      let textToWrite: string = '';
      let j: number = 0;
      let textHPos: number = this.canvas.height / 3 + 20;
      const textWPos: number = this.canvas.width / 5 - 20;

      // draws the question itself
      for (let i = 0; i < 3; i += 1) {
        textToWrite = this.questions[this.getTCounter()].getText(i);
        // console.log(textToWrite);
        this.writeTextToCanvas(
          textToWrite,
          20,
          textWPos,
          textHPos,
          'left',
          'black'
        );
        textHPos += 50;
      }

      // draws possible answers
      for (let i = 0; i <= 2; i += 1) {
        if (this.questions[this.getTCounter()].getRPos() === i) {
          textToWrite = `${i + 1} ${this.questions[this.getTCounter()].getRAns()}`;
        } else if (j <= 1) {
          textToWrite = `${i + 1} ${this.questions[this.getTCounter()].getWAns(j)}`;
          j += 1;
        }
        this.writeTextToCanvas(
          textToWrite,
          20,
          this.canvas.width / 5,
          textHPos + 20,
          'left',
          'black'
        );
        textHPos += 50;
      }
    }
    // either shows for the next or how to quit
    if (this.getTCounter() === this.questions.length - 1) {
      this.writeTextToCanvas(
        'press ESC to leave',
        24,
        this.canvas.width / 2 + 100,
        600,
        'center',
        'Red'
      );
    } else {
      this.writeTextToCanvas(
        'Next Question right arrow ->',
        24,
        this.canvas.width / 2 + 100,
        600,
        'center',
        'Red'
      );
    }

    this.writeTextToCanvas(
      this.getTextToPresent(),
      24,
      this.canvas.width / 2,
      675,
      'center',
      'red'
    );
  }
}
