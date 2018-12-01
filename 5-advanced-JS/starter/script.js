//function constructor

var Hanna={
    name:'Hanna',
    yearOfBirth:1984,
    job:'Software'
};

var Person=function(name,yearOfBirth,job){
    this.name=name;
    this.yearOfBirth=yearOfBirth;
    this.job=job;
   
}
//here we let the Person any person object inherit this method
Person.prototype.calculateAge=function(){
    console.log(2018-this.yearOfBirth);
}

Person.prototype.lastName='Smith';

var hanna=new Person('Hanna',1980,'software');
var jane=new Person('jane',1996,'designer');
var mark=new Person('mark',1948,'retired');
hanna.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(jane.lastName);


