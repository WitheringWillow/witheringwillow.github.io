import { blocks } from './blocks.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const darktheme = document.getElementById("dark");
const bg = document.getElementById("main");

var current_piece = blocks["t"][1];
console.log(current_piece);


var grid = [];
for(var i = 0 ; i < 20; i++) {
  grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}
grid[19][1] = 1;

class Mino {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw() {
    // ctx.fillStyle = 'rgb(0, 0, 0)';
    // ctx.fillRect(this.x+1, this.y+1, 38, 38);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x+10, this.y+2, 20, 36);
    ctx.fillRect(this.x+2, this.y+10, 36, 20);
  }

  godown() {
    this.y += 40;
  }
}

function display() {
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
    case 0:
      return 'rgb(128, 128, 128)';
    case 1:
      return 'rgb(255, 0, 0)';
    default:
      return 'rgb(0, 0, 0)';
  }
}

addEventListener("keydown", press);

function press(e) {
  console.log(e);
  if(e.key == "ArrowDown") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    display();
  }
}

darktheme.addEventListener("click", switchTheme);
var active = "Light";

function switchTheme() {
  if(active == "Light") {
    bg.classList.add("dark");
    active = "Dark";
    darktheme.innerText = "Light Mode"
  } else {
    bg.classList.remove("dark");
    active = "Light";
    darktheme.innerText = "Dark Mode"

  }
}

var frames_per_down = 50;
var frames_until_down = 50;

setInterval(gameloop,20);

function gameloop() {

}

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


