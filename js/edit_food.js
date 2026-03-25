// You can get url_string from window.location.href if you want to work with
// the URL of the current page
let url = new URL(window.location.href); 
console.log(url);
let menuItem = url.searchParams.get("menuItem");
console.log(`the menu item to edit is ${menuItem}`);
let pageBody = document.querySelector("body");

function buildForm(foodData){
    console.log("time to build a form");
    console.log("about to build an absolutely amazing form");
    let formHolder = document.createElement("section");
    formHolder.innerHTML = `
    <h2>Edit the ${foodData.food_name}!</h2>
    <form action="#">
        <fieldset>
            <label for="foodName">Food Name</label>
            <input type="text" name="foodName" id="foodName">
        </fieldset>
        <fieldset>
            <label for="foodCalories">Food Calories</label>
            <input type="text" name="foodCalories" id="foodCalories">
        </fieldset>
        <fieldset>
            <label for="foodCategory">Food Category</label>
            <select name="foodCategory" id="foodCategory">
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Side">Side</option>
            </select>
        </fieldset>
        <fieldset>
            <label for="foodPrice">Food Price</label>
            <input type="text" name="foodPrice" id="foodPrice">
        </fieldset>
        <input type="submit" value="submit" id="food_submit">
    </form>`;
    pageBody.appendChild(formHolder);
    let nameField = document.querySelector("#foodName");
    nameField.value = foodData.food_name;
    let priceField = document.querySelector("#foodPrice");
    priceField.value = foodData.food_price;
    let caloriesField = document.querySelector("#foodCalories");
    caloriesField.value = foodData.food_calories;
    let categoryField = document.querySelector("#foodCategory");
    categoryField.value = foodData.food_category;
    let foodSubmit = document.querySelector("#food_submit");
    console.log(foodSubmit);
    foodSubmit.addEventListener("click", (e)=>{
        e.preventDefault();
        let foodName = document.querySelector("#foodName").value;
        let foodCalories = document.querySelector("#foodCalories").value;
        let foodCategory = document.querySelector("#foodCategory").value;
        let foodPrice = document.querySelector("#foodPrice").value;
        console.log(`${foodName} ${foodPrice} ${foodCalories}`);
        updateFood(foodData.food_id, foodName, foodCalories, foodCategory, foodPrice);
    });
}
//
async function getItem(item) {
    const url = "./get_food_api.php";
    let jsonData = JSON.stringify({food_id: item});
    console.log(jsonData);
    try {
        const response = await fetch(url,{
            method: "POST", //using the post method
            headers: {
                'Content-Type': 'application/json', // Inform the server the data is JSON
            },
            body: jsonData // Send the JSON string in the request body
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result[0]);
        buildForm(result[0]);
    } catch (error) {
        console.error(error.message);
    }
}
async function updateFood(foodId, foodName, foodCalories, foodCategory, foodPrice) {
    const url = "./update_food_api.php";
    console.log("about to add the liver chunks of doom?");
    console.log(`${foodId} ${foodName} ${foodCalories} ${foodCategory} ${foodPrice}`);
    let jsonData = JSON.stringify({food_id: foodId, food_name: foodName, food_calories: foodCalories, food_category: foodCategory, food_price: foodPrice});
    console.log(jsonData);
    try {
        const response = await fetch(url,{
            method: "POST", //using the post method
            headers: {
                'Content-Type': 'application/json', // Inform the server the data is JSON
            },
            body: jsonData // Send the JSON string in the request body
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        window.location.href = "index.html";
        //clearFoodList();
        //getData();
    } catch (error) {
        console.error(error.message);
    }
}
//
getItem(menuItem);