let points = []
let lines = []
let index = 0
const scale = 1000
const pointRadius = 5

function setup(){
  createCanvas(windowWidth, windowHeight)
  strokeWeight(3)
}

function customDraw(){
  clear();
  for(i = 0; i<index; i++){
    ellipse(points[i].x, points[i].y, pointRadius)
    line(...getLinePoints(lines[i]))
  }
}

function mousePressed(){
  let pointIndex = clickedPoint()
  if(pointIndex !== null){
    // console.log('clicked point')
    points[i].x = mouseX
    points[i].y = mouseY
  }
  else{
    // console.log(mouseX)
    // console.log(mouseY)
    points.push({
      x:mouseX,
      y:mouseY,
      id:index,
    })
    lines.push({
      m:2*mouseX/scale,
      b:-1*mouseY,
      id:index,
    })
    // console.log(getLinePoints(lines[index]))
    index++
  }
  customDraw()
}

function mouseDragged(){
  let pointIndex = clickedPoint()
  if(pointIndex !== null){
    // console.log('clicked point')
    points[i].x = mouseX
    points[i].y = mouseY
    lines[i].m = 2*mouseX/scale
    lines[i].b = -1*mouseY
  }
  customDraw()
}

function getLinePoints(line){
  let x1 = 0
  let x2 = 10000
  let y1 = -1*((line.m*x1)+line.b)
  let y2 = -1*((line.m*x2)+line.b)
  return [x1,y1,x2,y2]
}

function clickedPoint(){
  for(i = 0; i<index; i++){
    if(inPoint(points[i].x,points[i].y,mouseX,mouseY)){
      return i
    }
  }
  return null
}

function inPoint(x1, y1, x2, y2){
  return dist(x1,y1,x2,y2) < pointRadius*10
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}
