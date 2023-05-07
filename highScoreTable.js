class highScoreTable {

    constructor(xp, yp, sizep, highScoreTablep) {
        this.x = xp;
        this.y = yp;
        this.w = 500 * sizep;
        this.h = 400 * sizep;
        this.size = sizep;
        this.dataTable = highScoreTablep;
    }

    display() {
        push();
        translate(x, y);
        scale(size);

        fill(255, 200);
        strokeWeight(10);
        rect(0, 0, 500, 400);
        line(0, 80, 500, 80);

        textSize(60);
        textAlign(CENTER);
        fill(0);
        text(" ***HIGHSCORES*** ", 250, 60);

        textSize(50);
        let rows = 0;
        if (this.dataTable.getRowCount() > 5)
            rows = 5;
        else
            rows = this.dataTable.getRowCount();

        for (let i = 0; i < rows; i++) {
            textAlign(LEFT);
            text(this.dataTable.getString(i, "Name"), 20, 50 * (3 + i));
            textAlign(RIGHT);
            text(this.dataTable.getNum(i, "HighScore"), 480, 50 * (3 + i));
        }
        pop();
    }

    setHighScore(name, score, filename) {
        let newRow = this.dataTable.addRow();
        newRow.setNum("HighScore", score);
        newRow.setString("Name", name);
        this.dataTable.sortRows("HighScore", DESCENDING);
        saveTable(this.dataTable, filename);
    }
}