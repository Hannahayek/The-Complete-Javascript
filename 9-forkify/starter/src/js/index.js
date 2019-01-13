import axios  from 'axios';

async function getResults(query){
    const proxy='https://cors-anywhere.herokuapp.com/';
    const key='a3d61faaee59d67b76593368933e6c64';
   try {
    const res=await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
    const recipes=res.data.recipes;
    console.log(recipes);
   } catch (error) {
       console.log(error);
   }
  
}

getResults('pasta');