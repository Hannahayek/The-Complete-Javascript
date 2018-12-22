//BUDGET Controller
var budgetController=(function(){

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
var DOM=UIController.getDomStrings();

var ctrlAddItem=function(){
// 1. Get the filed input data
var input=UICtrl.getinput();
console.log(input);
//2. add the item to the budget controller
//3. add the item to the UI 
//4. Calculate the budget
//5. Display the budget in U
}

document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);



// the event will catch any key is pressed
//key code we can get it from google keycode
//keycode is enter event.which for older browsers
document.addEventListener('keypress',function(event){
    if(event.keyCode===13||event.which===13){
        ctrlAddItem();
    }
});

})(budgetController,UIController);