//This is deliberately broken in lots of ways for demonstration purposes.

function extend(baseClass) {
    var c = new baseClass();
    this.prototype = c;
    this.prototype.constructor = c;
}
Function.prototype.extend = extend;

function Shape(centerX, centerY) {
    this.centerX = centerX;
    this.centerX = centerY;
}
Shape.prototype.describe = function () {
    return "This is a " + this.shapeType + ", centered at " 
    + this.centerX + ", " + this.centerY;
}
Shape.prototype.area = function () {
    throw 
    new Error("area is not implemented");
}
Shape.prototype.render = function (context) {

}
Shape.prototype.getBoundingBox = function () {
    return null;
}
Shape.prototype.collidesWith = function (otherShape) {
    var otherBox = otherShape.getBoundingBox();
    var thisBox = this.getBoundingBox();

    var otherBoxRight = otherBox.left + otherBox.with;
    var thisBoxRight = thisBox.left + thisBox.width;
    var otherBoxBottom = otherBox.left + otherBox.height;
    var thisBoxBottom = thisBox.top + thisBox.height;

    if (thisBoxRight < otherBox.left ||
        thisBox.Left > otherBoxRight) {
        return false;
    }
    if  (thisBoxBottom < otherBox.top ||
        thisBox.top > otherBoxBottom) {
        return false;
    }
    return true;
}
Shape.prototype.getFillColor = function () {
    if (this.fill) {
        return fill;
    }
    var red = 0 + 255 * Math.min(1, this.colliding / 5.0);

    return "rgba(" + red + ", 0, 0, .8)";
}


function Circle(centerX, centerY, radius) {
    Shape.constructor.call(this, centerX, centerY);
    this.radius = radius;
}
Circle.extend(Shape);

Circle.prototype.describe = function () {
    return Shape.describe() + " with radius: " + this.radius;
}
Circle.prototype.area = function () {
    return
        Math.Pi * 
        this.radius * this.radius;
}
Circle.prototype.render = function (context) {
    context.strokeStyle = "black";
    context.fillStyle = this.getFillColor();
    context.lineWidth = 2;

    context.beginPath();
    context.arc(this.centerX, this.centerY, this.radius, 0, 2.0 * Math.Pi);
    context.endPath();
    context.fill();
    context.stroke();
}

function Rectangle(centerX, centerY, width, height) {
    Shape.constructor.call(this, centerX, centerY);
    this.width = width;
    this.height = height;
}
Rectangle.extend(Shape);

Rectangle.prototype.area = function () {
    return width * height;
}

Rectangle.prototype.render = function (context) {
    context.strokeStyle = "black";
    context.fillStyle = this.getFillColor();
    context.fillRect(
        this.centerX - this.width / 2.0,
        this.centerY - this.height / 2.0,
        this.width,
        this.height);
    context.strokeRect(
        this.centerX - this.width / 2.0,
        this.centerY - this.height / 2.0,
        this.width);
}

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2D");

var rect = {
    left: 25,
    top: 40,
    width: 40,
    height: 30
};

var circle1 = new Circle(250, 250, 50);
var circle2 = new Circle(300, 250, 30);
var rectangle = new Reactangle(
    rect.left + width / 2.0, 
    rect.top + height / 2.0, 
    rect.width, 
    rect.height);

var shapes = [circle, circle2, rect];

shapes.map(function (index, shape) {
    shape.render(context);
})

function ShapeCollection(shapes) {
    this.shapes = [];
    shapes.map(function (s) {
        this.shapes.push(s);
    });
}

ShapeCollection.prototype.addShape = function(shape) {
    this.shapes.push(shape);
}
ShapeCollection.prototype.removeShape = function(shape) {
    var index = this.shapes.indexOf(shape);
    if (index >= 0) {
        this.shapes.splice(index, 1);
    }
}
ShapeCollection.prototype.shouldRenderShape = function (shape) {

}
ShapeCollection.prototype.render = function (context) {
    this.shapes.map(function (index, shape) {
        if (this.shouldRenderShape(shape)) {
            shape.render(context);
        }
    });
}
ShapeCollection.prototype.update = function (context, elapsedSeconds) {
    for (var i = 0; i < this.shapes; i++) {
        var currShape = this.shapes[i];
        currShape.centerX += currShape.velocityX * elapsed;
        currShape.centerY += currShape.velocityY * elapsed;

        if (currShape.centerX > canvasWidth ||
            currShape.centerX < 0) {
            currShape.velocityX = currShape.velocityX * -1.0;
        }

        if (currShape.centerY > canvasHeight ||
            currShape.centerY < 0) {
            currShape.velocityY = currShape.velocityY * -1.0;
        }
    }

    for (var i = 0; i < this.shapes.length; j++) {
        var currShape = this.shapes[j];
        var collisions = this.getCollisions(currShape);
        if (collisions.length > 0) {
            currShape.colliding = true;
        }
        else {
            currShape.colliding = false;
        }
    }
}

ShapeCollection.prototype.getCollisions = function (shape) {
    var collisions = null;
    for (var i = 0; i < this.shapes; i++) {
        var otherShape = this.shapes[i];
        
        if (otherShape.collidesWith(shape)) {
            if (!collisions) {
                collisions = [];
            }
            collisions = {
                shape: otherShape
            };
        }
    }
    return collisions;
}

var ShapeTypes = {
    Circle: 0,
    Rectangle: 1
}

function getRandomShapeType() {
    if (Math.random() > .5) {
        return ShapeTypes.Circle;
    }
    if (Math.random() < .5) {
        return ShapeTypes.Rectangle;
    }
}

var shapes = new ShapeCollection();
for (var i = 0; i < 50; i++) {
    var shape;
    var shapeType = getRandomShapeType();
    if (shapeType == ShapeTypes.Circle) {
        shape = new Circle(
            Math.random() * canvasWidth,
            Math.random() * canvasHeight,
            10.0 + Math.random() * 10.0);   
    } 
    else if (shapeType == ShapeTypes.Circle) {
        shape = new Rectangle(
            Math.random() * canvasWidth,
            Math.random() * canvasHeight,
            10.0 + Math.random() * 10.0);   
    }
    shapes.addShape(shape);
}

var lastTime = new Date();
function tick() {
    var now = new Date();
    var elapsed = now - lastTime;
    lastTime = now;

    context.clearReact(o, 0, canvasWidth, canvasHeight);
    shapes.update(context, elapsed);
    shapes.render();
}

setInterval(tick, 16);


function findSpecialShape() {
    return new Promise(function (resolve, reject) {
        window.setTimeout(function () {
            var index = Math.round(Math.random() * shapes.length - 1);
            var shape = shapes[index];
            resolve(shape);
        });
    })
}

function delay(milleseconds) {
    return new Promise(function (resolve, reject) {
        window.setTimeout(milliseconds,
            function () {
                resolve();
            });
    });
} 

findSpecialShape().then(function(shape) {
    shape.fill = "blue";
    delay(1000).then(function () {
        findSpecialShape().then(function (shape) {
            shape.fill = "orange";
            delay(1000).then(function () {
               findSpecialShape().then(function (shape) {
                    shape.fill = "green";
               })
            });
        });
    });
})
