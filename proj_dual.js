// Evil global state stuff
let lines = []
let points = []
let pointsIndex = 0
let draggingPoint = null
let newline = null
const scale = 1000
const pointRadius = 5

// P5.js functions
function setup(){
  createCanvas(windowWidth, windowHeight)
  strokeWeight(3)
}

function draw(){
  clear()
  newline ? newline.draw() : null
  for(i = 0; i<points.length; i++){
    points[i].draw()
    points[i].dualLine().draw()
  }
  for(i = 0; i<lines.length; i++){
    lines[i].draw()
    lines[i].dualPoint().draw()
  }
}

function mousePressed(){
  let point = new Point(mouseX, mouseY)
  let pointIndex = clickedPoint()
  if(pointIndex === null){
    // console.log(mouseX)
    // console.log(mouseY)
    points.push(point)
    ellipse(mouseX,mouseY,pointRadius)

    newline = new Line(point, new Point(point.x, point.y))
    lines.push(newline)
    pointsIndex++
  }
}

function mouseDragged(){
  let pointIndex = clickedPoint()
  if(newline){
    newline.p2.x = mouseX
    newline.p2.y = mouseY
  }
  else{
    if(pointIndex !== null){
      points[pointIndex].x = mouseX
      points[pointIndex].y = mouseY
    }
  }
}

function mouseReleased(){
  draggingPoint = null
  let line = newline
    ? dist(newline.p1.x,newline.p1.y,newline.p2.x,newline.p2.y) > pointRadius
    : false
  if(line) {
    points.push(newline.p2)
  }
  else if(newline) {
    lines.pop()
  }
  newline = null
}

function clickedPoint(){
  if(draggingPoint === null){
    for(i = 0; i<points.length; i++){
      if(inPoint(points[i].x,points[i].y,mouseX,mouseY)){
        draggingPoint = points[i]
        return i
      }
    }
    return null
  }
  else{
    return points.indexOf(draggingPoint)
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}

// Base Objects
function Point(x, y){
  this.x = x
  this.y = y

  this.dualLine = function(){
    return getLine(2*this.x/scale, -1*this.y)
  }

  this.draw = function(){
    ellipse(this.x, this.y, pointRadius)
  }
}

function Line(p1, p2){
  this.p1 = p1
  this.p2 = p2

  this.getSlope = function(){
    return (this.p2.y-this.p1.y)/(this.p2.x-this.p1.x)
  }

  this.getIntercept = function(){
    return (this.getSlope()*-1*this.p1.x)+this.p1.y
  }

  this.dualPoint = function(){
    return new Point(scale*this.getSlope()/2, -1*this.getIntercept())
  }

  this.draw = function(){
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y)
  }
}

// Utility functions
function clickedPoint(){
  if(draggingPoint === null){
    for(i = 0; i<points.length; i++){
      if(inPoint(points[i].x,points[i].y,mouseX,mouseY)){
        draggingPoint = points[i]
        return i
      }
    }
    return null
  }
  else{
    return points.indexOf(draggingPoint)
  }
}

function inPoint(x1, y1, x2, y2){
  return dist(x1,y1,x2,y2) < pointRadius*5
}

function getLine(m, b){
  let x1 = -1*windowWidth
  let x2 = windowWidth
  let p1 = new Point(x1, m*x1+b)
  let p2 = new Point(x2, m*x2+b)
  return new Line(p1, p2)
}

function inPoint(x1, y1, x2, y2){
  return dist(x1,y1,x2,y2) < pointRadius*5
}
