import Search from './models/Search';
import Recipe from './models/Recipe';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements,renderLoader,clearLoader} from './views/base';
import List from './models/List';
/**Global state of the app */
/**-Search object */
/**-Current recipe  object*/
/**-Shopping List  object*/
/**- Liked recipes*/
const state={};

/**
 *SEARCH CONTROLLER
 */
const controlSearch= async ()=>{
// 1)Get query from view
   const query=searchView.getInput();
   
 


   if(query){
       //2) New search object and add to state
       state.search=new Search(query);
       //3 Prepare UI for results
       searchView.clearInput();
       searchView.clearResults();
     
       renderLoader(elements.searchRes);


       try {
          //4) search for recipes 
       await state.search.getResults();
       //5) Render Results to UI
       clearLoader();
       searchView.renderResults(state.search.result);
       } catch (error) {
          console.log("error in search" +error);
          clearLoader();
       }
       

   }
}
elements.searchForm.addEventListener('submit',e=>{
e.preventDefault();
controlSearch();
});



elements.searchResPages.addEventListener('click',e=>{
const btn=e.target.closest('.btn-inline');
  if(btn){
     //this will get the number of page as string
     const goToPage=parseInt(btn.dataset.goto,10);
     searchView.clearResults();
     searchView.renderResults(state.search.result,goToPage);
  }
});




/**
 *RECIPE CONTROLLER
 */
const controlRecipe= async ()=>{
   //Get ID from url
   const id=window.location.hash.replace('#','');
   
    if(id){
       //prepare UI for changes
        recipeView.clearRcipe();
        renderLoader(elements.recipe);
       //high light selected search item
       if(state.search) searchView.highlightedSeclected(id);
         
        //create new recipe object
         state.recipe=new Recipe(id);
        
         try {
            //Get Recipe data and parse ingredients
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();

        //Calculate servings and time
           state.recipe.calcTime();
           state.recipe.calcServings();
 
        //Render Recipe
        clearLoader();
        recipeView.renderRecipe(
           state.recipe,
         state.likes.isLiked(id));

         } catch (error) {
              console.log(error);
         }
       
    }
   
};


/* window.addEventListener('hashchange',controlRecipe);
window.addEventListener('load',controlRecipe); */
//can be done as below

['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecipe));


/**
 * LIST CONTROLLER
 */
  const controlList=()=>{
     //create new list if there is none yet
     if(!state.list) state.list=new List();
     //add each ingredient to the list and UI
     state.recipe.ingredients.forEach(el=>{
        const item=state.list.addItem(el.count,el.unit,el.ingredient);
        listView.renderItem(item);
     });
  }

  //Handle delete and update list item events
  elements.shopping.addEventListener('click',e=>{
     const id=e.target.closest('.shopping__item').dataset.itemid;

     //hndle the delete button

     if(e.target.matches('.shopping__delete,.shopping__delete *')){
        //delete from  state
        state.list.deleteItem(id);

        //delete from UI
        listView.deleteItem(id);

        //handle the count update
     }else if(e.target.matches('.shopping__count-value')){
         const val=parseFloat(e.target.value,10);
         state.list.updateCount(id,val);
     }

  });

  /**
 * LIKES CONTROLLER
 */

  
  
  

   const controlLike=()=>{
      
     if(!state.likes) state.likes=new Likes();

      const currentID=state.recipe.id;
       //user has not liked current recipe
      if(!state.likes.isLiked(currentID)){
          //add like to the state
        const newLike=state.likes.addLike(
           currentID,
           state.recipe.title,
           state.recipe.author,
           state.recipe.img
           );

        //toggle the like button
        likesView.toggleLikeBtn(true);

        //add like to the UI list
        likesView.rednerLike(newLike);
      
         
      //user has  liked current recipe
      }else{
          //remove like to the state
         state.likes.deleteLike(currentID);

        //toggle the like button
        likesView.toggleLikeBtn(false);

        //remove like from the UI list
        likesView.deleteLike(currentID);
      
       
      }
      
   };

//Restore liked recipes on page load
 window.addEventListener('load',()=>{
   state.likes=new Likes();
   //restore likes
   state.likes.readStorage();

   //toggle the button

   likesView.toggleLikeMenu(state.likes.getNumLikes());

   //render the existing likes

   state.likes.likes.forEach(like=>likesView.rednerLike(like));
 });


//handling recipe button clicks
  elements.recipe.addEventListener('click',e=>{
      if(e.target.matches('.btn-decrease,.btn-decrease *')){
         //decrease button is clicked
         if(state.recipe.servings>1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
         }
         
      }else if (e.target.matches('.btn-increase,.btn-increase *')){
         //icrease button is clicked
         state.recipe.updateServings('inc');
         recipeView.updateServingsIngredients(state.recipe);
      }else if(e.target.matches('.recipe__btn--add,.recipe__btn--add *')){
         controlList();
      }else if(e.target.matches('.recipe__love,.recipe__love *')){
         //Like controller
         controlLike();
      }
      
  });









 