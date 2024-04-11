let sound;
let fft;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Loop sound file
  sound.loop();
  // Create a new instance of p5.FFT() object
  fft = new p5.FFT();

  noStroke();
}

function draw() {
  background(0, 30);

  // waveform() method returns an array of amplitude values (between -1 and 1) that represent a snapshot of amplitude readings in a single buffer
  let waveform = fft.waveform();

  // Loop through waveform array to draw a circle per time segment
  for (let i = 0; i < waveform.length; i++) {
    // Map x location using index number of waveform array
    let x = map(i, 0, waveform.length, 0, width);
    // May y location using the amplitude value for the specific time segment
    let y = map(waveform[i], -1, 1, height, 0);

    circle(x, y, 3);
  }
  let mic;
  let fft;
  var smoothing = 0.935;

  // Load sound file before setup() function runs
  // function preload(){
  //   // Load the sound file saved as "starling.mp3"
  //   // sound = loadSound('starling.mp3');

  // }

  function setup() {
    createCanvas(windowWidth, windowHeight);

    // Loop sound file
    // sound.loop();
    mic = new p5.AudioIn();

    mic.start();

    // Create a new instance of p5.FFT() object

    fft = new p5.FFT(smoothing, 0);

    // button = createButton("Full Screen");
    // button.mouseClicked(fullScreenIt);
    // button.size(100, 30);
    // button.position(225, 25);
    // button.style("font-size", "12px");

    // noStroke();
  }

  function draw() {
    background(0, 255);

    // waveform() method returns an array of amplitude values (between -1 and 1) that represent a snapshot of amplitude readings in a single buffer

    let waveform = fft.waveform();
    mic.amp(0.5);
    fft.smooth(0.1);
    source = fft.setInput(mic);

    let volume = mic.getLevel();
    let threshold = 0.03;
    let y = 0;

    noFill();
    beginShape();
    fft.getEnergy("bass");

    stroke(255, 255, 0);
    strokeWeight(4);

    for (let i = 0; i < waveform.length; i++) {
      let x = map(i, 0, waveform.length, 0, width * 5);
      if (volume > threshold) {
        y = map(waveform[i], -0.75, 0.75, 0, height);
      } else {
        y = map(0, -1, 1, 0, height);
      }
      vertex(x, y);
    }
    endShape();
  }

  function fullScreenIt() {
    let fs = fullscreen();
    fullscreen(!fs);
  }

  function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      let fs = fullscreen();
      fullscreen(!fs);
    }
  }

  /* full screening will change the size of the canvas */
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  /* prevents the mobile browser from processing some default
   * touch events, like swiping left for "back" or scrolling the page.
   */
  document.ontouchmove = function (event) {
    event.preventDefault();
  };
}
