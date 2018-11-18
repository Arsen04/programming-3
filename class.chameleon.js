//////////////////////////////////////////////Chameleon//////////////////////////////////////////////
class Chameleon extends Base {
    constructor(x, y) {
        super(x, y);
        this.energy = 14;
        this.multiply = 18;
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
    move() {

        var emptyCells = this.chooseCell(0);
        var emptyCells1 = this.chooseCell(1);
        var newCellM = random(emptyCells);
        var newCellN = random(emptyCells1);

        if (newCellM) {
            var newXgr = newCellM[0];
            var newYgr = newCellM[1];
            matrix[this.y][this.x] = 0;
            matrix[newYgr][newXgr] = 6;

            this.x = newXgr;
            this.y = newYgr;

        }
        else if (newCellN) {
            var newXgr = newCellN[0];
            var newYgr = newCellN[1];
            matrix[this.y][this.x] = 0;
            matrix[newYgr][newXgr] = 6;

            this.x = newXgr;
            this.y = newYgr;

        }
        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
    }
    EatG() {
        var newCell = random(this.chooseCell(1));
        //var newCell1 = random(this.chooseCell(6));
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
            matrix[this.y][this.x] = 6;
            this.energy++;

            if (this.energy >= 16) {
                this.WiSpread();
                this.die();
            }
        }
        else {
            this.move();
        }
    }

    WiSpread() {
        
        for(var i = 0; i<2; i++){
            var emptyCells = this.chooseCell(0);
            var newCell = random(emptyCells);
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 6;
    
                var chameleonee = new Chameleon(newX, newY, 6);
                chameleonArr.push(chameleonee);
            }
        }

    }
    die() {
        for (var i in chameleonArr) {
            if (this.x == chameleonArr[i].x && this.y == chameleonArr[i].y) {
                chameleonArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }

    }
}