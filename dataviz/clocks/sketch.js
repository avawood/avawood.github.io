let lastMinute = -1;
let lastSecond = -1;
let lastHour = -1;
let bgColor = 50;
function setup() {
	createCanvas(800,600); // make an HTML canvas element width x height pixels
  	background(bgColor);
  strokeWeight(0);
  for (let i = 0; i < hour()%12; i++) {
    drawHour(i);
  }
  for (let i = 0; i < minute(); i++) {
    drawMinute(i);
  }
  for (let i = 0; i < second(); i++) {
    drawSecond(i);
  }
}

function drawHour(value)
{
    let color = map(value, 0, 11, 0,255);
    fill(color, 255, 255-color)
    let y = map(value, 0, 11, height * 1/10, height*7/10);
    let x = map(value%2, 0, 1, 115, 172);
    polygon(x, y, height*7/120, 6);
}

function drawMinute(value)
{
    let hourColor = map(hour()%12+1, 0, 11, 0,255);
    let grad = map(value, 0, 59, 0.1,1);
    fill(grad*hourColor, grad*255, grad*(255-hourColor))
    let y = map(value, 0, 59, height * 1/10, height*8/10);
    let x = map(value%4, 0, 3, width*0.35, width*0.6);
    let quadSize = 40;
    let tilt = quadSize * 0.57;
    quad(x,y,x+quadSize,y,x+ tilt+quadSize, y+quadSize, x + tilt,y+quadSize);
}

function drawSecond(value)
{
    let hourColor = map(hour()%12+1, 0, 11, 0,255);
    let grad = map(minute(), 0, 59, 0.1,1);
    fill(grad*hourColor, grad*255, grad*(255-hourColor))
    let y = map(value, 0, 59, height * 1/10, height*8/10);
    let x = map(value%6, 0, 5, width*0.75, width*0.9);
    polygon(x, y, 15, 3);
}
function draw() {
  // Clear minutes section after an hour completes
    if (minute() != lastMinute){
      console.log(minute());
      lastMinute = minute();
      drawMinute(minute()-1);
      if (lastMinute == 0){
        fill(bgColor);
        rect(width *0.27, 0, width*0.44, height);
      }
    }
  //Clear seconds section after a minute completes
    if (second() != lastSecond){
      lastSecond = second();
      drawSecond(second()-1);
      if (lastSecond == 0){
        fill(bgColor);
        rect(width*0.7, 0, width/3, height);
      }
    }
  //Clear hour section after a at midnight / noon
    if (hour() != lastHour){
      drawHour((hour()-1)%12);
      lastHour = (hour() -1)%12;
      if (lastHour == 0){
        fill(bgColor);
        rect(0, 0, width/3, height);
      }
    }
    
}

// Reference: https://p5js.org/examples/form-regular-polygon.html
function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
