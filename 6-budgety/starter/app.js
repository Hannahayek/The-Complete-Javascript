//BUDGET Controller
var budgetController=(function(){

var Expense= function(id,description,value){
    this.id=id;
    this.description=description;
    this.value=value;
};
var Income= function(id,description,value){
    this.id=id;
    this.description=description;
    this.value=value;
};


var data={
    allItems:{
        exp:[],
        inc:[]
    },
    totals:{
        exp:0,
        inc:0
    }
};

return{
    addItem:function(type,des,val){
       var newItem,ID;

       //create new ID
       if(data.allItems[type].length>0){
        ID=data.allItems[type][data.allItems[type].length - 1].id + 1; //will select last item 
       }else{
           ID=0;
       }
      
        
       //create new item based on inc or exp type
       if(type==='exp'){
        newItem= new Expense(ID,des,val);
       }else if (type==='inc'){
        newItem= new Income(ID,des,val);
       }
      // push it into our data structure
       data.allItems[type].push(newItem);

       //return the new element
       return newItem;
       
    },
    testing:function(){
        console.log(data);
    }
};

})();

// UI Controller
var UIController=(function(){
var DOMstring={
    inputType:'.add__type',
    inputDescription:'.add__description',
    inputValue:'.add__value',
    inputBtn:'.add__btn'
}
  return {
      getinput:function(){
          return{
            type:document.querySelector(DOMstring.inputType).value, //will be inc + or exp -
            description:document.querySelector(DOMstring.inputDescription).value,
            value:document.querySelector(DOMstring.inputValue).value
          };
      },
      //here we make it public so can be accessed by other controllers
      getDomStrings:function(){
          return DOMstring;
      }
  }

})();

//GLOBAL APP Controller
var controller=(function(budgetCtrl,UICtrl){


 var setupEventListeners  =function(){
    var DOM=UIController.getDomStrings();
    document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
    // the event will catch any key is pressed
    //key code we can get it from google keycode
    //keycode is enter event.which for older browsers
    document.addEventListener('keypress',function(event){
        if(event.keyCode===13||event.which===13){
            ctrlAddItem();
        }
    });
    
 } 
 
var ctrlAddItem=function(){
  var input,newItem;  
// 1. Get the filed input data
 input=UICtrl.getinput();

//2. add the item to the budget controller
 newItem=budgetCtrl.addItem(input.type,input.description,input.value);

//3. add the item to the UI 

//4. Calculate the budget

//5. Display the budget in U

}
 return {
     init:function(){
         console.log("application started");
         setupEventListeners();
     }
 };

})(budgetController,UIController);


controller.init();