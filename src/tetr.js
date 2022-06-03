// Setup
import { blocks } from './blocks.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


var grid = [];
for (var i = 0; i < 20; i++) {
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

class GhostMino {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x + 2, this.y + 2, 36, 4);
		ctx.fillRect(this.x + 2, this.y + 34, 36, 4);
		ctx.fillRect(this.x + 2, this.y + 2, 4, 36);
		ctx.fillRect(this.x + 34, this.y + 2, 4, 36);
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
		
		var ghost_y = current_y;

		while (validPlace(current_shape.rot(current_rot), current_x, ghost_y + 1)){
			ghost_y++;
		}

		for (var i = 0; i < polysize; i++) {
			for (var j = 0; j < polysize; j++) {
				if (current_shape.rot(current_rot)[i][j] == 0) { continue; }
				var gmino = new GhostMino((current_x + j) * 40, (ghost_y + i) * 40, color(current_shape.rot(current_rot)[i][j]))
				gmino.draw();
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
	clearLines();
}

function clearLines() {
	for(var i = 0; i < 20; i++) {
		var pieces_in_this_line_in_particular = 0; // also known as PITLIP
		for(var y = 0; y < 10; y++) {
			if(grid[i][y] != 0) {
				pieces_in_this_line_in_particular++;
			}
		}
		console.log(pieces_in_this_line_in_particular);
		if(pieces_in_this_line_in_particular == 10) {
			for (var rows = i; rows > 0; rows--) {
				grid[rows] = [...grid[rows-1]];
				lines_cleared++;
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
var bag = [...listofMinos];
var nexts = [];
var hold = null;
var held = false;
var current_shape;
var current_y;
// positive y is down
var current_x;
// positive x is right
var current_rot;
// positive rot is clockwise
var alive = true;
var lines_cleared = 0;
resetMinos();

addEventListener("keydown", press);

function press(e) {
	// resetting here if we ever add it
	
	if(!alive) {
		return;
	}
	
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
	if (e.key == " ") {
		while (validPlace(current_shape.rot(current_rot), current_x, current_y + 1)){
			current_y++;
		}
		addMinos(current_shape.rot(current_rot), current_x, current_y);
		held = false;
		resetMinos();
	}
	if (e.key == "c") {
		// hold piece
		// if empty: put current into hold and get a new block
		// if full: swap current and held
		
		if (!held){
			if (hold == null) {
				held = true;
				hold = current_shape;
				resetMinos();
			}
			else {
				held = true;
				var temp = hold;
				hold = current_shape;
				current_shape = temp;
				current_y = 0;
				current_x = 4;
				current_rot = 0;
			}
		}
	}
	display();
}



var frames_per_down = 50; // reset to this value
var frames_until_down = frames_per_down; // decrease this value
var frames_to_lock = 50;
var frames_until_lock = frames_to_lock;

var loop = setInterval(gameloop, 20);
function gameloop() {
	if(!validPlace(current_shape.rot(current_rot), current_x, current_y + 1)) {
		frames_until_lock--;
	}
	// moves the pieces down automatically
	
	if (true){
		
	}
	frames_until_down--;
	if (frames_until_down < 0) {
		frames_until_down = frames_per_down
		if (validPlace(current_shape.rot(current_rot), current_x, current_y + 1)) {
			current_y++;
		}
		else {
			if(frames_until_lock < 0) { 
				addMinos(current_shape.rot(current_rot), current_x, current_y);
				held = false;
				resetMinos();
			}
		}
	}
	display();
}

function chooseStartingBag() {
	var unused = [...listofMinos];
	for(var i = 0; i < listofMinos.length; i++) {
		var num = randInt(0, bag.length - 1);
		nexts.push(bag.splice(num, 1));
	}
}

function chooseMinos() {
	// choose one mino to use
	// refill when empty
	if (bag.length == 0) {
		bag = [...listofMinos];
	}
	var num = randInt(0, bag.length - 1);
	nexts.push(bag.splice(num, 1));
	var used = nexts.splice(0, 1);
	return used;
}

function resetMinos() {
	frames_until_lock = frames_to_lock;
	var shfasjkdfhdkf = chooseMinos();
	current_shape = blocks[shfasjkdfhdkf];
	current_y = 0;
	current_x = 3;
	if(shfasjkdfhdkf == "o") {
		current_x++;
	}
	current_rot = 0;
	if (!validPlace(current_shape.rot(current_rot), current_x, current_y)) {
		alive = false;
		clearInterval(loop);
		current_y = -10;
	}
}
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
