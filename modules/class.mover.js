///////////////////////////////////////////////////MOVER//////////////////////////////////////////////////////////////
class Mover extends Base {
    constructor(x, y) {
        super(x, y);
        this.energy = 40;
        this.multiply = 1;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }



    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }
    move() {

        var emptyCells = this.chooseCell(0);
        var emptyCells1 = this.chooseCell(1);
        var newCellM = random(emptyCells);
        var newCellN = random(emptyCells1);

        if (newCellM) {
            var newXgr = newCellM[0];
            var newYgr = newCellM[1];
            matrix[this.y][this.x] = 0;
            matrix[newYgr][newXgr] = 4;

            this.x = newXgr;
            this.y = newYgr;

        }
        else if (newCellN) {
            var newXgr = newCellN[0];
            var newYgr = newCellN[1];
            matrix[this.y][this.x] = 0;
            matrix[newYgr][newXgr] = 4;

            this.x = newXgr;
            this.y = newYgr;

        }
        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
    }
    moveEat() {
        var newCell3 = random(this.chooseCell(1));
        var newCell = random(this.chooseCell(2));
        var newCell2 = random(this.chooseCell(3));
        if (newCell) {
            for (var i in grassEaterArr) {
                if (newCell[0] == grassEaterArr[i].x && newCell[1] == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    console.log("Splice")
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            console.log("eat")
            console.log(this.energy)
            matrix[this.y][this.x] = 4;
            this.energy++;

            if (this.energy >= 12) {
                this.moveSpread();
                this.energy = 10;
            }

        }
        //  if (newCell2) {
        //     for (var i in wildArr) {
        //         if (newCell2[0] == wildArr[i].x && newCell2[1] == wildArr[i].y) {
        //             wildArr.splice(i, 1);
        //             break;
        //         }
        //     }
        //     matrix[this.y][this.x] = 0;
        //     this.x = newCell2[0];
        //     this.y = newCell2[1];
        //     matrix[this.y][this.x] = 4;
        //     this.energy++;

        //     if (this.energy >= 12) {
        //         this.moveSpread();
        //         this.energy = 4;
        //     }
        // }
        else if (newCell2) {
            for (var i in wildArr) {
                if (newCell2[0] == wildArr[i].x && newCell2[1] == wildArr[i].y) {
                    wildArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = newCell2[0];
            this.y = newCell2[1];
            matrix[this.y][this.x] = 4;
            this.energy++;

            if (this.energy >= 10) {
                this.moveSpread();
                this.energy = 8;
            }
        }
        else {
            this.move();
        }
    }


    moveSpread() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var moveree = new Mover(newX, newY, 4);
            moverArr.push(moveree);
        }
    }
    die() {
        for (var i in moverArr) {
            if (this.x == moverArr[i].x && this.y == moverArr[i].y) {
                moverArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }

    }
}