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

/* function interviewQuestion(job){
      
   
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
            designerQuestion('jane'); */


            ////////////////////
             /// Lecture:Bind,Call and apply

          /*    var john={
             name:'John',
             age:26,
             job:'teacher',
             presentation:function(style,
                timeOfDay){
                    if(style==='formal'){
                        console.log('Good '+timeOfDay +', Ladies and gentlemen! I\'m '+ this.name+',I\'m a '+ this.age+' years old.');

                    }else if(style==='friendly'){
                        console.log('Hey ! what\'s up? I\'m '+ this.name+', I\'m a '+ this.age+' years old.'+'have a nice '+ timeOfDay
                        );
                    }
                }
             }


             var emily={
                 name:'Emily',
                 age:35,
                 job:'designer'
             }
             john.presentation('formal','morning');
              
             //method borrowing
             //to call function for emily 
             john.presentation.call(emily,'friendly','afternoon');

             //apply method  //but will fail here, not expecting array
            // john.presentation.apply(emily,['friendly','afternoon']);
         

            //Bind method. create a function to store it

            var johnFriendly=john.presentation.bind(john,'friendly');

            johnFriendly('morning');
            johnFriendly('night');

            var emilyFormal=john.presentation.bind(emily,'formal');
          emilyFormal('afternoon');



          
var years=[1990,1965,1937,2005,1998];

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
function isFullAge(limit,el) {
    return el >= limit;
}

var ages=arrayCalc(years,calculateAge);
//will pass 20 in isFullAge as preset argument
var fullJapan=arrayCalc(ages,isFullAge.bind(this,20));
console.log(ages);
console.log(fullJapan); */

/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/
//7
( function(){
  //1
    var Question =function(question,answers,correctAnswer){
    this.question=question;
    this.answers=answers;
    this.correctAnswer=correctAnswer;
}
//4
Question.prototype.displayQuestion=function(){
   console.log(this.question);

   for(var i=0;i<this.answers.length;i++){
       console.log(i+':'+this.answers[i]);
   }
   }
   //5 6
   Question.prototype.checkAnswer=function(answer,scoreTrack){
      var score;
       if(answer===this.correctAnswer){
           console.log("correct answer");
         //to pass true or falce to the function scoreCalc
         //we pass it after value entered
         score = scoreTrack(true);
         
       }else{
           console.log("wrong answer");
           score = scoreTrack(false);
         
       }
       this.displayScore(score);
       //console.log("correct answer:"+this.answers);
      // console.log("uer answer:"+useranswer);
       //console.log("result: "+scoreTrack);
    }
    Question.prototype.displayScore = function(score) {
        console.log('Your current score is: ' + score);
        console.log('------------------------------');
    }


//2
   var q1 = new Question('Is JavaScript the coolest programming language in the world?',
                          ['Yes', 'No'],
                          0);

    var q2 = new Question('What is the name of this course\'s teacher?',
                          ['John', 'Micheal', 'Jonas'],
                          2);

    var q3 = new Question('What does best describe coding?',
                          ['Boring', 'Hard', 'Fun', 'Tediuos'],
                          2);
//3
    var allQuestions=[q1,q2,q3];
    

 
    function score() {
        var count = 0;
        return function(correctAnswer) {
            if (correctAnswer) {
                count++;
            }
            return count;
        }
    }
    var keepScore = score();
    
    
    function nextQuestion() {

        var n = Math.floor(Math.random() * allQuestions.length);
        allQuestions[n].displayQuestion();

        var answer = prompt('Please select the correct answer.');

        if(answer !== 'exit') {
            allQuestions[n].checkAnswer(parseInt(answer), keepScore);
            
            nextQuestion();
        }
    }
    
    nextQuestion();
})();