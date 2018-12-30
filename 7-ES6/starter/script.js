// Lecture: Let and const

//ES5
/* var name5='jane smith';
var age5=23;
name5='jane miller';
console.log(name5);

//ES6
const name6='jame smith';
let age6=23;
name6='jane miller';
console.log(name6);
 */
//ES5

function driverLicence5(passedTest){
    if(passedTest){
        var firstName='John';
        var yearOfBirth=1990;
        
    }
    console.log(firstName +','+'born in '+ yearOfBirth+',is now officially to drive a car');
   
}

driverLicence5(true);

//ES6

function driverLicence6(passedTest){
    let firstName;
    const yearOfBirth =1990;
    if(passedTest){
         firstName='John';
       
        
    }
    console.log(firstName +','+'born in '+ yearOfBirth+',is now officially to drive a car');
}

driverLicence6(true);

///////////////////////////
//Lecture: Blocks and IIFEs

//ES6
{
    const a=1;
    let b=2;
var c=3;
}

//console.log(a+b); // a b not accessable from outside
console.log(c); //can be accessesd 


//ES5


(function(){
      var c=3;
})();
//console.log(c); //not accessable from outside in ES5


//////////////////////////////
// Lecture:Strings


let firstName="hanna";
let lastName='hayek';
const yearOfBirth=1984;
function calcAge(year){
    return 2018-year;
}

//ES5
console.log('this is '+firstName+' '+lastName+' .'+'he was born in '+yearOfBirth+' today he is '+ calcAge(yearOfBirth)+ ' years old.');

//ES6

console.log(`this is ${firstName}
${lastName}. he was born in ${yearOfBirth} he is ${calcAge(yearOfBirth)}`);

const n=`${firstName} ${lastName}`;

console.log(n.startsWith('h'));
console.log(n.endsWith('ek'));
console.log(n.includes(' '));
console.log(n.includes('han'));
console.log(firstName.repeat(5));
console.log(`${firstName} `.repeat(5));
