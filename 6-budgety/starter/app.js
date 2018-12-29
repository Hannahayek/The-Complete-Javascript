//BUDGET Controller
var budgetController=(function(){

var Expense= function(id,description,value){
    this.id=id;
    this.description=description;
    this.value=value;
    this.percentage=-1;
};

Expense.prototype.calcPercentage=function(totalIncome){
     if(totalIncome >0){
        this.percentage=Math.round((this.value/totalIncome)*100);
     }else {
         this.percentage=-1;
     }
     
};
Expense.prototype.getPercentage=function(){
return this.percentage;
};

var Income= function(id,description,value){
    this.id=id;
    this.description=description;
    this.value=value;
};

var calculateTotal=function(type){
var sum=0;
data.allItems[type].forEach(function(cur){
sum +=cur.value;
});
data.totals[type]=sum;
};
var data={
    allItems:{
        exp:[],
        inc:[]
    },
    totals:{
        exp:0,
        inc:0
    },
    budget:0,
    percentage:-1
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

    deleteItem: function(type, id) {
        var ids, index;
try {
      // id = 6
        //data.allItems[type][id];
        // ids = [1 2 4  8]
        //index = 3

        ids = data.allItems[type].map(function(current) {
            return current.id;
        });

        index = ids.indexOf(id);

        if (index !== -1) {
            data.allItems[type].splice(index, 1);
        }
} catch (error) {
    console.log(error);
}
       
    },

    calculateBudget: function(){
        //calculate total income and expenses
         calculateTotal('exp');
         calculateTotal('inc');

        //calculate the budget: income -expenses
         data.budget=data.totals.inc-data.totals.exp;

        //calculate the percentage of income that we spent
          if(data.totals.inc>0){
            data.percentage=Math.round((data.totals.exp/data.totals.inc)*100);
          }else{
              data.percentage=-1;
          }
        
    },

    calculatePercentages:function(){
       data.allItems.exp.forEach(function(cur){
         cur.calcPercentage(data.totals.inc);
       });
      
    },
    getPercentages:function(){
          var allPerc=data.allItems.exp.map(function(cur){
             return cur.getPercentage();
          });
          return allPerc;
    },
    getBudget:function(){
       return{
           budget:data.budget,
           totalInc:data.totals.inc,
           totalExp:data.totals.exp,
           percentage:data.percentage
           
       }
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
    inputBtn:'.add__btn',
    incomeContainer:'.income__list',
    expensesContainer:'.expenses__list',
    budgetLabel:'.budget__value',
    incomeLabel:'.budget__income--value',
    expenseLabel:'.budget__expenses--value',
    percentageLabel:'.budget__expenses--percentage',
    container:'.container',
    expensesPercLabel:".item__percentage"
    

};
var formatNumber=function(num,type){
    var numSplit,int,dec;
    /*
     + or - before number
     exactly 2 decimal points
     comman seprating the thousands
     2310.4567 > +2,2310.46
     2000 > +2,000
     */
      num=Math.abs(num);   //will make absolute number
      num=num.toFixed(2);  //will add to decimals and convert to string

      numSplit=num.split('.');
      int=numSplit[0];
      if(int.length>3){
        int=int.substr(0,int.length-3) + ',' +int.substr(int.length-3,int.length); //input 23510 ,output 23,310
      }  

         dec=numSplit[1];
         return (type==='exp' ? sign='-':sign='+')+ ' '+int+'.'+dec;
  };
  return {
      getinput:function(){
          return{
            type:document.querySelector(DOMstring.inputType).value, //will be inc + or exp -
            description:document.querySelector(DOMstring.inputDescription).value,
            value:parseFloat(document.querySelector(DOMstring.inputValue).value)
          };
      },

      addListItem:function(obj,type){
      var html,newHtml,element;  
     
      // Create HTML string with placeholder text
     if(type==='inc'){

         element=DOMstring.incomeContainer;

        html='<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
     }else if(type==='exp'){

        element=DOMstring.expensesContainer;

        html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">10%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
     }

       //replace the placeholder text with some actual data
         newHtml=html.replace('%id%',obj.id);
         //note:after first replace we start replacing with new html,because aready replaced
         newHtml=newHtml.replace('%description%',obj.description);
         newHtml=newHtml.replace('%value%',formatNumber(obj.value,type));

        //insert the HTML into the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

      },


      deleteListItem:function(selectorID){

        var el= document.getElementById(selectorID);
       el.parentNode.removeChild(el);
      },
      clearFields:function(){
          var fields,fieldsArr;
        fields= document.querySelectorAll(DOMstring.inputDescription+','+DOMstring.inputValue);
        //above method will return list,so we convert from list to arrary
        fieldsArr=Array.prototype.slice.call(fields);
        fieldsArr.forEach(function(current,index,array) {
            current.value="";
        });
        //set focus back to description 
        fieldsArr[0].focus();
      },
      displayBudget:function(obj){
        var type;  
        obj.budget >0? type='inc':type='exp';
          document.querySelector(DOMstring.budgetLabel).textContent=formatNumber(obj.budget,type);
          document.querySelector(DOMstring.incomeLabel).textContent=obj.totalInc;
          document.querySelector(DOMstring.expenseLabel).textContent=obj.totalExp;
          
         
          if(obj.percentage>0){
            document.querySelector(DOMstring.percentageLabel).textContent=obj.percentage+'%';
          }else {
            document.querySelector(DOMstring.percentageLabel).textContent='---';
          }

      },

      displayPercentages:function(percentages){
           var fields=document.querySelectorAll(DOMstring.expensesPercLabel);
           var nodeListForEach=function(list,callback){
            for(var i=0;i<list.length;i++){
                callback(list[i],i);
            }

           };
           nodeListForEach(fields,function(current,index){
               if(percentages[index]>0){
                current.textContent=percentages[index] +'%';
               } else {
                   current.textContent='---';
               }
               
           });
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
    
    document.querySelector(DOM.container).addEventListener('click',CtrDeleteItem);
 };

 //1. Calculate the budget
var updateBudget=function(){
budgetCtrl.calculateBudget();

//2. Return the budget
var budget=budgetController.getBudget();


//3. Display the budget in UI
UICtrl.displayBudget(budget);
};

var updatePercentage=function(){
//1. calculate the percentage

budgetCtrl.calculatePercentages();
//2. read them from the budget controller 
var percentages=budgetCtrl.getPercentages();
//3. update the UI with the new percentages
UICtrl.displayPercentages(percentages);
};

var ctrlAddItem=function(){
  var input,newItem;  
// 1. Get the filed input data
 input=UICtrl.getinput();
if(input.description!=="" && !isNaN(input.value) && input.value>0){
//2. add the item to the budget controller
newItem=budgetCtrl.addItem(input.type,input.description,input.value);

//3. add the item to the UI 
  UICtrl.addListItem(newItem,input.type);

  //4. clear the fields
  UICtrl.clearFields();

  //5.Calculate and update budget
  updateBudget();

  //6. Calculate and update the percentage

  updatePercentage();
};
}

var CtrDeleteItem = function(event){
    var itemID,splitID,type,ID;
//we used parentnode 4 times, to get to the parent div  <div class="item clearfix" id="income-0">
itemID=event.target.parentNode.parentNode.parentNode.parentNode.id
 if(itemID){
   //inc-1 or exp-1
   splitID=itemID.split('-');
   type=splitID[0];
   ID = parseInt(splitID[1]);
   


   //1. delete the item from the data structure
  budgetCtrl.deleteItem(type,ID);

   //2. delete the item from the UI
    UICtrl.deleteListItem(itemID);

   //3.  update and show the new budget 
    updateBudget();

    //4. Calculate and update the percentage
    updatePercentage();
 }else {

 }
};



 return {
     init:function(){
         console.log("application started");
         UICtrl.displayBudget({
            budget:0,
            totalInc:0,
            totalExp:0,
            percentage:-1
         });
         setupEventListeners();
     }
 };

})(budgetController,UIController);


controller.init();