let Palette = []

function setup() {
    createCanvas(600, 600, SVG)
    Palette = [
        color(75,105,115), //teal
        color(10,36,99), //royal blue
        color(28,79,78), // english green
        color(24,32,111), //midnight blue
        color(34,30,57) //dark purple
    ]
    noLoop()
    angleMode(DEGREES)
}

function draw(){

}

function keyTyped() 
{
    save();
}