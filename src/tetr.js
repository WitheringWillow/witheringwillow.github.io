// Setup
import { blocks } from './blocks.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


var grid = [];
for(var i = 0 ; i < 20; i++) {
  grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

// Visuals
class Mino {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x+2, this.y+2, 36, 36);
  }
}

function display() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(var row = 0; row < 20; row++) {
    for(var col = 0; col < 10; col++) {
      var curmino = new Mino(col*40, row*40, color(grid[row][col]));
      curmino.draw();
    }
  }
}

display();

function color(x) {
  switch(x) {
    case 0: // None
      return 'rgb(128, 128, 128)';
    case 1: // Z
      return 'rgb(255, 0, 0)';
    case 2: // S
      return 'rgb(0, 255, 0)';
    case 3: // L
      return 'rgb(255, 128, 0)';
    case 4: // J
      return 'rgb(0, 64, 255)';
    case 5: // T
      return 'rgb(192, 0, 255)';
    case 6: // I
      return 'rgb(0, 192, 256)';
    case 7: // O
      return 'rgb(256, 224, 0)';
    default:
      return 'rgb(64, 64, 64)';
  }
}

// Helper functions 

function addMinos(shape, x, y) {
  var polysize = shape.length;
  //check if the position is valid
  for(var i = 0; i < polysize; i++) {
    for(var j = 0; j < polysize; j++) {
      var checkx = i + x;
      var checky = j + y;
      if(shape[i][j] != 0 && grid[checkx][checky] != 0) {
        // console.log(i + ", " + j + "is invalid");
        return;
      }
    }
  }
  //place the piece
  for(var i = 0; i < polysize; i++) {
    for(var j = 0; j < polysize; j++) {
      var checkx = i + x;
      var checky = j + y;
      if(shape[i][j] != 0) {
        grid[checkx][checky] = shape[i][j];
      }
    }
  }
}

// Gameplay
addEventListener("keydown", press);

function press(e) {
  console.log(e);
  if(e.key == "ArrowDown") {
    // move active block downward
  }
  if(e.key == "ArrowLeft") {
    // move active block left
  }
  if(e.key == "ArrowRight") {
    // move active block right
  }
  if(e.key == "ArrowUp") {
    // rotate active block clockwise
  }
  if(e.key == "KeyZ") {
    // rotate active block counterclockwise
  }


  if(e.key == "Space") {
    // drop the block onto the floor automatically
  }

  display();
}



var frames_per_down = 50;
var frames_until_down = 50;

setInterval(gameloop,20);

function gameloop() {

}








// Favicon

var favicon_images = [
  'img/gif/frame_0_delay-0.04s.gif',
  'img/gif/frame_1_delay-0.04s.gif',
  'img/gif/frame_2_delay-0.04s.gif',
  'img/gif/frame_3_delay-0.04s.gif',
  'img/gif/frame_4_delay-0.04s.gif',
  'img/gif/frame_5_delay-0.04s.gif',
],
image_counter = 0; // To keep track of the current image

setInterval(function() {
// remove current favicon
if(document.querySelector("link[rel='icon']") !== null)
document.querySelector("link[rel='icon']").remove();
if(document.querySelector("link[rel='shortcut icon']") !== null)
document.querySelector("link[rel='shortcut icon']").remove();

// add new favicon image
document.querySelector("head").insertAdjacentHTML('beforeend', '<link rel="icon" href="' + favicon_images[image_counter] + '" type="image/gif">');

// If last image then goto first image
// Else go to next image    
if(image_counter == favicon_images.length -1)
image_counter = 0;
else
image_counter++;
}, 100);
