let drawnPoints = []
let lines = []
let drawnLines = []
let points = []
let pointsIndex = 0
let linesIndex = 0
let draggingPoint = null
const scale = 1000
const pointRadius = 5
let newline = null

function setup(){
  createCanvas(windowWidth, windowHeight)
  strokeWeight(3)
}

function customDraw(){
  clear();
  newline ? line(...newline) : null
  for(i = 0; i<pointsIndex; i++){
    ellipse(drawnPoints[i].x, drawnPoints[i].y, pointRadius)
    line(...getLinePoints(lines[i]))
  }
  for(i = 0; i<linesIndex; i++){
    line(...drawnLines[i])
    ellipse(points[i].x, points[i].y, pointRadius)
  }
}

function mousePressed(){
  let pointIndex = clickedPoint()
  if(pointIndex === null){
    // console.log(mouseX)
    // console.log(mouseY)
    drawnPoints.push({
      x:mouseX,
      y:mouseY,
    })
    newline = [mouseX,mouseY,mouseX,mouseY]

    ellipse(mouseX,mouseY,pointRadius)
    lines.push({
      m:2*mouseX/scale,
      b:-1*mouseY,
    })
    // console.log(getLinePoints(lines[index]))
    pointsIndex++
  }
  customDraw()
}

function mouseDragged(){
  let pointIndex = clickedPoint()
  // console.log(pointIndex)
  if(pointIndex !== null){
    drawnPoints[pointIndex].x = mouseX
    drawnPoints[pointIndex].y = mouseY
    lines[pointIndex].m = 2*mouseX/scale
    lines[pointIndex].b = -1*mouseY
    if(newline){
      newline[2] = mouseX
      newline[3] = mouseY
    }
  }
  customDraw()
}

function mouseReleased(){
  draggingPoint = null
  if(newline){
    drawnLines.push(newline)
    let m = (newline[2]-newline[0])/(newline[3]-newline[1])
    points.push({
      x: scale*m/2,
      y: newline[3],
    })
    newline = null
    linesIndex++
  }
}

function getLinePoints(line){
  let x1 = 0
  let x2 = 10000
  let y1 = -1*((line.m*x1)+line.b)
  let y2 = -1*((line.m*x2)+line.b)
  return [x1,y1,x2,y2]
}

function clickedPoint(){
  if(draggingPoint === null){
    for(i = 0; i<pointsIndex; i++){
      if(inPoint(drawnPoints[i].x,drawnPoints[i].y,mouseX,mouseY)){
        // console.log('clicked point: '+i)
        draggingPoint = i
        return i
      }
    }
    return null
  }
  else{
    return draggingPoint
  }
}

function inPoint(x1, y1, x2, y2){
  return dist(x1,y1,x2,y2) < pointRadius*10
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}
