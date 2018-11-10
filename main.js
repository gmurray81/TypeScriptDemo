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

