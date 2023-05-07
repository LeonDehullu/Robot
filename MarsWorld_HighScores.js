
let myRobot;
let covidValues;
let virusArmy = [];
let virusMy;
let gameScoreCalculated;
let gameScore;

let laserSound;
let winningSound;

let backgroundImg;

let restartButton;

let scoreTable;
let highScoreData;
let highScoreName = '';
let highScoreAdded = false;
let keyStrokes = 0;

function preload() {
    // load online COVID data from Sciensano
    loadJSON("https://epistat.sciensano.be/Data/COVID19BE_CASES_MUNI_CUM.json", getNumber);
    soundFormats('mp3');
    laserSound = loadSound('data/LaserSound.mp3');
    winningSound = loadSound('data/SuperMarioWorld.mp3');
    backgroundImg = loadImage('data/mars_surface.jpg');
    // load the highscore data from HighScores.csv in highScoreData
    highScoreData = loadTable('data/HighScores.csv', 'csv', 'header');
    scoreTable = new highScoreTable(width / 2, 500, 1, highScoreData);
    scoreTable.x -= scoreTable.w / 2;

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    gameScoreCalculated = false;
    gameScore = 0;
    myRobot = new robot();
    myRobot.yPos = 500;
    for (let i = 0; i < 3; i++) {
        let xPosVirus = random(0, width);
        let yPosVirus = random(0, 500);
        virusArmy[i] = new virus(xPosVirus, yPosVirus, random(1, 10), color('#009900'), 1);
    }

    backgroundImg.resize(width, height);

    restartButton = createButton("REPLAY!");
    restartButton.mouseClicked(restart);
    restartButton.size(100, 50);
    restartButton.style("font-family", "Arial");
    restartButton.style("font-size", "20px");
    restartButton.position(width / 2 - 50, 350);
    restartButton.hide();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    backgroundImg.resize(width, height);
}

function draw() {
    image(backgroundImg, 0, 0);
    myRobot.display();
    myRobot.drive();
    let deathVirusses = 0;
    for (let i = 0; i < virusArmy.length; i++) {
        if (virusArmy[i].alive) {
            virusArmy[i].display();
            virusArmy[i].move(width, 500);
        } else {
            deathVirusses++;
        }
        if (deathVirusses >= virusArmy.length) {
            youWin();
        }
    }
}

function mousePressed() {
    myRobot.laserActive = true;
    for (let i = 0; i < virusArmy.length; i++) {
        virusArmy[i].checkHit();
    }
    if (laserSound.isPlaying()) {
        laserSound.stop();
        laserSound.play();
    } else {
        laserSound.play();
    }
}

function mouseReleased() {
    myRobot.laserActive = false;
}

function getNumber(values) {
    for (let i = 1; i < values.length - 1; i++) {
        let nameVillage = values[i].TX_DESCR_NL;
        if (nameVillage == "Gent") {
            covidValues = values[i].CASES / 10000;
            print(covidValues);
        }
    }
}

function youWin() {
    if (!winningSound.isPlaying()) {
        winningSound.play();
    }
    if (!gameScoreCalculated) {
        gameScore = calculateScore();
    }
    push();
    textSize(60);
    textAlign(CENTER);
    fill(255);
    text("YOU SAVED THE WORLD!", width / 2, 200);
    fill('#F1F548');
    text("Score = " + gameScore, width / 2, 300);
    pop();


    myRobot.yPos = 800;
    myRobot.policeLights(500);

    // add the highscore to the highscore table
    if (!highScoreAdded && checkHighScore(gameScore)) {
        text("We have a new highscore!", width / 2, 400);
        text("Please enter your name:", width / 2, 450);
        //listen to key strokes to enter highscorename 

    }

    restartButton.show();

}

function calculateScore() {
    if (!gameScoreCalculated) {
        gameScore = (int)(10000000 / millis()); // calculate the score based on the time the sketch is running
        gameScoreCalculated = true;
    }
    return gameScore;
}

function restart() {
    gameScoreCalculated = false;
    gameScore = 0;
    for (let i = 0; i < virusArmy.length; i++) {
        virusArmy[i].alive = true;
    }
    myRobot.yPos = 500;
    restartButton.hide();
}

function checkHighScore(score) {
    let newHighScore = false;
    let rows = 0;
    if (highScoreData.getRowCount() > 5) {
        rows = 5;
    } else {
        rows = highScoreData.getRowCount();
    }
    for (let i = 0; i < rows; i++) {
        if (score > highScoreData.getNum(i, "HighScore")) {
            newHighScore = true;
        }
    }
    return newHighScore;

}

