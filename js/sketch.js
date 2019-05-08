// Global variables with values
// The length of one square side
var cellSize = 40;
// The color of the grid &/or cells
var colorOfLive = 255;
var colorOfDeath = 0;

// Global variables without values
var numCol;
var numRow;
var grid;

// The statements in the setup() function
// execute once when the program begins
function setup() {
    
    // Specifies the number of frames to be displayed 
    // every second. 
    // frameRate(): https://p5js.org/reference/#/p5/frameRate
    frameRate(1);

    // Creates a canvas element in the document, and 
    // sets the dimensions of it in pixels. 
    // createCanvas(): https://p5js.org/reference/#/p5/createCanvas
    canvas = createCanvas(innerWidth, innerHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-1');

    // Find the number of cols and rows, and round
    numCol = round(innerWidth/cellSize);
    numRow = round(innerHeight/cellSize);

    // Create a 2D array of the columns as an x-axis
    // and the rows as a y-axis, called grid
    grid = new Array(numCol);
    for(var x = 0; x < numCol; x++) {
        grid[x] = new Array(numRow);
    }

    // Call initialize to fill the board randomly
    initialize();
}

// The statements in draw() are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
//
// Here the draw functions loops through the 2D array
// grid, checking if the bit value is 1 and colors it
// depending on said bit value.
function draw() {
    for ( var x = 0; x < numCol; x++) {
        for ( var y = 0; y < numRow; y++) {
            
            // Determine the color used to fill shapes.
            // fill(): https://p5js.org/reference/#/p5/fill

            if ((grid[x][y] == 1)) {  // alive cell
                fill(colorOfLive);
            }
            else {                    // dead cell
                fill(colorOfDeath); 
            }

            // Sets the color used to draw lines and borders around shapes.
            // stroke(): https://p5js.org/reference/#/p5/stroke 
            stroke(colorOfDeath);

            // Draws a rectangle to the screen.
            // rect(): https://p5js.org/reference/#/p5/rect
            //
            // rect(x-coordinate, y-coordinate, width, height);
            rect(x*cellSize, y*cellSize, cellSize-1, cellSize-1);
        }
    }
}

// The initialize function loops through the 2D array
// grid, assigning a bit value to the grid entry 
// randomly.
//
// All entries on the edge of the grid are set to 0.
function initialize() {
    for(var x = 0; x < numCol; x++) {
        for(var y = 0; y < numRow; y++) {
            // Left side, and top
            if (x == 0 || y == 0) {
                grid[x][y] = 0;
            } 
            // Right side, and bottom
            else if (x == numCol-1 || y == numRow-1) {
                grid[x][y] = 0;
            } 
            // Middle
            else {
                grid[x][y] = floor(random(2));
            }
        }
    }
}