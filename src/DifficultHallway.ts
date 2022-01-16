import Room from './Room.js';
import Scene from './Scene.js';
import Player from './Player.js';
import Door from './Door.js';
import ClassRoom4 from './Classroom4.js';
import ClassRoom5 from './Classroom5.js';
import ClassRoom6 from './Classroom6.js';
import Dialog from './Dialog.js';
import Npc from './Npc.js';

export default class DifficultHallway extends Room {
  private mainHallway: Room;

  private room4Interact: boolean;

  private room5Interact: boolean;

  private room6Interact: boolean;

  private class4: ClassRoom4;

  private class5: ClassRoom5;

  private class6: ClassRoom6;

  /**
   * Initialises every attribute
   *
   * @param canvas of the game
   * @param mainHallway of the game
   * @param player of the game
   */
  public constructor(
    canvas: HTMLCanvasElement,
    mainHallway: Room,
    player: Player
  ) {
    super(canvas, './assets/img/difficultHallway.png');

    console.log('creating difficult hallway');

    // sets the classrooms to not interacted
    this.room4Interact = false;
    this.room5Interact = false;
    this.room6Interact = false;

    // sets previous scene
    this.mainHallway = mainHallway;

    // sets the player
    this.player = player;

    // resets the items in the room
    this.collectibles = [];
    this.npcs = [];
    this.doors = [];

    // sets the background image position
    this.setXPos(0);
    this.setYPos(0);

    // creates npcs with their dialogs for this room
    this.npcs.push(
      new Npc('./assets/img/student-grey-hair-back-faced.png', 766, 430, [
        new Dialog('I heard there is this weird dude in the bathroom#'),
        new Dialog('I am too scared to go there#'),
      ]),
      new Npc('./assets/img/student-blue-hair-faced.png', 432, 322, [
        new Dialog('(3450987 X 19023) + 4.... this is hard!#'),
        new Dialog('Sorry I am busy..#'),
      ]),
    );

    // PLAYER POSITTION UPON ENTERING
    this.player.setXPos(13);
    this.player.setYPos(335);

    // creats the doors in the hallway
    this.doors.push(new Door('./assets/img/door1.png', 343, 267));
    this.doors.push(new Door('./assets/img/door1.png', 493, 267));
    this.doors.push(new Door('./assets/img/door1.png', 688, 267));
  }

  /**
   * Methos to detect the input of the player
   */
  public processInput(): void {
    // WALL COLLISION DETECTION
    if (this.player.getYPos() > 292 && this.player.getYPos() < 425.5) {
      this.player.movePlayer(this.canvas);
      if (this.player.getYPos() <= 292) {
        this.player.setYPos(294);
      }
      if (this.player.getYPos() >= 425.5) {
        this.player.setYPos(423);
      }
    }
  }

  /**
   * Updates the hallway
   *
   * @param elapsed time in ms of the last frame
   * @returns null or a new room
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(elapsed: number): Scene {
    // calling general checkups from Room class
    const nextScene: Scene = this.generalInteraction();

    // LEAVES DIFFICULT HALLWAY
    if (this.player.getXPos() <= 12 && this.player.getYPos() >= 334.5) {
      this.player.setXPos(1060);
      this.player.setYPos(443.5);
      this.player.setImage('./assets/img/player-boy-left.png');
      return this.mainHallway;
    }

    // INTERACTIONS
    if (this.player.isInteracting()) {
      // WITH DOORS
      for (let i = 0; i < this.doors.length; i += 1) {
        if (this.player.collidesWith(this.doors[i])) {
          console.log('interact with door');
          // setting player starter position and image in the classrooms
          this.player.setXPos(990);
          this.player.setYPos(548);
          this.player.setImage('./assets/img/player-boy-standing.png');
          this.doorOpen.play();
          // checking which door
          if (i === 0) {
            // if this classroom was previously entered to
            if (this.room4Interact === false) {
              this.class4 = new ClassRoom4(
                this.canvas,
                this,
                this.player,
                this.isMenuShowing
              );
              this.room4Interact = true;
            }
            return this.class4;
          }
          // checking which door
          if (i === 1) {
            // if this classroom was previously entered to
            if (this.room5Interact === false) {
              this.class5 = new ClassRoom5(
                this.canvas,
                this,
                this.player,
                this.isMenuShowing
              );
              this.room5Interact = true;
            }

            return this.class5;
          }
          // checking which door
          if (i === 2) {
            // if this classroom was previously entered to
            if (this.room6Interact === false) {
              this.class6 = new ClassRoom6(
                this.canvas,
                this,
                this.player,
                this.isMenuShowing
              );
              this.room6Interact = true;
            }
            return this.class6;
          }
        }
      }
    }
    // according to the general checks in room
    if (nextScene !== null) {
      return nextScene;
    }
    return null;
  }

  /**
   * Renders the gdifficult hallway
   */
  public render(): void {
    this.draw(this.ctx);
    super.render();
  }
  /*
  public drawRectengles(): void {
    this.ctx.beginPath();
    this.ctx.rect(0, 433, 50, 50);
    this.ctx.stroke();
  }
  */
}
