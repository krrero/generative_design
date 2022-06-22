var Agent = function () {
  this.vector = myp5.createVector(
    myp5.random(myp5.width),
    myp5.random(myp5.height)
  );
  this.vectorOld = this.vector.copy();
  this.stepSize = myp5.random(1, 5);
  this.isOutside = false;
  this.angle;
};

Agent.prototype.update = function (strokeWidth) {
  this.vector.x += myp5.cos(this.angle) * this.stepSize;
  this.vector.y += myp5.sin(this.angle) * this.stepSize;
  this.isOutside =
    this.vector.x < 0 ||
    this.vector.x > myp5.width ||
    this.vector.y < 0 ||
    this.vector.y > myp5.height;
  if (this.isOutside) {
    this.vector.set(myp5.random(myp5.width), myp5.random(myp5.height));
    this.vectorOld = this.vector.copy();
  }
  myp5.strokeWeight(strokeWidth * this.stepSize);
  myp5.line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);
  this.vectorOld = this.vector.copy();
  this.isOutside = false;
};

Agent.prototype.update1 = function (noiseScale, noiseStrength, strokeWidth) {
  this.angle =
    myp5.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) *
    noiseStrength;
  this.update(strokeWidth);
};

Agent.prototype.update2 = function (noiseScale, noiseStrength, strokeWidth) {
  this.angle =
    myp5.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * 24;
  this.angle = (this.angle - myp5.floor(this.angle)) * noiseStrength;
  this.update(strokeWidth);
};

let colors = [
  {
    p: `rgba(130, 221, 153, .05)`,
    s: `rgba(190, 214, 196, .25)`,
  },
  {
    p: `rgba(77, 87, 80, .34)`,
    s: `rgba(190, 214, 196, .25)`,
  },
];

let figures = [
  {
    pointCount: 300,
    freqX: 3,
    freqY: 3,
    phi: 60,
    modFreqX: 2,
    modFreqY: 1,
    angle: 0,
    x: 0,
    y: 0,
    w: 0,
    oldX: 0,
    oldY: 0,
    rotationAngle: 0,
  },
];

let phiSpeed = 1;

let agents = [];
let agentCount = 4000;
var noiseScale = 1000;
var noiseStrength = 40;
var overlayAlpha = 10;
var agentAlpha = 90;
var strokeWidth = 2;

// TODO Move everything into an unique for loop
let sketch = function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);

    for (var i = 0; i < agentCount; i++) {
      agents[i] = new Agent();
    }
  };

  p.draw = function () {
    p.background(`rgba(0, 0, 0, 1)`);

    drawBackground();
    drawBasic(figures[0], 500, 400);
    // drawBasic(figures[1], 600, 400);
    // drawBasic(figures[2], 400, 400);
    // drawBasic(figures[3], 500, 400);
    // drawBasic(figures[4], 600, 400);
    // drawBasic(figures[5], 700, 400);
  };

  function drawBackground() {
    p.stroke(`rgba(190, 214, 196, .25)`);
    // for (var i = 0; i < agentCount; i++) {
    //   agents[i].update1(noiseScale, noiseStrength, strokeWidth);
    // }
    agents.map((agent) => {
      agent.update1(noiseScale, noiseStrength, strokeWidth);
    });
  }

  function drawBasic(figure, posX, posY) {
    p.strokeWeight(5);

    for (var i = 0; i <= figure.pointCount; i++) {
      figure.angle = p.map(i, 0, figure.pointCount, 0, p.TAU);
      figure.x =
        p.sin(figure.angle * figure.freqX + p.radians(figure.phi)) *
        p.cos(figure.angle * figure.modFreqX);
      figure.y =
        p.sin(figure.angle * figure.freqY) *
        p.cos(figure.angle * figure.modFreqY);
      figure.x *= 200;
      figure.y *= 200;

      p.push();
      p.translate(posX, posY);
      p.stroke(`rgba(130, 221, 153, .5)`);
      p.line(figure.oldX, figure.oldY, figure.x, figure.y);
      p.translate(figure.x, figure.y);
    //   p.stroke(`rgba(190, 214, 196, .05)`);
    //   p.rotate(p.radians(figure.rotationAngle));
    //   p.line(0, 0, 1000, 0);
      p.pop();

      figure.oldX = figure.x;
      figure.oldY = figure.y;
    }

    figure.phi += phiSpeed;
    figure.rotationAngle += 10;
  }

  p.keyPressed = function () {
    if (p.key == "1") {
      //   figures.forEach((figure) => {
      //     figure.freqX += 1;
      //   });
      noiseScale += 100;
    }
    if (p.key == "2") {
      //   figures.forEach((figure) => {
      //     figure.freqX -= 1;
      //   });

      noiseScale -= 100;
    }

    figures.forEach((figure) => {
      figure.freqX = p.max(figure.freqX, 1);
    });

    if (p.key == "3") {
      //   figures.forEach((figure) => {
      //     figure.freqY += 1;
      //   });

      noiseStrength += 10;
    }
    if (p.key == "4") {
      //   figures.forEach((figure) => {
      //     figure.freqY -= 1;
      //   });

      noiseStrength -= 10;
    }

    figures.forEach((figure) => {
      figure.freqY = p.max(figure.freqY, 1);
    });

    if (p.keyCode == p.LEFT_ARROW) {
      phiSpeed += 10;
    }
    if (p.keyCode == p.RIGHT_ARROW) {
      phiSpeed -= 10;
    }
  };
};

var myp5 = new p5(sketch);
