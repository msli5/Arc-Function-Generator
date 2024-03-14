//<Description> Allows you drag handles and export code for drawing bezierVertex, a group of Bezier Curves combined to form a single shape. </Description>
/* Special thanks to sauj123 for some tweaks that make it easier to keep ahold of the handles and prevents handles from snapping to one another */

var centerOffset = 0;
var offsetX = 0; 
var offsetY = 0; 
var bezierThickness = 2;
var which = 0;
var dragCircles = [];

var codeParagraph="";
var codeParagraph2="";

var beginSlider="";
var endSlider="";
var heightSlider="";
var widthSlider="";

function setup() {
  // Code here runs only once
  createCanvas(800, 400);

  angleMode(DEGREES)
  offsetX += centerOffset; 
  offsetY += centerOffset; 

translate(offsetX, offsetY);
rotate(0);

//arc()
createCircle(160, 140); 
  
codeParagraph = createP('');
codeParagraph2 = createP('');

  widthSlider = createSlider(0, 360, 60, 5);
  widthSlider.position(400, 50);
  widthSlider.style('width', '180px');

  heightSlider = createSlider(0, 360, 60, 5);
  heightSlider.position(400, 100);
  heightSlider.style('width', '180px');
  
  
  beginSlider = createSlider(0, 360, 0, 5);
  beginSlider.position(400, 150);
  beginSlider.style('width', '180px');

  endSlider = createSlider(0, 360, 180, 5);
  endSlider.position(400, 200);
  endSlider.style('width', '180px');
}

function draw() {

background(255); // Clear the Screen White
drawGrid();
drawDraggableCircles();

  
noFill();
stroke(0)
strokeWeight(bezierThickness);



  //arc()
  let widthSliderVal = widthSlider.value();
  let heightSliderVal = heightSlider.value();
  let beginSliderVal = beginSlider.value();
  let endSliderVal = endSlider.value();
  
  stroke(0)
  fill(255, 153, 0,70)

 
  arc(dragCircles[0].x, dragCircles[0].y, widthSliderVal, heightSliderVal,beginSliderVal, endSliderVal);

  //bezier's coordinate location
  fill(0)
  noStroke()
  textSize(14)

  text("("+int(dragCircles[0].x)+", "+int(dragCircles[0].y)+")",int(dragCircles[0].x-25), int(dragCircles[0].y+18))
//var circleWidth=2*(dragCircles[1].x-dragCircles[0].x)
    
      
  
  textSize(10)
  textFont("'Bree Serif', serif")
  text("center", dragCircles[0].x-12, dragCircles[0].y+28)
  textSize(14)
  text("Width:" +widthSliderVal, 400, 75)
  text("Height: " +heightSliderVal, 400, 125)
  text("Arc Start:"+beginSliderVal, 400, 175)
  text("Arc End:"+endSliderVal, 400, 225)

  var printIt= "//~~~Copy the arc(x,y,w,h,begin,end,[mode]) code below~~~\n\nangleMode(DEGREES);\n//The code angleMode(DEGREES) only needs to be added once to switch the current canvas to degree input. Best to put in the setup function.\n \nfill(255,153,0,70)\narc("+int(dragCircles[0].x)+","+int(dragCircles[0].y)+","+int(widthSliderVal)+","+int(heightSliderVal)+","+int(beginSliderVal)+","+int(endSliderVal)+");\n\n";

    //To let the text under the canvas run when mouse is within the canvas. Without this, it is hard to copy the text as the code is consistantly running.
if(mouseIsPressed===true&& mouseX<=width &&mouseY<=height){
  console.log(printIt)
codeParagraph2.html(printIt);
codeParagraph2.id('line-break-and-tab');
}
}


//---------FUCTIONS------------

// When function is called, "push" a new Array entry
function createCircle(cX,cY){
    dragCircles.push({
        x:cX,
        y:cY,
        mouseOver: false,
        circleSize: 12
    });
};

// Cycle through the Array and draw a Circle for each entry
function drawDraggableCircles(){
strokeWeight(1);


    for (var i = 0; i < dragCircles.length; i++){
if(dist(dragCircles[i].x, dragCircles[i].y, mouseX-offsetX, mouseY-offsetY) < dragCircles[i].circleSize/1.5 && (!which || which === i+1)) {
            fill (255, 0, 102, 120); 
        }
        else{ 
            noFill(); 
        }
        ellipse(dragCircles[i].x, dragCircles[i].y, dragCircles[i].circleSize, dragCircles[i].circleSize);
    }
};

function drawGrid(){
    strokeWeight(2); // Line Thickness
    stroke(0, 0, 0, 160);

    // Draw a rectangle around the canvas
  noFill()
  rect(0,0,width,height)
    
    // Draw Gray Grid
  strokeWeight(1); // Line Thickness
  fill(0, 0, 0, 100);
    stroke(140, 140, 140, 75); // light gray
  textSize(10);
    for(var i = 0; i < width ; i = i + 20){// x-axis
        line(i, 0, i, height);
        text(i*2,i*2-10,15);//print x-coordinates
    }
  for(var n = 0; n < height ; n += 20){//y-axis
        line(0, n, width, n);
        text(n*2, 5, n*2+3); //print y-coordinates
    }
};

function mouseDragged(){
    if(!which) {
        // Cycle through the Array
        for (var i = 0; i < dragCircles.length; i++){
            // If Radius Collision Detected...
            if (dist(dragCircles[i].x, dragCircles[i].y, 
                mouseX-offsetX, mouseY-offsetY) < dragCircles[i].circleSize/1.5 ){
                which = i + 1;
                break;
            }
        }
    } else {
        // Move Circle to current Mouse Position
        dragCircles[which - 1].x = mouseX-offsetX;
        dragCircles[which - 1].y = mouseY-offsetY;
    }


};

function mouseReleased() {
    which = 0;
};