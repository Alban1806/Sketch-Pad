
// Default dimensions for grid
let gridHeight = 32;
let gridWidth = 32;

// Main Window for all elements
function setMainWindow() {
    const mainWindow = document.createElement('div');
    mainWindow.setAttribute('id','main-window');
    mainWindow.setAttribute('style', 'display: flex; justify-content: center; align-items: center;');

    return mainWindow;
}

// Make grid; Insert wrap to make squares fit in grid.
function setGrid(squareSize) {

    // This container will hold the title and Grid.
    const gridContainer = document.createElement('div');
    gridContainer.setAttribute('id','grid-container');
    gridContainer.setAttribute('style','margin-top: 200px; margin-bottom: 200px; margin-left: 100px; margin-right: 100px;')

    // Grid Title: Sketch Pad
    const gridTitle = document.createElement('div');
    gridTitle.setAttribute('style','text-align: center;');
    gridTitle.innerHTML = "<h1>Sketch Pad</h2>";

    const grid = document.createElement('div');
    grid.setAttribute('id', 'grid');
    grid.setAttribute('style',`display: flex; flex-wrap: wrap;
                        height: ${gridHeight}em; width: ${gridWidth}em; border: 1px solid;`);
    
    // Make n x n squares
    const squareHeight = gridHeight/squareSize;
    const squareWidth = gridWidth/squareSize;
    const square = document.createElement('div');
    square.setAttribute('class', 'square');
    square.setAttribute('style', `height: ${squareHeight}em; width: ${squareWidth}em;`);
    
    // Append squares to grid
    const fragment = new DocumentFragment();
    for(let i = 0; i < squareSize; i++) {
        for(let j = 0; j < squareSize; j++){
            fragment.appendChild(square.cloneNode(true));        
        }
    }

    grid.append(fragment);

    gridContainer.append(gridTitle);
    gridContainer.append(grid);

    return gridContainer;
}

// CREATE A HOLD CLICK BUTTONS INSTEAD OF ONE CLICK.
// HOLD LEFT CLICK TO COLOR SQUARES BLACK
// HOLD RIGHT CLICK TO ERASE BLACK SQUARES.
function mouseEvents(grid, color) {

    let mouseDown = false;
    document.body.addEventListener('mousedown', (e) => {
        mouseDown = true;

    })

    document.body.addEventListener('mouseup', (e) => {
        mouseDown = false;
    })

    //  Attach event listener
    let squareColor = 'black';
    color.addEventListener('click', e => {
        squareColor = e.target.value;
    })


    // color square black when clicked.
    grid.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.target.style.background = `${squareColor}`;
    })

    // color square black when mouse is held and moving.
    const AllSquares = grid.querySelectorAll('.square');
    Array.from(AllSquares).forEach(square => {
        square.addEventListener('mouseover', (mm) => {
            if(mouseDown) {
                mm.target.style.background = `${squareColor}`;
            }
        });
    });
}

// Make a text box with a submit to define the dimensions of the grid.
function setFieldBox(squareSize) {
    
    const dimensionField = document.createElement('div');
    dimensionField.setAttribute('id','dimension');

    const textTitle = document.createElement('div');
    textTitle.setAttribute('id','title');
    textTitle.textContent = 'Enter # of squares';

    const textField = document.createElement('div');
    textField.setAttribute('id', 'text-field');

    // Input text
    const textBox = document.createElement('input');
    textBox.setAttribute('id', 'text');
    textBox.setAttribute('type','text');
    textBox.setAttribute('style','width: 50px;');

    // Submit button
    const submit = document.createElement('input');
    submit.setAttribute('id','submit');
    submit.setAttribute('type','submit');

    // Click submit button to make a new grid with square size from input text.
    submit.addEventListener('click', () => {
        const textBox = document.querySelector('#text');
        textBoxValue = Number(textBox.value);
    
        // Clear the dom
        let mainWindow = document.querySelector('#main-window');
        document.body.removeChild(mainWindow);
    
        // Rerun sketch with new square size.
        // Note: input text can't have more more than 100x100 squares
        if(textBoxValue > 0 && textBoxValue <= 100) makeSketch(textBoxValue);
        else makeSketch(squareSize);
    })

    textField.append(textBox);
    textField.append(submit);
    dimensionField.append(textTitle);
    dimensionField.append(textField);

    return dimensionField;
}

// Let user click a color for the squares
function setColor() {
    
    const colorField = document.createElement('div');
    colorField.setAttribute('id','color');
    const colorBox = document.createElement('select');
    colorBox.setAttribute('name','colors');
    const black = colorOption('black');
    const blue = colorOption('blue');
    const red = colorOption('red');
    const green = colorOption('green');
    const purple = colorOption('purple');
    const pink = colorOption('pink');
    const yellow = colorOption('yellow');
    const orange = colorOption('orange');
    const brown = colorOption('brown');
    const grey = colorOption('grey');

    colorBox.append(black);
    colorBox.append(blue);
    colorBox.append(red);
    colorBox.append(green);
    colorBox.append(purple);
    colorBox.append(pink);
    colorBox.append(yellow);
    colorBox.append(orange);
    colorBox.append(brown);
    colorBox.append(grey);

    colorField.setAttribute('style','text-align: center;');
    colorBox.setAttribute('style','width: 8em');
    
    const colorTitle = document.createElement('div');
    colorTitle.textContent = 'Pick square color';

    colorField.append(colorTitle);
    colorField.append(colorBox);
    return colorField;
}

function colorOption(x) {
    const color = document.createElement('option');
    color.setAttribute('value',`${x}`);
    color.textContent = `${x}`;
    return color;
}

// Run to put all the elements together in main window.
function makeSketch (squareSize) {
    let mainWindow = setMainWindow();
    let grid = setGrid(squareSize);
    let dimension = setFieldBox(squareSize);
    let color = setColor();

    // Aligg the dimension and color elements.
    const align = document.createElement('div');
    align.setAttribute('id','dimension-and-grid');
    dimension.setAttribute('style','margin-bottom: 1em');
    align.append(dimension);
    align.append(color);

    mouseEvents(grid, color);
    
    mainWindow.append(grid);
    mainWindow.append(align);
    document.body.appendChild(mainWindow);
}


// Run
makeSketch(32);