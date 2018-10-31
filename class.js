////////////////////////////////////////////////GRASS///////////////////////////////////////////
class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 20;
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
////////////////////////////////////////////////GRASS Eater///////////////////////////////////////////
class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
//////////////////////////////////////////////WILD//////////////////////////////////////////////
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
///////////////////////////////////////////////////MOVER//////////////////////////////////////////////////////////////
class mover {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.multiply = 1;
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
                  this.energy = 6;
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

            var moveree = new mover(newX, newY, 4);
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
////////////////////////////////////////Double Move///////////////////////////////////////////////////////
class double {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.multiply = 1;
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

            var doublee = new double(newX, newY, 5);
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