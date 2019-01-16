import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import {elements,renderLoader,clearLoader} from './views/base';
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
          console.log("error in search");
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

       //create new recipe object
         state.recipe=new Recipe(id);
         try {
            //Get Recipe data
        await state.recipe.getRecipe();

        //Calculate servings and time
           state.recipe.calcTime();
           state.recipe.calcServings();
 
        //Render Recipe
        console.log(state.recipe);
         } catch (error) {
              console.log(error);
         }
       
    }
   console.log(id);
};


/* window.addEventListener('hashchange',controlRecipe);
window.addEventListener('load',controlRecipe); */
//can be done as below

['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecipe));
 