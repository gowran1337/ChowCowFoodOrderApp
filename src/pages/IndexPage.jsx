import Menu from '../components/menu'
import React, { useState, useEffect } from 'react';
import Profile from '../components/profile';
import ConfirmationPopUp from '../components/confirmation';
import { useAuth } from "../context/AuthContext";
import Cart from '../components/cart';

import { useNavigate, useLocation } from 'react-router-dom';



const IndexPage = () => {

    const navigate = useNavigate()
    const location = useLocation(); // useLocation hook allows us to access the current location object, which contains information about the current URL and state
    const {currentUser, logout} = useAuth();
    const [cartItems, setCartItems] = useState([]); //funktionen som uppdaterar cart
    const [showCart, setShowCart] = useState(false); //hook som används för att visa eller dölja sidopanelen
    const [showProfile, setShowProfile] = useState(false); //hook som används för att visa eller dölja profilen
    const [showPopup, setShowPopup] = useState(false);
    const [favorites, setFavorites] = useState([]); //hook som används för att spara favoriter
    
        const latestOrder = currentUser?.orders?.length > 0
        ? currentUser.orders[currentUser.orders.length - 1]
        : null;


    const addToCart = (item) => {
       setCartItems(prevItems => { //prevItems är den gamla arrayen med cartItems
        const existingItem = prevItems.find(i => i.id === item.id); //kollar om itemet redan finns i cartItems arrayen

        if (existingItem) {
          return prevItems.map(i => //om itemet finns i cartItems arrayen så uppdatera kvantiteten
            i.id === item.id //kollar om ett item med samma id finns i PrevItems, isåfall öka dess kvantitet
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        } else {
          return [...prevItems, { ...item, quantity: 1 }]; //om itemet inte finns skapa det med quantity 1
        }
      });
};
  const loadLastOrderToCart = async () => {
  if (!currentUser) return;

  try {
    
    const res = await fetch(`http://localhost:3001/users/${currentUser.id}`); //hämtar rätt användare från servern
    if (!res.ok) throw new Error("Failed to fetch user data");

    const userData = await res.json();
    const lastOrder = userData.orders?.slice(-1)[0]; //hämtar userns senaste order och ger den namnet lastOrder

    if (!lastOrder) {
      alert("No previous orders found.");
      return; //gör inget om det inte finns någon order
    }

    // Fetch the full menu (e.g. foods)
    const menuRes = await fetch("http://localhost:3001/menu"); //hämtar menyn från server för att kunna hämta rätt image för varje item (till cart)
    if (!menuRes.ok) throw new Error("Failed to fetch menu items");

    const menuItems = await menuRes.json();

    const restoredItems = lastOrder.items.map(item => { //mappar över lastOrder.items och skapar en ny array med items som har samma namn, kvantitet och pris som i lastOrder
      const match = menuItems.find(menuItem => menuItem.name === item.name);
      return {
        id: crypto.randomUUID(), //genererar ett unikt id
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: match?.image
      };
    });

    setCartItems(restoredItems);

  } catch (error) {
    console.error("Failed to load last order:", error);
    alert("Could not load last order.");
  }
};

    const AddToFavorites = (FavItem) => {
      setFavorites(prevFavorites => {
        const existingFav = prevFavorites.find(i => i.id === FavItem.id); //kollar om favoriten redan finns i favorites arrayen
        if (existingFav) {
           return prevFavorites.filter(i => i.id !== FavItem.id); 
        } else { 
          return [...prevFavorites, { ...FavItem}]; //om favoriten inte finns, lägg till den i favorites arrayen
        }
      });
    };

const updateQuantity = (itemId, amount) => { //tar emot ID och "amount" som är -1 eller 1, bestäms i cart.jsx på knapparna
  setCartItems(prevItems =>
    prevItems
      .map(item =>
        item.id === itemId //letar efter matchande itemet i cartItems arrayen
          ? { ...item, quantity: item.quantity + amount } //uppdaterar kvantiteten med "amount" som är -1 eller 1
          : item
      )
      .filter(item => item.quantity > 0) // om den når 0 ta bort itemet
  );
};


    useEffect(() => { //detta låter oss visa en popup när vi navigerar till index sidan
        if (location.state?.showPopup) { //kollar om location state har showPopup satt till true
            setShowPopup(true); // sätter showPopup till true så att popupen visas
           
            window.history.replaceState({}, document.title); //tar bort state så att popupen inte kommer tillbaka om man uppdaterar sidan
        }
    }, [location.state])

    const handleLogOut = () => {
    // (Optional: validate login here)
    navigate('/') // this takes you to the home page ("/")
  }

    
    return(
<div className="index">
        <div className="indexheader">
            <div className="cowandP">
            <img id="indexlogo" src={"/images/cownlogonotext.png"} alt="Logo" />
            <h2 id="LatestOrderTitle">Latest order</h2>
            </div>
            <h3 id="namedisplay">
              Welcome, <span className="username">{currentUser.username}</span>
            </h3>
            {showPopup && (
            <ConfirmationPopUp onClosePopUp={() => setShowPopup(false)}  />          
            )}
      </div>
      
      
      <div className="belowheader">

         {latestOrder ? (

             <div className="latest-order">

                <div className="latestItems">
                {latestOrder.items.map((item, index) => (
                  <div className="latest-order-item">
                    <div key={index}>
                      {item.name} x {item.quantity} {/*displayar itemet med pris och kvantitet */}
                      </div>
                  </div>
                ))}
                </div>

              <div className="latestInfo">
              <p>Total: ${latestOrder.total.toFixed(2)}</p>
              <p> {new Date(latestOrder.date).toLocaleString
            (undefined, {month: 'short', day: 'numeric',hour: '2-digit',minute: '2-digit',hour12: false // remove this line if you want AM/PM
            })}</p>
            <button id="orderAgainBTN" className="submitPageBTN"  onClick={loadLastOrderToCart} >Re-order?</button>
            </div>
            </div>
          ) : (
            <div className="latest-order">
              <p>You haven’t placed any orders yet.</p>
            </div>
            
          )}
          
            <div className="sidepanels">
            
              {!showCart && (
                  <button className="sidebutton" onClick={() => setShowCart(true)}>
                    <img id="cartImage2" className="cartImage" src="/images/cart.svg" alt="Cart"/>                 
                    <span className="cartQuantity">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </button>
                )}

              {!showProfile && (
              <button className="sidebutton" onClick={() => setShowProfile(true)}>               
                <img id="profileicon" className="cartImage profileicon" src="/images/profileicon.svg" alt="Profile"/>          
                </button>
                )}
         </div>


       </div>
        <div className="foodarea">
          
          <Menu AddToCart={addToCart} AddToFavorites={AddToFavorites} favorites={favorites} /> {/*tar emot "item" härifrån när det skickas av menu.jsx*/ }
          {showCart && (  /*om showCart == true visa komponenten, annars hide */
        <Cart cartItems={cartItems} updateQuantity={updateQuantity} onClose={() => setShowCart(false)} /> 
        
      )}
      {showProfile && (  /*om showProfile == true visa komponenten, annars hide */
      <Profile onCloseProfile={() => setShowProfile(false)}/>
      )}
        </div>
                    

        <button onClick={handleLogOut}>logout</button>
</div>
    )
  }
  
  
  export default IndexPage;