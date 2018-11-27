/////////////////////////////////////
// Lecture: Hoisting//hositing in general in the starting, variables are set undifined
//functions not ,we can call it even the function is after

/*
// functions
calculateAge(1965);

function calculateAge(year) {
    console.log(2016 - year);
}

// retirement(1956); will not complite, because it is before the function
var retirement = function(year) {
    console.log(65 - (2016 - year));
}


// variables

console.log(age); //will not compile because called before declare
var age = 23;

function foo() {
    console.log(age); //this age will be undifined 
    var age = 65;
    console.log(age);
}
foo();
console.log(age);
*///output will be 65 then 23, because 65 execueted in global execution



/////////////////////////////////////
// Lecture: Scoping

/*
// First scoping example
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}


// Example to show the differece between execution stack and scope chain
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    //console.log(c);
    console.log(a+d);
}
*/



/////////////////////////////////////
// Lecture: The this keyword  ''this'' is only assigned a value when the object calls a method, called in object or method
/*
//console.log(this); will call the windows object global object

calculateAge(1985);

function calculateAge(year) {
    console.log(2016 - year);
    console.log(this); will call the windows object global object
}

var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function() {
        console.log(this); this will return here the john object, called from object variable
        console.log(2016 - this.yearOfBirth);
        
        function innerFunction() {
            console.log(this); // will call the windows object global object
        }
        innerFunction();
    }
}

john.calculateAge();

var mike = {
    name: 'Mike',
    yearOfBirth: 1984
};


mike.calculateAge = john.calculateAge; // here is method borrowing, add the calculate age method from john to mike 
mike.calculateAge(); // whene we print this here, it will call mike object
*/
