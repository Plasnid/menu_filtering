let pageBody = document.querySelector("body");
function buildMenu(foodData){
    let foodList = document.querySelector("#foodList");
    for(let i=0;i<foodData.length;i++){
        console.log(foodData[i]);
        let foodItem = document.createElement("li");
        foodItem.innerText = `${foodData[i].food_name} - ${foodData[i].food_price} - ${foodData[i].food_category} - ${foodData[i].food_calories} `;
        //
        let delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        foodItem.appendChild(delBtn);
        delBtn.addEventListener("click", function(){
            delId = foodData[i].food_id;
            console.log(`time to delete ${delId}!!`);
            delItem(delId);
        });
        //
        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        foodItem.appendChild(editBtn);
        editBtn.addEventListener("click", function(){
            editId = foodData[i].food_id;
            console.log(`time to edit ${editId}!!`);
            //delItem(delId);
            window.location.href = `edit_entry.html?menuItem=${editId}`;
        });
        //
        foodList.appendChild(foodItem);
    }
    pageBody.appendChild(foodList);
}
function buildTitle(){
    let titleEl = document.createElement("h1");
    titleEl.innerText = "Welcome to Blorgs Fine Cuisine";
    let subTitleEl = document.createElement("h2");
    subTitleEl.innerText = "Our Secret is Edible Food!";
    let titleHolder = document.createElement("header");
    titleHolder.appendChild(titleEl);
    titleHolder.appendChild(subTitleEl);
    pageBody.appendChild(titleHolder);
}
function buildFoodHolder(){
    let foodList = document.createElement("ul");
    foodList.id ="foodList";
    pageBody.appendChild(foodList);
    getData();
}
function clearFoodList(){
    document.querySelector("#foodList").innerHTML="";
}
function buildForm(){
    console.log("about to build an absolutely amazing form");
    let formHolder = document.createElement("section");
    formHolder.innerHTML = `
    <h2>Add More Food!</h2>
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
    let foodSubmit = document.querySelector("#food_submit");
    console.log(foodSubmit);
    foodSubmit.addEventListener("click", (e)=>{
        e.preventDefault();
        let foodName = document.querySelector("#foodName").value;
        let foodCalories = document.querySelector("#foodCalories").value;
        let foodCategory = document.querySelector("#foodCategory").value;
        let foodPrice = document.querySelector("#foodPrice").value;
        console.log(`${foodName} ${foodPrice} ${foodCategory} ${foodCalories}`);
        addFood(foodName, foodCalories, foodCategory, foodPrice);
    });
}
async function getData() {
    const url = "./foods_api.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        buildMenu(result);
    } catch (error) {
        console.error(error.message);
    }
}
async function delItem(item) {
    const url = "./remove_food_api.php";
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
        console.log(result);

        clearFoodList();
        getData();
        
    } catch (error) {
        console.error(error.message);
    }
}
async function addFood(foodName, foodCalories, foodCategory, foodPrice) {
    const url = "./add_food_api.php";
    console.log("about to add the liver chunks of doom?");
    console.log(`${foodName} ${foodCalories} ${foodCategory} ${foodPrice}`);
    let jsonData = JSON.stringify({food_name: foodName, food_calories: foodCalories, food_category: foodCategory, food_price: foodPrice});
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
        clearFoodList();
        getData();
    } catch (error) {
        console.error(error.message);
    }
}
function init(){
    buildTitle();
    buildForm();
    buildFoodHolder();
}
init();