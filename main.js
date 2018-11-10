//This is deliberately broken in lots of ways for demonstration purposes.

function extend(baseClass) {
    var c = new baseClass();
    this.prototype = c;
    this.prototype.constructor = c;
}
Function.prototype.extend = extend;

function Animal() {
    type = "Animal";
}
Animal.prototype.speak = function () {
    console.log(this.type + " speaks: ");
}
Animal.prototype.think = function (subject) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("thinking some.... about " + subject);

            setTimeout(function () {
                console.log("thought some more... about " + subjct);

                resolve("finished thinking about " + subject);
            }, this.secondThoughtsTime);
        }, this.thinkingTime);
    });
}
Animal.prototype.addChildren = function(children) {
    var Me = this.constructor;
    children.map(function (child) {
        this.chidren.push(new Me(this.noisiness + 1, child.name, child.age));
    });
}

function Cat(name, age, noisiness) {
    name = name;
    this.age = age;
    this.thinkingTime = 2000;
    this.noisiness = noisiness;
}

Cat.extend(Animal);

Cat.prototype.speak = function () {
    Animal.speak();
    for (var i = 0; i < noisiness; i++) {
        console.log("meow ");
    }
}

function Dog(name, age, noisiness) {
    this.name = name;
    this.age = age;
    this.thinkingTime = 500;
    noisiness = noisiness;
}

Dog.extend(Animal);

Dog.prototype.speak = function () {
    for (var i = 0; i < noisiness; i++) {
        console.log("bark ");
    }
}


var cat = new Cat();
var dog = new Dog(4);

cat.speak();
dog.speak();

cat.think();
dog.think();

cat.think().then(function (result) {
    console.log("cat " + result);

    dog.think().then(function () {
        console.log("dog " + result);

        Promise.all([dog.think(), cat.think()]).then(function (result) {
            console.log("animals " + result);
        })
    })
    .error(function () {
        console.log("dog had a problem thinking")
    });
})
.error(function () {
    console.log("cat had a problem thinking");
});


function Shape(centerX, centerY) {
    this.centerX = centerX;
    this.centerY = centerX;
}
Shape.prototype.describe = function () {
    console.log("This is a " + this.shapeType + ", centered at " 
    + this.centerX + ", " + this.centerY);
}
Shape.prototype.area = function () {
    throw 
    new Error("area is not implemented");
}
Shape.prototype.render = function (context) {

}

function Circle(centerX, centerY, radius) {
    Shape.constructor.call(this, centerX, centerY);
    this.radius = radius;
}
Circle.extend(Shape);

Circle.prototype.describe = function () {
    Shape.describe() + " with radius: " + this.radius;
}
Circle.prototype.area = function () {
    return
        Math.Pi * 
        this.radius * this.radius;
}
Circle.prototype.render = function (context) {
    context.strokeStyle = "green";
    context.fillStyle = "gray"
    context.lineWidth = 2;

    context.beginPath();
    context.arc(this.centerX, this.centerY, this.radius, 0, Math.Pi);
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
    context.strokeStyle = "teal";
    context.fillStyle = red;
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
