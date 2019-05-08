// Luke R. Prescott
// I-CSI 409
// Final Project

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
var nextGeneration;

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

    // Find the number of cols and rows, and round it
    numCol = round(innerWidth/cellSize);
    numRow = round(innerHeight/cellSize);

    // Create a 2D array of the columns as an x-axis
    // and the rows as a y-axis, called grid
    grid = new Array(numCol);
    for(var x = 0; x < numCol; x++) {
        grid[x] = new Array(numRow);
    }

    // Create a duplicate sized 2D array
    nextGeneration = new Array(numCol);
    for(var x = 0; x < numCol; x++) {
        nextGeneration[x] = new Array(numRow);
    }

    // Call initialize to fill the grid randomly
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

    // Create the next generation
    generation();

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

            // Sets the color used to draw lines and borders 
            // around shapes.
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
// grid, assigning a bit value to the grid automaton 
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
                // floor(random(2)) has a 50-50 shot of being
                // 0 or 1
                grid[x][y] = floor(random(2));
            }

            // Initialize next generation
            nextGeneration[x][y] = 0;
        }
    }
}

// The generation function loops through the 2D array
// grid, and counts the number of neighbors on the grid.
//
// A neighbor is defined as being one of the entries in a 
// 3x3 grid surrounding a automaton.
//
// There are 4 possible states after the quantitative 
// calculation of the number of neighbors. Two of which 
// are a reject state dubbed loneliness, and overpopulation.
function generation() {
    for(var x = 1; x < numCol - 1; x++) {
        for(var y = 1; y < numRow - 1; y++) {

            var numNeighbors = 0;
            // Add up all the states in a 3x3 surrounding grid
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    numNeighbors += grid[x+i][y+j];
                }
            }

            // We must subtract the activity status of the current
            // automaton because an automaton cannot have a neighbor of 
            // itself.
            numNeighbors -= grid[x][y];
            
            // Loneliness
            if ((grid[x][y] == 1) && (numNeighbors <  2)) {
                nextGeneration[x][y] = 0;
            }
            
            // Overpopulation   
            else if ((grid[x][y] == 1) && (numNeighbors >  3)) {
                nextGeneration[x][y] = 0;
            }
            
            // Reproduction
            else if ((grid[x][y] == 0) && (numNeighbors == 3)) {
                nextGeneration[x][y] = 1; 
            }

            // Stasis
            else {
                nextGeneration[x][y] = grid[x][y];
            }
        }
    }

    // Swap the current grid with the next generation, and set next
    // generation to the current grid.
    var tempGrid = grid;
    grid = nextGeneration;
    nextGeneration = tempGrid;
}