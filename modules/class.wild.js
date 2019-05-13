//////////////////////////////////////////////WILD//////////////////////////////////////////////
class Wild extends Base {
    constructor(x, y) {
        super(x, y);
        this.energy = 35;
        this.multiply = 18;
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
        var emptyCells1 = this.chooseCell(1);
        var newCellM = random(emptyCells);
        var newCellN = random(emptyCells1);

        if (newCellM) {
            var newXgr = newCellM[0];
            var newYgr = newCellM[1];
            matrix[this.y][this.x] = 0;
            matrix[newYgr][newXgr] = 3;

            this.x = newXgr;
            this.y = newYgr;

        }
        else if (newCellN) {
            var newXgr = newCellN[0];
            var newYgr = newCellN[1];
            matrix[this.y][this.x] = 0;
            matrix[newYgr][newXgr] = 3;

            this.x = newXgr;
            this.y = newYgr;

        }
        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
    }
    move1() {

        var emptyCells = this.chooseCell(0);
        var newCellM = random(emptyCells);
        if (newCellM) {
            var newXgr = newCellM[0];
            var newYgr = newCellM[1];
            matrix[this.y][this.x] = 0;
            matrix[newYgr][newXgr] = 3;

            this.x = newXgr;
            this.y = newYgr;
        }
        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
    }
    EatG() {
        var newCell = random(this.chooseCell(2));
        var newCell1 = random(this.chooseCell(6));
        if (newCell) {
            for (var i in grassEaterArr) {
                if (newCell[0] == grassEaterArr[i].x && newCell[1] == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 3;
            this.energy++;

            if (this.energy >= 16) {
                this.WiSpread();
                this.energy = 8;
            }
        }
        else if (newCell1) {
            for (var i in chameleonArr) {
                if (newCell1[0] == chameleonArr[i].x && newCell1[1] == chameleonArr[i].y) {
                    chameleonArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = newCell1[0];
            this.y = newCell1[1];
            matrix[this.y][this.x] = 3;
            this.energy++;

            if (this.energy >= 38) {
                this.WiSpread();
                this.energy = 35;
            }
        }
        else {
            this.move();
        }
    }
    EatH() {
        var newCell = random(this.chooseCell(1));
        var newCell1 = random(this.chooseCell(6));
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
            matrix[this.y][this.x] = 3;
            this.energy++;

            if (this.energy >= 20) {
                this.WiSpread();
                this.energy = 16;
            }
        }
        else {
            this.move1();
        }
    }
    WiSpread() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var wildee = new Wild(newX, newY, 3);
            wildArr.push(wildee);
        }
    }
    die() {
        for (var i in wildArr) {
            if (this.x == wildArr[i].x && this.y == wildArr[i].y) {
                wildArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }

    }
}
/*
class Wild {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 14;
        this.multiply = 18;
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
            matrix[newYgr][newXgr] = 3;

            this.x = newXgr;
            this.y = newYgr;

        }
        else if (newCellN) {
            var newXgr = newCellN[0];
            var newYgr = newCellN[1];
            matrix[this.y][this.x] = 0;
            matrix[newYgr][newXgr] = 3;

            this.x = newXgr;
            this.y = newYgr;

        }
        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
    }
    EatG() {
        var newCell = random(this.chooseCell(2));
        //var newCell1 = random(this.chooseCell(3));
        if (newCell) {
            for (var i in grassEaterArr) {
                if (newCell[0] == grassEaterArr[i].x && newCell[1] == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 3;
            this.energy++;

            if (this.energy >= 16) {
                this.WiSpread();
                this.energy = 8;
            }
        }
        // else if (newCell1) {
        //     for (var i in moverArr) {
        //         if (newCell1[0] == moverArr[i].x && newCell1[1] == moverArr[i].y) {
        //             moverArr.splice(i, 1);
        //             break;
        //         }
        //     }
        //     matrix[this.y][this.x] = 0;
        //     this.x = newCell1[0];
        //     this.y = newCell1[1];
        //     matrix[this.y][this.x] = 3;
        //     this.energy++;

        //     if (this.energy >= 12) {
        //         this.WiSpread();
        //         this.energy = 3;
        //     }
        // }
        else {
            this.move();
        }
    }

    WiSpread() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var wildee = new Wild(newX, newY, 3);
            wildArr.push(wildee);
        }
    }
    die() {
        for (var i in wildArr) {
            if (this.x == wildArr[i].x && this.y == wildArr[i].y) {
                wildArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }

    }
}
*/