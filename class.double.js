////////////////////////////////////////Double Move///////////////////////////////////////////////////////
class Double extends Base {
    constructor(x, y) {
        super(x, y);
        this.energy = 6;
        this.multiply = 1;
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
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
            matrix[newYgr][newXgr] = 5;

            this.x = newXgr;
            this.y = newYgr;

        }
        else if (newCellN) {
            var newXgr = newCellN[0];
            var newYgr = newCellN[1];
            matrix[this.y][this.x] = 0;
            matrix[newYgr][newXgr] = 5;

            this.x = newXgr;
            this.y = newYgr;

        }
        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
    }
    doubEat() {
        var newCell3 = random(this.chooseCell(4));
        var newCell = random(this.chooseCell(2));
        var newCell2 = random(this.chooseCell(3));

        if (newCell3) {
            for (var i in moverArr) {
                if (newCell3[0] == moverArr[i].x && newCell3[1] == moverArr[i].y) {
                    moverArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = newCell3[0];
            this.y = newCell3[1];
            matrix[this.y][this.x] = 5;
            this.energy++;

            if (this.energy >= 12) {
                this.dSpread();
                this.energy = 6;
            }
        }
        // if (newCell) {
        //     for (var i in grassEaterArr) {
        //         if (newCell[0] == grassEaterArr[i].x && newCell[1] == grassEaterArr[i].y) {
        //             grassEaterArr.splice(i, 1);
        //             break;
        //         }
        //     }
        //     matrix[this.y][this.x] = 0;
        //     this.x = newCell[0];
        //     this.y = newCell[1];
        //     matrix[this.y][this.x] = 5;
        //     this.energy++;

        //     if (this.energy >= 12) {
        //         this.dSpread();
        //         this.energy = 6;
        //     }
        // }
        // else if (newCell2) {
        //     for (var i in wildArr) {
        //         if (newCell2[0] == wildArr[i].x && newCell2[1] == wildArr[i].y) {
        //             wildArr.splice(i, 1);
        //             break;
        //         }
        //     }
        //     matrix[this.y][this.x] = 0;
        //     this.x = newCell2[0];
        //     this.y = newCell2[1];
        //     matrix[this.y][this.x] = 5;
        //     this.energy++;

        //     if (this.energy >= 12) {
        //         this.dSpread();
        //         this.energy = 6;
        //     }
        // }

        else {
            this.move();
        }
    }


    dSpread() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var doublee = new Double(newX, newY, 5);
            doubleArr.push(doublee);
        }
    }
    die() {
        for (var i in doubleArr) {
            if (this.x == doubleArr[i].x && this.y == doubleArr[i].y) {
                doubleArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }

    }
}