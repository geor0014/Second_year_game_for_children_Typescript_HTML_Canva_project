import Door from './Door.js';
import Room from './Room.js';

import Scene from './Scene.js';
import Player from './Player.js';

import Computer from './Computer.js';

import Question from './Question.js';
import QuestionScreen from './QuestionScreen.js';

export default class ClassRoom3 extends Room {
  private previousScene: Scene;

  private computer: Computer;

  private questions: Question[];

  private pcInteract: boolean = false;

  /**
   * creats a new classroom
   *
   * @param canvas canvas element
   * @param previousScene a scene
   * @param player a player
   * @param state a way of hiding and unhidding the menu bar
   */
  public constructor(
    canvas: HTMLCanvasElement,
    previousScene: Scene,
    player: Player,
    state: boolean,
  ) {
    super(canvas, './assets/img/classroom.png', state);
    this.previousScene = previousScene;

    this.player = player;

    this.setXPos(0);
    this.setYPos(0);

    this.collectibles = [];
    this.npcs = [];
    this.doors = [];
    this.questions = [];
    this.computer = new Computer(266, 165.5);

    // creating collectibles in the classroom

    // creating the door for the classroom
    this.doors.push(new Door('./assets/img/door1.png', 985, 485));

    // setting player starter position and image in the classroom
    this.player.setXPos(990);
    this.player.setYPos(548);
    this.player.setImage('./assets/img/player-boy-standing.png');

    // creating questions for this classroom
    this.questions.push(
      new Question(
        this.player.getUserData(),
        'You see the following post:#“Hey look at Timmy`s head, man he looks horrible! Share this video or we will stop talking to you!” # What should you do? ',
        'Report it and help poor Timmy',
        'Share it I don’t want to be alone',
        'Ignore and let it happen ',
      ),
      new Question(
        this.player.getUserData(),
        'My parents and I have established rules as to what I can do on the Internet when Im home,# but Im at a friend`s house. #Should I go by my parents rules or do whatever my friend does?',
        'Go by your parents rules',
        'Do whatever your friend does ',
        'It doesn`t really matter',
      ),
    );
    console.log('CLASSROOM3');
  }

  /**
   * Game cycle, basically loop that keeps the game running. It contains all
   * the logic needed to draw the individual frames.
   *
   * @param elapsed a number
   * @returns a scene or null
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(elapsed: number): Scene {
    // calling general checkups from Room class
    const nextScene: Scene = this.generalInteraction();

    // INTERACTIONS
    if (this.player.isInteracting()) {
      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          console.log('interact with door');
          this.doorClose.play();
          console.log(this.previousScene);
          this.player.setXPos(334);
          this.player.setYPos(350);
          this.player.setImage('./assets/img/player-boy-standing.png');
          return this.previousScene;
        }
      }

      // WITH COMPUTER
      if (this.player.collidesWith(this.computer)) {
        if (this.pcInteract === false) {
          // present question screen
          this.pcInteract = true;
          return new QuestionScreen(this.canvas, this, this.questions);
        }
        console.log('cant use the pc at the moment');
      }
    }

    if (nextScene !== null) {
      return nextScene;
    }
    return null;
  }

  /**
   * draws items to screen
   */
  public render(): void {
    this.draw(this.ctx);
    this.computer.draw(this.ctx);
    super.render();
  }
}
