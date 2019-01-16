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
           alert('Somethings wen wrong :(');
        } 
    }
    calcTime(){
         //assuming we need 15 mins for each 3 ingerdients
        const numIng=this.ingredients.length;
        const periods=Math.ceil(numIng/3);
        this.time=periods*15;
    }

    calcServigns(){
        this.servings=4;
    }
}