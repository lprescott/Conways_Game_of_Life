// Luke R. Prescott
// I-CSI 409
// Conway's Game of Life

// ~~~~~~~~~~~~~~~~ Change These Global Variables ~~~~~~~~~~~~~~~~~~~~~

var cellSize = 10;      // The length of one square side in pixels.
var fps = 10;           // The speed of the animation in frames/second.
var whiteOnly = 0;      // Set this value to 1 for only white automata.

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Initialized Global Variables
var numCol;
var numRow;
var grid;
var nextGeneration;
var fpsSlider;
var sizeSlider;

var running = true;

// The statements in the setup() function
// execute once when the program begins
function setup() {
    
    // Specifies the number of frames to be displayed 
    // every second. 
    // frameRate(): https://p5js.org/reference/#/p5/frameRate
    frameRate(fps);

    // Creates a canvas element in the document, and 
    // sets the dimensions of it in pixels. 
    // createCanvas(): https://p5js.org/reference/#/p5/createCanvas
    canvas = createCanvas(innerWidth-150, innerHeight);
    canvas.position(150,0);
    canvas.style('z-index', '-1');

    // Find the number of cols and rows, and round it
    numCol = round((innerWidth-150)/cellSize);
    numRow = round(innerHeight/cellSize);

    // Create a 2D array of the columns as an x-axis
    // and the rows as a y-axis, called grid.
    //
    // Create a duplicate sized 2D array, called
    // nextGeneration.
    //
    // Create a third duplicate size 2D array, called
    // colors;
    grid = new Array(numCol);
    nextGeneration = new Array(numCol);
    colors = new Array(numCol);
    for(var x = 0; x < numCol; x++) {
        grid[x] = new Array(numRow);
        nextGeneration[x] = new Array(numRow);
        colors[x] = new Array(numRow);
    }

    // Start all colors at black
    for(var x = 0; x < numCol; x++) {
        for(var y = 0; y < numRow; y++){
            colors[x][y] = color(0,0,0);
        }
    }

    // Label for fps slider
    createDiv('&nbsp;Frames Per Second');
    createDiv('&nbsp;(1-30 fps):');

    // Slider for fps
    fpsSlider = createSlider(1, 30, cellSize, 1);

    // Label for size input
    createDiv('<br>&nbsp;Size of automata');
    createDiv('&nbsp;(5+ pixels):');

    sizeInput = createInput(cellSize);
    sizeInput.input(setSizeOnInput);

    // Controls
    createDiv('<br>&nbsp;Controls:'); 
    createDiv('&nbsp;- L-Alt: restart'); 
    createDiv('&nbsp;- SPACE: play/pause');

    // Legend
    createDiv('<br>&nbsp;Legend:'); 
    createDiv('<div id="green-text">&nbsp;- Green: newborn</div>'); 
    createDiv('<div id="white-text">&nbsp;- White: stasis</div>'); 
    createDiv('<div id="red-text">&nbsp;- Red: crowded</div>'); 
    createDiv('<div id="blue-text">&nbsp;- Blue: lonely</div>'); 

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

    if(!running) return;

    // Set fps
    frameRate(fpsSlider.value());

    // Create the next generation
    generation();

    for ( var x = 0; x < numCol; x++) {
        for ( var y = 0; y < numRow; y++) {
            
            // Determine the color used to fill shapes.
            // fill(): https://p5js.org/reference/#/p5/fill
            fill(colors[x][y]);

            // Sets the color used to draw lines and borders 
            // around shapes.
            // stroke(): https://p5js.org/reference/#/p5/stroke 
            stroke(0);

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
            // automaton because an automaton cannot have a neighbor 
            // of itself.
            numNeighbors -= grid[x][y];
            
            // Loneliness
            if ((grid[x][y] == 1) && (numNeighbors <  2)) {
                nextGeneration[x][y] = 0;
                
                if(whiteOnly == 1) colors[x][y] = color(255);
                else colors[x][y] = color(29,85,216);
            }
            
            // Overpopulation   
            else if ((grid[x][y] == 1) && (numNeighbors >  3)) {
                nextGeneration[x][y] = 0;

                // Gradient of overpopulation or just white
                if(whiteOnly == 1) colors[x][y] = color(255);
                else if (numNeighbors == 4) colors[x][y] = color(255,0,0);
                else if (numNeighbors == 5) colors[x][y] = color(205,0,0);
                else if (numNeighbors == 6) colors[x][y] = color(155,0,0);
                else if (numNeighbors == 7) colors[x][y] = color(105,0,0);
                else if (numNeighbors == 8) colors[x][y] = color(55,0,0);

            }
            
            // Reproduction
            else if ((grid[x][y] == 0) && (numNeighbors == 3)) {
                nextGeneration[x][y] = 1; 

                if(whiteOnly == 1) colors[x][y] = color(255);
                else colors[x][y] = color(173,255,47);
            }

            // Stasis
            else {
                nextGeneration[x][y] = grid[x][y];

                // Check whether stasis is at life or death and
                // color accordingly
                if(grid[x][y] == 1) {
                    colors[x][y] = color(255);
                } else {
                    var black = color(0,0,0);
                    colors[x][y] = (black, 0);
                }
              
            }
        }
    }

    // Swap the current grid with the next generation, and set next
    // generation to the current grid.
    var tempGrid = grid;
    grid = nextGeneration;
    nextGeneration = tempGrid;
}

// The keyPressed() function is called once every time a key is 
// pressed. 
function keyPressed() {

    // Play/pause on space
    if (keyCode == 32 ) {
        running = !running;
    } 

    // Restart on L-Alt
    else if (keyCode == 18) {
        initialize();
    }
}

function setSizeOnInput() {

    if(this.value() > 5){
        
        cellSize = this.value();
        
        // Creates a canvas element in the document, and 
        // sets the dimensions of it in pixels. 
        // createCanvas(): https://p5js.org/reference/#/p5/createCanvas
        canvas = createCanvas(innerWidth-150, innerHeight);
        canvas.position(150,0);
        canvas.style('z-index', '-1');

        // Find the number of cols and rows, and round it
        numCol = round((innerWidth-150)/cellSize);
        numRow = round(innerHeight/cellSize);

        // Create a 2D array of the columns as an x-axis
        // and the rows as a y-axis, called grid.
        //
        // Create a duplicate sized 2D array, called
        // nextGeneration.
        //
        // Create a third duplicate size 2D array, called
        // colors;
        grid = new Array(numCol);
        nextGeneration = new Array(numCol);
        colors = new Array(numCol);
        for(var x = 0; x < numCol; x++) {
            grid[x] = new Array(numRow);
            nextGeneration[x] = new Array(numRow);
            colors[x] = new Array(numRow);
        }

        // Start all colors at black
        for(var x = 0; x < numCol; x++) {
            for(var y = 0; y < numRow; y++){
                colors[x][y] = color(0,0,0);
            }
        }

        // Call initialize to fill the grid randomly
        initialize();
    }
}