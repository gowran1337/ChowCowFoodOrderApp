import React, { useState, useEffect } from 'react';

const Menu = ({ AddToCart, AddToFavorites, favorites }) =>  {
  const [menuItems, setMenuItems] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState("All"); //hook som startar på ALL //setSelectedCategory är det som används för att uppdatera kategorien
   
 
  useEffect(() => { //hämtar data från db.json
  fetch("http://localhost:3001/menu")
    .then((res) => res.json())
    .then((data) => {       
      setMenuItems(data);
      console.log("Categories in data:", [...new Set(data.map(item => item.category))]);
    });
}, []);


  const handleCategoryClick = (category) => { // tar emot den klickade kategorien som parameter
    console.log("Clicked category:", category); // Add this
    setSelectedCategory(category); //nu är setSelectedCategory == "DRINKS" t.ex, då ändrar useStaten ovanför värden på variabeln category til drinks så att DRINKS renderar på sidan nu
  };

const categoryMap = {
  "Appetizers": "Appetizer",
  "Meals": "Meal",
  "Desserts": "Dessert",
  "Drinks": "Drink",
  "Favorites": "Favorite"
};


  const filteredItems = selectedCategory === "All" //kollar ifall  categories == All vilken den är på startup
  ? menuItems
  : selectedCategory === "Favorites"
  ? favorites
  : menuItems.filter(item => 
      item.category.toLowerCase() === 
      (categoryMap[selectedCategory] || selectedCategory).toLowerCase()     //filter är en funktion som går igenom varje item i menuItems och kollar om deras kategori är samma som selectedcategory i usestate

    );
  // console.log("Current filter:", selectedCategory);
  // console.log("Filtered items:", filteredItems);
  return (
    <> 

      <div className="foodCategories">
        
      

        <button className="categoryBTN" onClick={() => handleCategoryClick("Appetizers")}>
          <img className="categoryIMG" src="/images/appetizer.png" alt="appetizers"/>
          <span>Appetizer</span>
        </button>

        <button className="categoryBTN" onClick={() => handleCategoryClick("Meals")}>
          <img className="categoryIMG" src="/images/mainmeal.png" alt="meals"/>
          <span>Meals</span>
        </button>
        
        <button className="categoryBTN" onClick={() => handleCategoryClick("Desserts")}>
          <img className="categoryIMG" src="/images/dessert.png" alt="desserts"/>
          <span>Desserts</span>
        </button>

        <button className="categoryBTN" onClick={() => handleCategoryClick("Drinks")}>
          <img className="categoryIMG" src="/images/soda.png" alt="drinks"/>
          <span>Drinks</span>
        </button>

          <button className="categoryBTN" onClick={() => handleCategoryClick("All")}>
          <img className="categoryIMG" src="/images/all.png" alt="all"/>
          <span>All</span>
        </button>

        <button className="categoryBTN" onClick={() => handleCategoryClick("Favorites")}>
          <img className="categoryIMG" src="/images/heart.png" alt="favorites"/>
          <span>Favorites</span>
        </button>
       
      </div>

      <h2 id="h2menu">{selectedCategory === "All" ? "Full Menu" : selectedCategory}</h2> {/*värde baserat på vad selectedCATEGORY är*/}

    <div className="allmenu">
      {filteredItems.map(item => (/*loopar igenom arrayen "menuItems" och renderar som specifierat: namn pris och image  */
        <div key={item.id} className="menu-item">

          <div className="itemImageBTN">
          <img src={item.image} className="item-image" alt={item.name} />

            <div className="item2BtnsContainer">
                <button className='item2Btns' onClick={() => AddToCart(item)}>
                  <img className='heartIcon' src="/images/add.svg" alt="Add to Cart" /></button> {/*skickar det det valda itemet som tas emot av indexpage*/}
                <button className='item2Btns' onClick={() => AddToFavorites(item)}>

                  <img className='heartIcon' 
                          src={favorites.some(fav => fav.id === item.id)  //om itemet finns i favorit arrayen, visa ena filledf heart, annars nej
                            ? "/images/heartFilled.png" 
                            : "/images/heart.png"} 
                          alt="Toggle Favorite" 
                            />
                </button>
             </div>

            </div>
          <div className="item-info">
            <div className="namepriceLine">
                <h4 className="nameprice">{item.name}</h4>   
                <h4 className="nameprice"> ${item.price}</h4>   
                </div>         
        </div>
         
        </div>
      ))}
    </div>
    </>
  );
};


export default Menu;
