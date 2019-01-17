import axios from 'axios';
import{key,proxy} from '../config';

export default class Recipe{
    constructor(id){
        this.id=id;
    }
    async getRecipe(){
        try {
            const res=await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title=res.data.recipe.title;
            this.authoer=res.data.recipe.publisher;
            this.img=res.data.recipe.image_url;
            this.url=res.data.recipe.source_url;
            this.ingredients=res.data.recipe.ingredients;
            console.log(res);
        } catch (error) {
           console.log(error); 
           alert('Somethings went wrong :(');
        } 
    }
    calcTime(){
         //assuming we need 15 mins for each 3 ingerdients
        const numIng=this.ingredients.length;
        const periods=Math.ceil(numIng/3);
        this.time=periods*15;
    }

    calcServings(){
        this.servings=4;
    }
    parseIngredients(){

        const unitsLong=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitsShort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const newIngredtients=this.ingredients.map(el => {
         //1 Uniform units
             let ingredient=el.toLowerCase();
             unitsLong.forEach((unit,i)=>{
                 ingredient=ingredient.replace(unit,unitsShort[i]);
             });
         //2 remove parentices () method below remove () replace with nth 
           ingredient=ingredient.replace(/ *\([^)]*\) */g, ' ');
         //3 Parse ingredients into count,unit and ingredients
             const arrIng=ingredient.split(' ');
             const unitIndex=arrIng.findIndex(el2=> unitsShort.includes(el2));

             let objIng;
             if(unitIndex >-1){
               //there is a unit
               //ex 4 1/2  cups arrCount is [4,1/2] ->>eval(4+1/2) --> 4.5
               //ex 4 cups ,arrCount is [4]
               let count;
               const arrCount=arrIng.slice(0,unitIndex); 

               if(arrCount.length===1){
                 count=eval(arrIng[0].replace('-','+'));
               }else {
                   count=eval(arrIng.slice(0,unitIndex).join('+'));
               }
               objIng={
                   count,
                   unit:arrIng[unitIndex],
                   ingredient:arrIng.slice(unitIndex+1).join(' ')
               };
             }else if(parseInt(arrIng[0],10)){
                 // there is no unit but  1st element is a number
                  objIng={
                      count:parseInt(arrIng[0],10),
                      unit:'',
                      ingredient:arrIng.slice(1).join(' ')
                  }
             }else if(unitIndex ===-1){
                //there is no unit and not number in 1st position

                objIng={
                    count:1,
                    unit:'',
                    ingredient
                }
             }



         return objIng;
         
        });
        this.ingredients=newIngredtients;
    }
}