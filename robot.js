class robot {

  constructor() { // default constructor
    this.xPos = width/2;
    this.yPos = height/2;
    this.xSpeed = 2;
    this.hairColor = color(255);
    this.bodyColor = color(0);
    this.robotSize = 1;
    this.laserActive=false;

    this.gunAngle=0;
    this.timeDelay=500;
    this.timer=0;
    this.timeDelayTrigger=false;
  }

  display() {

    let bodyHeight=250;
    let neckHeight=20;
    let radius = 45;
    let neckY = -1 * (bodyHeight + neckHeight + radius);

    push();
    translate(this.xPos, this.yPos);
    scale(this.robotSize);

    // Body
    stroke(255);
    fill(255, 204, 0);
    ellipse(0, -33, 66, 66);
    fill(this.bodyColor);
    rect(-45, -bodyHeight, 90, bodyHeight-33);

    // Neck
    line(12, -bodyHeight, 12, neckY);

    // Hair
    push();
    translate(12, neckY);
    let angle = -PI/30.0;
    for (let i = 0; i <= 30; i++) {
      stroke(this.hairColor);
      line(80, 0, 0, 0);
      rotate(angle);
      stroke(255);
    }
    pop();

    // Head
    fill(0);
    stroke(255);
    ellipse(12, neckY, 2*radius, 2*radius);
    fill(255);
    ellipse(24, neckY-6, 28, 28);
    noStroke();
    fill(0);
    ellipse(24, neckY-6, 10, 10);

    //gun
    push();

    translate(0, -bodyHeight/2);
    this.gunAngle = atan2((mouseY-(this.yPos-bodyHeight/2)), (mouseX-this.xPos)); // calculate angle in function of mouse position
    if (this.laserActive) {
      stroke('#FF0000');
      strokeWeight(4);
      line(0, 0, mouseX-this.xPos, mouseY-(this.yPos-bodyHeight/2));
      noStroke();
      strokeWeight(1);
    }
    rotate(this.gunAngle);
    fill('#BCBABA');
    ellipse(0, 0, 40, 40);
    rect(0, -10, 100, 20);

    pop();

    pop();
  }

  drive() {
    this.xPos += this.xSpeed;
    if (this.xPos>width+(this.robotSize*90)) {
      this.xPos=-this.robotSize*90;
    }
  }

  policeLights(timeInterval)
  {
    this.timeDelay=timeInterval; // default 500ms
    if (millis()-this.timer >= this.timeDelay)
    {
      this.timeDelayTrigger = !this.timeDelayTrigger; //change the trigger after each delay
      this.timer = millis();
    }

    if (this.timeDelayTrigger) {
      this.hairColor = color(255, 0, 0); //haircolor red
    } else {
      this.hairColor = color(0, 0, 255); //haircolor blue
    }
  }
}
