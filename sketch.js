let lastMinute = -1;
let lastSecond = -1;
let lastHour = -1;
let bgColor = 50;
function setup() {
	createCanvas(800,600); // make an HTML canvas element width x height pixels
  	background(bgColor);
  strokeWeight(0);
  for (let i = 0; i < hour(); i++) {
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
    let y = map(value, 0, 11, height * 2/10, height*8/10);
    let x = map(value%2, 0, 1, 115, 172);
    polygon(x, y, height*7/120, 6);
}

function drawMinute(value)
{
    let hourColor = map(hour(), 0, 11, 0,255);
    let grad = map(value, 0, 59, 0.1,1);
    fill(grad*hourColor, grad*255, grad*(255-hourColor))
    let y = map(value, 0, 59, height * 2/10, height*8/10);
    let x = map(value%4, 0, 3, width*0.35, width*0.6);
    polygon(x, y, height*7/120, 4);
}

function drawSecond(value)
{
    let hourColor = map(hour(), 0, 11, 0,255);
    let grad = map(minute()+1, 0, 59, 0,1);
    fill(grad*hourColor, grad*255, grad*(255-hourColor))
    let y = map(value, 0, 59, height * 2/10, height*8/10);
    let x = map(value%6, 0, 5, width*0.75, width*0.9);
    polygon(x, y, 15, 3);
}
function draw() {
  // Clear minutes section after an hour completes
    if (minute() != lastMinute){
      console.log(minute());
      lastMinute = minute();
      if (lastMinute == 0){
        strokeWeight(1);
        fill(bgColor);
        rect(width *0.27, 0, width*0.4, height);
      }
    }
  //Clear seconds section after a minute completes
    if (second() != lastSecond){
      lastSecond = second();
      if (lastSecond == 0){
        strokeWeight(0);
        fill(bgColor);
        rect(width*0.7, 0, width/3, height);
      }
    }
  //Clear hour section after a minute completes
    if (hour() != lastHour){
      lastHour = hour();
      if (lastHour == 0){
        strokeWeight(0);
        fill(bgColor);
        rect(0, 0, width/3, height);
      }
    }
  
//   Do drawing
    drawHour(hour());
    drawMinute(minute());
    drawSecond(second());
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