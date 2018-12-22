//BUDGET Controller
var budgetController=(function(){

})();

// UI Controller
var UIController=(function(){

})();

//GLOBAL APP Controller
var controller=(function(budgetCtrl,UICtrl){
var ctrlAddItem=function(){
// 1. Get the filed input data
//2. add the item to the budget controller
//3. add the item to the UI 
//4. Calculate the budget
//5. Display the budget in UI

console.log("it works enter pressed");
}

document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);



// the event will catch any key is pressed
//key code we can get it from google keycode
//keycode is enter event.which for older browsers
document.addEventListener('keypress',function(event){
    if(event.keyCode===13||event.which===13){
        ctrlAddItem();
    }
});

})(budgetController,UIController);