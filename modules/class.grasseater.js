////////////////////////////////////////////////GRASS Eater///////////////////////////////////////////
class GrassEater extends Base {
    constructor(x, y) {
        super(x, y);
        this.energy = 8;
        this.multiply = 16;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    move() {

        var emptyCells = this.chooseCell(0);
        var newCellM = random(emptyCells);

        if (newCellM) {
            var newXgr = newCellM[0];
            var newYgr = newCellM[1];
            matrix[this.y][this.x] = 0;
            matrix[newYgr][newXgr] = 2;

            this.x = newXgr;
            this.y = newYgr;

        }
        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
    }
    eat() {
        var newCell = random(this.chooseCell(1));
        if (newCell) {
            for (var i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 2;
            this.energy++;

            if (this.energy >= 10) {
                this.geSpread();
                this.energy = 6;
            }
        }
        else {
            this.move();
        }
    }
    geSpread() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var GrassE = new GrassEater(newX, newY, 2);
            grassEaterArr.push(GrassE);
        }
    }
    die() {
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
}