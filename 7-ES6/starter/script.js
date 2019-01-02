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



///////////////////////////
//Lecture: Arrow Functions

const years=[1990,1965,1982,1937];

//ES5
var ages5=years.map(function(el){
return 2016-el;
});

console.log(ages5);

//ES6 
let ages6=years.map(el => 2016-el);
console.log(ages6);

ages6=years.map((el,index)=> `Age element ${index+1}: ${2016 -el}.` );
console.log(ages6);

ages6=years.map((el,index)=>{
const now=new Date().getFullYear();
const age=now-el;
return `Age element ${index+1}: ${age}.` 
});

console.log(ages6);

///////////////////////////
//Lecture: Arrow Functions 2

//ES5

var box5={
    color:'green',
    position:1,
    clickMe:function(){
      var self=this; //if we use this instead of slef it will be undifined
      document.querySelector('.green').addEventListener('click',function(){
          var str='this is box number '+self.position+' and it is '+self.color; 
          alert(str);
    });
    }
}

//box5.clickMe();

//ES6

const box6={
    color:'green',
    position:1,
    clickMe:function(){
      document.querySelector('.green').addEventListener('click',()=>{
          var str='this is box number '+this.position+' and it is '+this.color; 
          alert(str);
    });
    }
}

//box6.clickMe();

/* const box66={ //this one will one work because of click me has arrow
    color:'green',
    position:1,
    clickMe:()=>{
      document.querySelector('.green').addEventListener('click',()=>{
          var str='this is box number '+this.position+' and it is '+this.color; 
          alert(str);
    });
    }
}

box66.clickMe(); */


function Person(name){
    this.name=name;
}

//ES5
Person.prototype.myFriends5=function(fiends){
    var arr=friends.map(function(el)
    {
    return this.name+' is friends with '+el;   
    }.bind(this));  //we add bind(this) to point this to this function
    console.log(arr);
}
var friends=['Bob','Jane','Mark'];
new Person('John').myFriends5(friends);


//ES6

Person.prototype.myFriends6=function(fiends){
    var arr=friends.map(el=>
       `${this.name} is friends with ${el} `);
 
    console.log(arr);
}
new Person('Mike').myFriends6(friends);



///////////////////////////
//Lecture: Destructuring


//ES5 

var john=['John',26];
//var name=john[0];
//var age=john[1];


//ES6
const[name,age]=['John',26];
//console.log(name);
//console.log(age);

const obj={
    firstName:'John',
    LastName:'Smith'
};

//const {firstName,lastName}=obj;
//console.log(firstName);
//console.log(lastName);
//or
/* const {firstName:a,lastName:b}=obj;
console.log(a);
console.log(b); */

function calcAgeRetirement(year){
    const age=new Date().getFullYear()-year;
    return [age,65-age];
}
const [age2,retirement]=calcAgeRetirement(1984);
console.log(age2);
console.log(retirement);


///////////////////////////
//Lecture: Arrays
 const boxes=document.querySelectorAll('.box');

 //ES5   change all background color to blue
  var boxesArr5=Array.prototype.slice.call(boxes);
 boxesArr5.forEach(function(cur){
cur.style.backgroundColor='dodgerblue';
 }); 

//ES6
const boxesArr6= Array.from(boxes);
Array.from(boxes).forEach(cur =>{
    cur.style.backgroundColor='dodgerblue';
});

//ES5
// for(var i=0;i<boxesArr5.length;i++){
//     if(boxesArr5[i].className==='box blue'){
//         continue;
//     }
//     boxesArr5[i].textContent='I changed to blue'
// }

//ES6
for(const cur of boxesArr6){
    if(cur.className.includes('blue')){
        continue;
    }
    cur.textContent='i changed to blue';

}


//ES5

var ages=[12,17,8,21,14,11];
var full=ages.map(function(cur){
    return cur>=18;
});
console.log(full);

console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

//ES6
console.log(ages.findIndex(cur => cur>=18));
console.log(ages.find(cur=> cur >=18));




