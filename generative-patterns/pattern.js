let PALETTE = []
const CRYSTAL_SIZE = 500
const SIDES = 6

function setup() {
  createCanvas(600, 600, SVG);
  
  PALETTE = [color(18, 153, 214), //blue
 color(228, 9, 124),//pink
color(0,0,0), //black
color(251, 237, 0)];

  noLoop()
  angleMode(DEGREES)
  rectMode(CENTER)

}
function hexagon (posX, posY, radius) {                     
    const rotAngle = 360 / 6
    beginShape()
    for (let i = 0; i < 6; i++) {
      const thisVertex = pointOnCircle(posX, posY, radius, i * rotAngle)
      vertex(thisVertex.x, thisVertex.y)
    }
    endShape(CLOSE)
}
  
function pointOnCircle (posX, posY, radius, angle) {         
    const x = posX + radius * cos(angle)
    const y = posY + radius * sin(angle)
    return createVector(x, y)
}
  
function randomSelectTwo () {
    const rando = random(1)
    if (rando > 0.5) {
        return true
    } else {
        return false
    }
}
  
function getRandomFromPalette () {
    const rando2 = floor(random(0, PALETTE.length))
    return PALETTE[rando2]
}
  
function randomSelectTwo () {
    const rando = random(2)
    return rando > 1 ? true : false
}
  
function getRandomFromPalette () {
    const rando = floor(random(0, PALETTE.length))
    return PALETTE[rando]
}

function draw() {
    // testLines()
    //outlineShape()
    // simpleLines()
    //circles()
  
    let picker = random(1)
    if (picker > 0.3) {
        outlineShape()
    }
  
    picker = random(1)
    if (picker > 0.3) {
        simpleLines()
    }
  
    picker = random(1)
    if (picker > 0.5) {
        circles()
    }
    picker = random(1)
    if (picker > 0.3) {
        triangle()
    }
}
  
function circles() {
    const numShapes = SIDES
    const angle = 360 / numShapes
    const shapeSize = (CRYSTAL_SIZE / 2) * 0.93
    const position = (CRYSTAL_SIZE / 2) - (shapeSize / 2)
    const strokeColor = getRandomFromPalette()
  
    noFill()
    stroke(strokeColor)
    strokeWeight(1)
    push()
    translate(width/2, height/2)
    for (let i = 0; i <= numShapes; i++) {
        ellipse(position, 0, shapeSize, shapeSize)
        rotate(angle)
    }
    pop()
  
}
  
function simpleLines () {
    const stepsOut = 8
    const numSteps = randomSelectTwo() ? stepsOut : int(stepsOut * 1.25)
    const step = (CRYSTAL_SIZE / 2) / numSteps
    const start = floor(random(0, numSteps))
    const stop = floor(random(start, numSteps + 1))
  
    let numShapes = randomSelectTwo() ? SIDES : SIDES / 2
    const strokeColor = getRandomFromPalette()
    const weight = randomSelectTwo() ? 3 : 5
  
    const angle = 360 / numShapes
    
    noFill()
    stroke(strokeColor)
    strokeWeight(weight)
    push()
      translate(width/2, height/2)
      for (let i = 0; i < numShapes; i++) {
          line(CRYSTAL_SIZE/2, 0, CRYSTAL_SIZE, 0)  
          rotate(angle)
      }
    pop()
}
  
function triangles() {
    const stepsOut = 8
    const numSteps = randomSelectTwo() ? stepsOut : int(stepsOut * 1.25)
    const step = (CRYSTAL_SIZE / 2) / numSteps
    const start = floor(random(0, numSteps))
    const stop = floor(random(start, numSteps + 1))
  
    let numShapes = randomSelectTwo() ? SIDES : SIDES / 2
    const strokeColor = getRandomFromPalette()
    const weight = randomSelectTwo() ? 3 : 5
  
    const angle = 360 / numShapes
    
    noFill()
    stroke(strokeColor)
    strokeWeight(weight)
    push()
      translate(width/2, height/2)
      for (let i = 0; i < numShapes; i++) {
          triangle(start * step, 0, start * 2 * step, stop * step, 0)  
          rotate(angle)
      }
    pop()
}
  
function outlineShape () {
    const strokeColor = getRandomFromPalette()
    const weight = randomSelectTwo() ? 1 : 3
    const hexagonTrue = randomSelectTwo()
  
    stroke(strokeColor)
    strokeWeight(weight)
    push()
    translate(width/2, height/2)
    if (hexagonTrue) {
        hexagon(0, 0, CRYSTAL_SIZE / 2)
    } else {
        ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
    }
    pop()
}
  
function testLines () {
    let numShapes = randomSelectTwo() ? SIDES : SIDES * 2
    const strokeColor = getRandomFromPalette()
  
    noFill()
    stroke(PALETTE[0])
    strokeWeight(1)
    push()
      translate(width/2, height/2)
      ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
      stroke(strokeColor)
      const angle = 360 / numShapes
      for (let i = 0; i < numShapes; i++) {
        line(0, 0, 0, CRYSTAL_SIZE / 2)  
        rotate(angle)
      }
    pop()
}
  
function keyTyped() 
{
    save();
}