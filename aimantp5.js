
const div = 6

const add = 15
const del = -4

const width = parseInt(window.innerWidth / div)
const height = parseInt(window.innerHeight / div)
const grid = Array.from(Array(width), () => new Array(height).fill(0))
const love = Array.from(Array(width), () => new Array(height).fill(0))
const deep = Array.from(Array(width), () => new Array(height).fill(0))

const step = 0.015
let time = 0
let nPoint

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(51)
}
function computeLove(x, y) {
    let sum = 0
    let Xmin = x > 0
    let Xmax = x < width - 1
    let Ymin = y > 0
    let Ymax = y < height - 1

    if (Xmin) {
        sum += grid[x - 1][y]
    }
    if (Xmax) {
        sum += grid[x + 1][y]
    }
    if (Ymin) {
        sum += grid[x][y - 1]
    }
    if (Ymax) {
        sum += grid[x][y + 1]
    }
    if (Xmax && Ymax) {
        sum += grid[x + 1][y + 1]
    }
    if (Xmin && Ymin) {
        sum += grid[x - 1][y - 1]
    }
    if (Xmin && Ymax) {
        sum += grid[x - 1][y + 1]
    }
    if (Xmax && Ymin) {
        sum += grid[x + 1][y - 1]
    }
    return sum
}

function computeGrid(subjectX, subjectY, cap) {
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            // const love = computeLove(x, y)
            let xDist = Math.abs(x - subjectX / div)
            let yDist = Math.abs(y - subjectY / div)
            let odds = getRandomInt((xDist * xDist + yDist * yDist + grid[x][y] / 2) / 100)
            if (odds === 0 && cap) {
                grid[x][y] += add
            } else {
                grid[x][y] += del
            }
            if (grid[x][y] > 510) {
                grid[x][y] = 510
            }
            if (grid[x][y] < 0) {
                grid[x][y] = 0
            }
        }      
    }
}

function drawGrid() {
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {

            const perlinX = map(x, 0, width, 0, 10)
            const perlinY = map(y, 0, width, 0, 10)
            const nX = noise(perlinX + time)
            const nY = noise(perlinY + 1000)
            deep[x][y] = map(nX + nY, 0.5, 3, 0, 500)

            // const value = grid[x][y] + deep[x][y];
            const value = grid[x][y];

            fill(255, value - 255, value - 255, value)
            noStroke()
            circle(x * div, y * div, div)
        }
    }
}

function  draw() {
    time += step
    nPoint = {
        x: noise(time) * window.innerWidth,
        y: noise(time + 2000) * window.innerHeight,
    }
    nPoint2 = {
        x: noise(time - 10) * window.innerWidth,
        y: noise(time - 10 + 2000) * window.innerHeight,
    }
    background(51)
    // computeGrid(mouseX, mouseY, mouseIsPressed)
    computeGrid(nPoint.x, nPoint.y, true)
    computeGrid(nPoint2.x, nPoint2.y, true)
    drawGrid()
}