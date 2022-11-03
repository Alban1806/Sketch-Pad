// Main Window
const mainWindow = document.createElement('div');
mainWindow.setAttribute('id','main-window');
mainWindow.setAttribute('style', 'display: flex; justify-content: center; align-items: center;');

// Sketch grid; Insert wrap to make squares fit in grid.
const grid = document.createElement('div');
grid.setAttribute('id', 'grid');
grid.setAttribute('style','display: flex; flex-wrap: wrap; margin: 300px; height: 16em; width: 16em; border: 1px solid;');

// Make 1 x 1 squares
const square = document.createElement('div');
square.setAttribute('class', 'square');
square.setAttribute('style', 'height: 1em; width: 1em;');

// Append squares to grid
const fragment = new DocumentFragment();
for(let i = 0; i < 16; i++) {
    for(let j = 0; j < 16; j++){
        fragment.appendChild(square.cloneNode(true));        
    }
}

grid.append(fragment);
mainWindow.append(grid);
document.body.appendChild(mainWindow);  

// CREATE A HOLD CLICK BUTTONS INSTEAD OF ONE CLICK.
// HOLD LEFT CLICK TO COLOR SQUARES BLACK
// HOLD RIGHT CLICK TO ERASE BLACK SQUARES.

let mouseDown = false;
document.body.addEventListener('mousedown', (e) => {
    mouseDown = true;
    console.log('hold mouse: ' + mouseDown);

})

document.body.addEventListener('mouseup', (e) => {
    mouseDown = false;
    console.log('hold mouse: ' + mouseDown);
})

// color square black when clicked.
grid.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.target.style.background = 'black';
})

// color square black when mouse is held and moving.
const AllSquares = document.querySelectorAll('.square');
Array.from(AllSquares).forEach(square => {
    square.addEventListener('mouseover', (mm) => {
        if(mouseDown) {
            mm.target.style.background = 'black'
        }
    });
});