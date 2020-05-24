


var cnv;
var img;
var imgHeight= w = 50;
var imgWidth = h = 50;
var pic = [];
var aa = 0;

var s = [];
var mass = 60.0;//30
var gravity = 0.0;

// function preload() {
// 	// img = loadImage("assets/yuhanwu.jpg");  // Load the image
// }

function setup() {
 cnv=createCanvas(400, 400);
 cnv.position(100,100)
	loadImage("assets/yuhanwu.jpg", function(img) {
		img.loadPixels();
		for (var x = 0; x < imgWidth; x++) {
			for (var y = 0; y < imgHeight; y++) {
				var loc = y * imgWidth + x; // calculate X, Y pixel number into Pixel Array
				var bright = img.pixels[loc * 4]; // brightness 
				if (y % 2 == 0) { // make arrangement of pixel differently
					pic[loc] = createVector(x + 0.5, y, bright); // store image pixel data into 3 dimensional Vectors
				} else {
					pic[loc] = createVector(x, y, bright);
				}
			}
		}

		for (var i = 0; i < w; i++) {
			s[i] = [];
			for (var j = 0; j < h; j++) {
				var n = j * imgWidth + i;
				var b = map(pic[n].z, 0, 225, 6.0, 0); // map the brightness into ellipse size
				var x2 = map(pic[n].x, 0, imgWidth, 0, width);
				var y2 = map(pic[n].y, 0, imgHeight, 0, height);
				s[i][j] = new Spring2D(x2, y2, mass, gravity, b); // apply into Spring 2D
			}
		}
	}); // end with the call back
}

function draw() {
	background(255);
	if (s[49] != null) { // make sure the image is already loaded
		for (var i = 1; i < w; i++) {
			for (var j = 1; j < h; j++) {
				s[i][j].update();
				s[i][j].show();
			}
		}

		if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
			for (var i = 1; i < w; i++) {
				for (var j = 1; j < h; j++) {
					s[i][j].attraction(); // when mouse is in the window, apply attraction

				}
			}
		}
	}
}
