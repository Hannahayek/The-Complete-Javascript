//function constructor

// var Hanna={
//     name:'Hanna',
//     yearOfBirth:1984,
//     job:'Software'
// };

// var Person=function(name,yearOfBirth,job){
//     this.name=name;
//     this.yearOfBirth=yearOfBirth;
//     this.job=job;
   
// }
// //here we let the Person any person object inherit this method
// Person.prototype.calculateAge=function(){
//     console.log(2018-this.yearOfBirth);
// }

// Person.prototype.lastName='Smith';

// var hanna=new Person('Hanna',1980,'software');
// var jane=new Person('jane',1996,'designer');
// var mark=new Person('mark',1948,'retired');
// hanna.calculateAge();
// jane.calculateAge();
// mark.calculateAge();

// console.log(jane.lastName);


//Object.create ,works as inheritance but in different way

/* var personProto={
    calculateAge:function(){
        console.log(2018-this.yearOfBirth);
    }
};

var hanna=Object.create(personProto);

hanna.name='hanna';
hanna.yearOfBirth=1984;
hanna.job='software';

var jane=Object.create(personProto,
{
    name:{value:'jane'},
    yearOfBirth:{value:1996},
    job:{value:'designer'}

});
 */

//primitives vs objects

/* //primitives
var a=23;
var b=a;
a=46;
console.log(a);
console.log(b);


//objects

var obj1={
    name:'Hanna',
    age:34
};
var obj2=obj1;
obj1.age=30;
console.log(obj1.age);
console.log(obj2.age);


//functions

var age=27;
var obj={
    name:'Jonas',
    city:'Libson'
};


function change(a,b){
    a=30;
    b.city='San Francisco';
}

change(age,obj);
console.log(age); //age not changed
console.log(obj.city); */

/////////////////////////////
// Lecture: Passing functions as arguments
/* var years=[1990,1965,1937,2005,1998];

function arrayCalc(arr,fn){
var arrRes=[];
for(var i=0;i<arr.length;i++)
{
    arrRes.push(fn(arr[i]))
}
return arrRes;
}
function calculateAge(el) {
    return 2018-el;
    
}
function isFullAge(el) {
    return el >= 18;
}

function maxHearRate(el){
    if(el>=18 &&el <= 81){
        return Math.round(206.9-(0.67*el));
    }else{
       return -1;
    }
    
}

var ages=arrayCalc(years,calculateAge);//function without () call back function
var fullAges = arrayCalc(ages, isFullAge);
var rates=arrayCalc(ages,maxHearRate);
console.log(ages);
console.log(fullAges);
console.log(rates); */

/////////////////////////////
// Lecture: function returning Functions

/* function interviewQuestion(job){

    if(job==='designer'){
        return function(name){
            console.log(name+',can you please explain what ux design is?');
        }
    }else if(job==='teacher'){ 
            return function(name){
                console.log('what subject you teach, '+name+'?');
            }
            }else {
                return function(name){
                    console.log('Hello '+name +'what do you do');
                }
            }
        }
    var teacherQuestion=interviewQuestion('teacher');
    teacherQuestion('hanna');

    var designerQuestion=interviewQuestion('designer');
    designerQuestion('John');
    designerQuestion('jane');
    designerQuestion('mark');

    //or we call function to return a function in below way
    interviewQuestion('teacher')('mark'); */


    /////////////////////////
      //lecture:IIFE
     //  function game(){
         // var score=Math.random()*10;
          //console.log(score>=5);
      //}
     // game(); 
       //can be made as below IIFE function to hide variable from outside
     // (function(){
       // var score=Math.random()*10;
       // console.log(score>=5);
      //})();

      //can work with parameters
      //(function(goodluck){
        //var score=Math.random()*10;
        //console.log(score>=5-goodluck);
      //})(5);
      //console.log(score>=5); //will be undifined 
      //*/


      ///////////////////////////
          //lecture:Closues

    /*       function retirement(retirementAge){
            var a='years left until retirement.';  
            return function(yearOfBirth){
                  var age=2018-yearOfBirth;
                  console.log((retirementAge-age)+a);
              }
          }
          var retirementUS=retirement(66);
          retirementUS(1984);
         // retirement(66)(1984);
         var retirementGermany=retirement(65);
         var retirementIceLand=retirement(67);

         retirementGermany(1984);
         retirementIceLand(1984); */
//lecture Functions returning functions ,but using closues

function interviewQuestion(job){
      
   
        return function(name){

            if(job==='designer'){
            console.log(name+',can you please explain what ux design is?');
        }
        else if(job==='teacher'){ 
            console.log('what subject you teach, '+name+'?');
        }
        else { console.log('Hello '+name +'what do you do');
        }
    }
}

        var teacherQuestion=interviewQuestion('teacher');
            teacherQuestion('hanna');
            var designerQuestion=interviewQuestion('designer');
            designerQuestion('jane');
