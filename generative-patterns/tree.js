let PALETTE=[]
var angle = 180/7;
var thickness = 5
//var slider;

function setup(){
    createCanvas(600, 600);
    //slider = createSlider(0, TWO_PI, PI/4);
    //angleMode(DEGREES)

}

function draw() {
    background(51);
    var len = 100;
    //angle = slider.value();
    stroke(red);
    //translate(width/2, height);
    //line(0, 0, 0, -len);
    //branch(100, 0);
    drawBranch();
}


function branch(len, level){
    line(0, 0, 0, -len);
    translate(0, -len);
    //rotate(180/4);
    strokeWeight(thickness-level)
    fill(255-len, 0, 0)
    if (len > 4){
        push();
        rotate(angle);
        
        branch(len*0.67, level+1)
        ;
        pop();
        push();
        rotate(-angle);
        //strokeWeight(thickness-level)
        branch(len*0.67, level+1);
        ;
        pop();
    }

}

function drawBranch(){
    push()
        translate(width/2, height/2)
        for (let i = 0; i< 9; i++){
            branch(100, 0)
            rotate(360/5)
        }
    pop()
}

