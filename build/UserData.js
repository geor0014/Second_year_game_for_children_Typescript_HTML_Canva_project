export default class UserData {
    name;
    score;
    level;
    constructor() {
        this.name = 'shirel';
        this.score = 0;
        this.level = 0;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getScore() {
        return this.score;
    }
    addScore(points) {
        this.score += points;
    }
    getLevel() {
        return this.level;
    }
    increaseLevel() {
        this.level += 1;
    }
}
//# sourceMappingURL=UserData.js.map