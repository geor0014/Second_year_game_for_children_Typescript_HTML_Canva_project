import KeyListener from './KeyListener.js';
import Screen from './Screen.js';
export default class QuestionScreen extends Screen {
    keyboard;
    previousScene;
    questions;
    nextQ;
    qCounter;
    frameCounter = 0;
    constructor(canvas, previousScene, questions) {
        super(canvas, './assets/img/computer-screen.png');
        this.keyboard = new KeyListener();
        this.previousScene = previousScene;
        this.questions = questions;
        this.nextQ = false;
        this.qCounter = 0;
        this.setXPos(this.canvas.width / 5);
        this.setYPos(this.canvas.height / 10);
    }
    processInput() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_ESC)) {
            return true;
        }
        return false;
    }
    moveBetweenQuestions() {
        if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)) {
            console.log('right pressed');
            this.nextQ = true;
        }
        else {
            this.nextQ = false;
        }
    }
    update(elapsed) {
        console.log(` frame counter ${this.frameCounter}`);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log(this.qCounter);
        if (this.processInput()) {
            return this.previousScene;
        }
        this.moveBetweenQuestions();
        if (this.nextQ && this.qCounter < this.questions.length - 1 && this.frameCounter === 10) {
            this.qCounter += 1;
        }
        if (this.frameCounter === 10) {
            this.frameCounter = 0;
        }
        this.frameCounter += 1;
        return null;
    }
    draw(ctx) {
        ctx.drawImage(this.getImage(), this.getXPos(), this.getYPos());
    }
    render() {
        this.draw(this.ctx);
        if (this.qCounter < this.questions.length) {
            let textToWrite = '';
            let j = 0;
            let textHPos = this.canvas.height / 3;
            this.writeTextToCanvas(this.questions[this.qCounter].getQTxt(), 30, this.canvas.width / 3, textHPos, 'center', 'black');
            for (let i = 0; i <= 2; i += 1) {
                textHPos += 50;
                if (this.questions[this.qCounter].getRPos() === i) {
                    textToWrite = `${i + 1} ${this.questions[this.qCounter].getRAns()}`;
                }
                else if (j <= 1) {
                    textToWrite = `${i + 1} ${this.questions[this.qCounter].getWAns(j)}`;
                    j += 1;
                }
                this.writeTextToCanvas(textToWrite, 30, this.canvas.width / 3, textHPos, 'center', 'black');
            }
        }
    }
}
//# sourceMappingURL=QuestionScreen.js.map