////////////////////////////////////////////////GRASS///////////////////////////////////////////
var Base = require("./Base");
var random = require("./random");
module.exports = class Grass extends Base {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 20;
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 3) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 1;
        }


    }

}