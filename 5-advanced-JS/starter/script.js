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

var personProto={
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

