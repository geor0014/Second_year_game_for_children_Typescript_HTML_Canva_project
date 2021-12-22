import Scene from './Scene.js';
import Candy from './Candy.js';
export default class Room extends Scene {
    xPos;
    yPos;
    img;
    imageWidth;
    imageHeight;
    player;
    candies = [];
    constructor(canvas, imgSrc, player) {
        super(canvas);
        this.player = player;
        this.img = new Image();
        this.img.src = imgSrc;
        this.candies.push(new Candy(this.canvas.width / 2, this.canvas.height / 2));
        console.log(this.img.width);
    }
    processInput() {
        this.player.movePlayer(this.canvas);
    }
    update(elapsed) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if ((this.player.getXPos() >= this.xPos && this.player.getXPos() <= this.xPos + this.imageWidth)
            && (this.player.getYPos() >= this.yPos && this.player.getYPos() <= this.yPos + this.imageHeight)) {
            this.processInput();
        }
        return null;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.xPos, this.yPos, this.imageWidth, this.imageHeight);
    }
    render() {
        this.draw(this.ctx);
        this.candies[0].draw(this.ctx);
        this.player.draw(this.ctx);
    }
}
//# sourceMappingURL=Room.js.map