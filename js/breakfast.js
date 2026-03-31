let pageBody = document.querySelector("body");
function buildMenu(foodData){
    //good foods
    let foodList = document.querySelector("#fullPrice");
    let fullPriceFoods = foodData.fullPrice;
    for(let i=0;i<fullPriceFoods.length;i++){
        let foodItem = document.createElement("li");
        foodItem.innerText = `${fullPriceFoods[i].food_name} - ${fullPriceFoods[i].food_price} - ${fullPriceFoods[i].food_category} - ${fullPriceFoods[i].food_calories} `;
        //
        foodList.appendChild(foodItem);
    }
    //mehFoods
    let mehList = document.querySelector("#budgetPrice");
    let mehFoods = foodData.budgetMenu;
    for(let i=0;i<mehFoods.length;i++){
        let foodItem = document.createElement("li");
        foodItem.innerText = `${mehFoods[i].food_name} - ${mehFoods[i].food_price} - ${mehFoods[i].food_category} - ${mehFoods[i].food_calories} `;
        //
        mehList.appendChild(foodItem);
    }
    pageBody.appendChild(mehList);
}
function buildTitle(){
    let titleEl = document.createElement("h1");
    titleEl.innerText = "Breakfast Listing";
    let titleHolder = document.createElement("header");
    titleHolder.appendChild(titleEl);
    pageBody.appendChild(titleHolder);
}
function buildFoodHolders(){
    let fullPriceTitle = document.createElement("h2");
    fullPriceTitle.innerText = "Yummy Food";
    pageBody.appendChild(fullPriceTitle);
    let fullPrice = document.createElement("ul");
    fullPrice.id ="fullPrice";
    pageBody.appendChild(fullPrice);
    
    let budgetPriceTitle = document.createElement("h2");
    budgetPriceTitle.innerText = "Meh Food";
    pageBody.appendChild(budgetPriceTitle);
    let budgetPrice = document.createElement("ul");
    budgetPrice.id ="budgetPrice";
    pageBody.appendChild(budgetPrice);
    getData();
}
function clearFoodList(){
    document.querySelector("#foodList").innerHTML="";
}

async function getData() {
    const url = "./fullbreakfast_api.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        console.log("the budget items");
        console.log(result.budgetMenu);
        console.log("the full price items");
        console.log(result.fullPrice);
        buildMenu(result);
    } catch (error) {
        console.error(error.message);
    }
}

function init(){
    buildTitle();
    buildFoodHolders();
}
init();