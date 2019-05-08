// Global variables with values
// The length of one square side
var cellSize = 40;

// Global variables without values
var numCol;
var numRow;
var grid;

// The statements in the setup() function
// execute once when the program begins
function setup() {
    
    // Specifies the number of frames to be displayed 
    // every second. 
    // https://p5js.org/reference/#/p5/frameRate
    frameRate(1);

    // Creates a canvas element in the document, and 
    // sets the dimensions of it in pixels. 
    // https://p5js.org/reference/#/p5/createCanvas
    canvas = createCanvas(innerWidth, innerHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-1');

    // Find the number of cols and rows, and round
    numCol = round(innerWidth/cellSize);
    numRow = round(innerHeight/cellSize);

    // Create a 2D array of the columns as an x-axis
    // and the rows as a y-axis, called grid
    grid = new Array(numCol);
    for(var x = 0; x < numCol; x++){
        grid[x] = new Array(numRow);
    }
}

// The statements in draw() are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
function draw() {
    
}