var totalBerries = 0;

const berrybutton = document.getElementById("berrybutton");
const berrydiv = document.getElementById("berries");
const berrycount = document.getElementById("berrycount");
berrybutton.addEventListener("click", addBerry);


function addBerry() {
  const bery = document.createElement("img");
  randomberry = Math.random();
  if(randomberry < 0.95) {
    bery.setAttribute("src", "img/Strawberry.png");
  } else if(randomberry < 0.995) {
    bery.setAttribute("src", "img/Golden_Strawberry.png");
  } else {
    bery.setAttribute("src", "img/Moon_Berry.png");
  }
  bery.setAttribute("class", "isberry");
  bery.setAttribute("height", 20);
  berrydiv.appendChild(bery);
  totalBerries++;
  berrycount.innerText = totalBerries;
}

const pie = document.getElementById("pi");
pie.addEventListener("click", eatPie);

function eatPie() {
  pie.setAttribute("src", "https://cdn.discordapp.com/attachments/691726446917451847/951162723364929636/7476D5BF-3BB0-49BC-8EA6-D7103AB9A622.gif");
  setTimeout(function (){
  
    pie.setAttribute("style", "display:none");
              
  }, 1700);
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
