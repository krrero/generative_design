const width = 64;
const gap = 32;
const separation = 24;
const colors = [
    [219, 22, 123], 
    [0, 192, 219]
];

let x = -32;
let y = -32;
let count = 0;
let transparency = 0.75;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(10);
    noFill();
    background(14, 128, 143);
}

function draw() {
    noStroke();
    fill(`rgba(${colors[count % 2][0]}, ${colors[count % 2][1]}, ${colors[count % 2][2]}, ${transparency} )`);
    ellipse(x, y, width, width);

    x -= separation;
    y += separation;


    if (x < gap || y > window.innerHeight) {
        count += 1;
        x = gap * count;
        y = gap;
    }
}