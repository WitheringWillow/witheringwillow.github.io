// Setup
import { blocks } from './blocks.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


var grid = [];
for (var i = 0; i < 20; i++) {
	grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}
grid[10][5] = 1

// Visuals
class Mino {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x + 2, this.y + 2, 36, 36);
	}
}

class ActiveMino {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, 40, 40);
	}
}

function display() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);;
	for (var row = 0; row < 20; row++) {
		for (var col = 0; col < 10; col++) {
			var curmino = new Mino(col * 40, row * 40, color(grid[row][col]));
			curmino.draw();
		}
	}
	if (current_rot != undefined) {
		var polysize = current_shape.rot(0).length;
		for (var i = 0; i < polysize; i++) {
			for (var j = 0; j < polysize; j++) {
				if (current_shape.rot(current_rot)[i][j] == 0) { continue; }
				var curmino = new ActiveMino((current_x + j) * 40, (current_y + i) * 40, color(current_shape.rot(current_rot)[i][j]))
				curmino.draw();
			}
		}
	}
}

function color(x) {
	switch (x) {
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

function validPlace(shape, x, y) {
	var polysize = shape.length;
	for (var i = 0; i < polysize; i++) {
		for (var j = 0; j < polysize; j++) {
			var checky = i + x;
			var checkx = j + y;
			if((shape[j][i] != 0)) {
				if(checky < 0 || checky > 9 || checkx > 19) {
					return false;
				}
				if (grid[checkx][checky] != 0) {
					return false;
				}
			}
		}
	}
	return true;
}

function addMinos(shape, x, y) {
	var polysize = shape.length;
	if (!validPlace(shape, x, y)) { return; }
	for (var i = 0; i < polysize; i++) {
		for (var j = 0; j < polysize; j++) {
			var checkx = i + x;
			var checky = j + y;
			if (shape[j][i] != 0) {
				grid[checky][checkx] = shape[j][i];
			}
		}
	}
}

function randInt(min, max) {
	var max_delta = max - min
	var rand = Math.floor(Math.random() * (max_delta + 1));
	return (rand + min);
}
// Gameplay
var listofMinos = ['z', 's', 'l', 'j', 't', 'i', 'o'];
var bag = listofMinos;

var current_shape;
var current_y;
// positive y is down
var current_x;
// positive x is right
var current_rot;
// positive rot is clockwise
resetMinos();

addEventListener("keydown", press);

function press(e) {
	if (e.key == "ArrowDown") {
		if (!validPlace(current_shape.rot(current_rot), current_x, current_y + 1)) {
			return
		}
		current_y++;
		frames_until_down = 50;
	}
	if (e.key == "ArrowLeft") {
		if (!validPlace(current_shape.rot(current_rot), current_x - 1, current_y)) {
			return
		}
		current_x--;
	}
	if (e.key == "ArrowRight") {
		if (!validPlace(current_shape.rot(current_rot), current_x + 1, current_y)) {
			return
		}
		current_x++;
	}
	if (e.key == "ArrowUp") {
		if (!validPlace(current_shape.rot(current_rot + 1), current_x, current_y)) {
			return
		}
		current_rot++;
	}
	if (e.key == "z") {
		if (!validPlace(current_shape.rot(current_rot - 1), current_x, current_y)) {
			return
		}
		current_rot--;
	}
	if (e.key == "a") {
		if (!validPlace(current_shape.rot(current_rot + 2), current_x, current_y)) {
			return
		}
		current_rot += 2;
	}
	if (e.key == "Space") {
		// hard drop
	}
	if (e.key == "KeyC") {
		// hold piece
	}
	if(e.key == "b") {
		if (validPlace(current_shape.rot(current_rot), current_x, current_y)) {
			return
		}
	}
	display();
}



var frames_per_down = 50; // reset to this value
var frames_until_down = 50; // decrease this value

setInterval(gameloop, 20);
function gameloop() {
	// moves the pieces down automatically
	frames_until_down--;
	if (frames_until_down < 0) {
		frames_until_down = frames_per_down
		if (validPlace(current_shape.rot(current_rot), current_x, current_y + 1)) {
			current_y++;
		}
		else {
			addMinos(current_shape.rot(current_rot), current_x, current_y);
			resetMinos();
		}
	}
	display();
}



function chooseMinos() {
	// choose one mino to use
	// refill when empty
	var num = randInt(0, bag.length - 1);
	var used = bag.splice(num, 1);
	if (used.length == 0) {
		bag = listofMinos;
	}
	return used;
}

function resetMinos() {
	current_shape = blocks[chooseMinos()];
	current_y = 0;
	current_x = 4;
	current_rot = 0;
	// addMinos(current_shape.rot(current_rot), current_y, current_x);
}
resetMinos();
display();
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

setInterval(function () {
	// remove current favicon
	if (document.querySelector("link[rel='icon']") !== null)
		document.querySelector("link[rel='icon']").remove();
	if (document.querySelector("link[rel='shortcut icon']") !== null)
		document.querySelector("link[rel='shortcut icon']").remove();

	// add new favicon image
	document.querySelector("head").insertAdjacentHTML('beforeend', '<link rel="icon" href="' + favicon_images[image_counter] + '" type="image/gif">');

	// If last image then goto first image
	// Else go to next image    
	if (image_counter == favicon_images.length - 1)
		image_counter = 0;
	else
		image_counter++;
}, 100);
