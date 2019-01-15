import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements,renderLoader,clearLoader} from './views/base';
/**Global state of the app */
/**-Search object */
/**-Current recipe  object*/
/**-Shopping List  object*/
/**- Liked recipes*/
const state={};

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
       //4) search for recipes 
       await state.search.getResults();
       //5) Render Results to UI
       clearLoader();
      searchView.renderResults(state.search.result)

   }
}
elements.searchForm.addEventListener('submit',e=>{
e.preventDefault();
controlSearch();
});

