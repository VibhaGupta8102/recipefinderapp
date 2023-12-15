const appId = "ff81faa4" ;
const appKey = "b27246bb96d1cf0a7e00cda2857fe6d5"
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;
const recipeC=document.querySelector('#recipec');
const txtSearch= document.querySelector('#searchInput');

txtSearch.addEventListener("keyup",(e)=>{
 const input= txtSearch.value ;
 if(e.keyCode===13){
    loadRecipes(input)
 }
})


function loadRecipes(type = "paneer"){
    const url= baseUrl + `&q=${type}` ;
    fetch(url)
    .then(res=>res.json())
    .then(data=> renderRecipies(data.hits))
    .catch((error)=> console.log(error));
}

loadRecipes();

const getRecipesSteps=(ingredientLines=[])=>{
   let str="";
   for(var step of ingredientLines){
    str= str + `<li>${step}</li>` ;
   }
   return str;
};

const renderRecipies= (recipeList= [])=>{
    recipeC.innerHTML='' ;
    recipeList.forEach((recipeObj)=>{
        const{
            label:recipeTitle,
            ingredientLines,
            image:recipeImage,
        }=recipeObj.recipe;
        const recipeStepsstr= getRecipesSteps(ingredientLines);
       const htmlStr= `<div class="recipe">
       <div class="recipe-title">${recipeTitle}</div>
       <div class="recipe-img">
           <img src="${recipeImage}" alt="">
       </div>
       <div class="recipe-text">
           <ul>
              ${recipeStepsstr}
           </ul>
       </div>
   </div>` ;
   recipeC.insertAdjacentHTML('beforeend',htmlStr);
    });
};