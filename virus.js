class virus {


  constructor(xPosP, yPosP, speedP, bodyColorP, virusSizeP) {  // custom contstructor
    this.xPos = xPosP;
    this.yPos = yPosP;
    this.xSpeed = speedP;
    this.ySpeed = speedP;
    this.bodyColor = bodyColorP;
    this.virusSize = virusSizeP;
    this.coronas = random(8,20);
    this.alive= true;
  }

  display() {
    push();
    translate(this.xPos, this.yPos);
    scale(this.virusSize);
    
    noStroke();
    fill(color(0, 255, 0));
    ellipse(0, 0, 30, 30);
    let angle = 2*PI/this.coronas;
    for (let i=0; i<=this.coronas; i++) {
      rect(10, -2, 16, 4);
      ellipse(24, 0, 6, 6);
      rotate(angle);
    }
    pop();
  }
  
  move(moveWidth, moveHeight){   // move this object with a certain speed, bouncing off the walls of the countaining box defined by width and height parameters
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
    if ((this.xPos > moveWidth) || (this.xPos < 0)){
      this.xSpeed = -this.xSpeed; 
    }
    if ((this.yPos > moveHeight) || (this.yPos < 0)){
      this.ySpeed = -this.ySpeed; 
    }
    
  }
  
  checkHit(){
    if (dist(mouseX,mouseY,this.xPos,this.yPos)<40){
      this.alive=false; 
    }
  }
}  
