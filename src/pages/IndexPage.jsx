import Menu from '../components/menu'
import React, { useState } from 'react'; //useState är en hook som gör att vi kan använda state i funktionella komponenter
import Cart from '../components/cart';
import Profile from '../components/profile';

import { useNavigate } from 'react-router-dom'


const IndexPage = () => {

    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([]); //funktionen som uppdaterar cart
     const [showCart, setShowCart] = useState(false); //hook som används för att visa eller dölja sidopanelen
     const [showProfile, setShowProfile] = useState(false); //hook som används för att visa eller dölja profilen

    const addToCart = (item) => {
       setCartItems(prevItems => {
        const existingItem = prevItems.find(i => i.id === item.id); //kollar om itemet redan finns i cartItems arrayen

        if (existingItem) {
          return prevItems.map(i => //om itemet finns i cartItems arrayen så uppdatera kvantiteten
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        } else {
          return [...prevItems, { ...item, quantity: 1 }]; //om itemet inte finns skapa det med quantity 1
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

 ;

    const handleLogOut = () => {
    // (Optional: validate login here)
    navigate('/') // this takes you to the home page ("/")
  }

    
    return(
<div className="index">
      
        <div className="indexheader">
            <img id="indexlogo" src={"/images/cownlogonotext.png"} alt="Logo" />
            <h2 id="namedisplay">Welcome "username"</h2>
      </div>

      <div className="belowheader">

         <div className="latest-order">

        </div>
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
          <Menu AddToCart={addToCart} /> {/*tar emot "item" härifrån när det skickas av menu.jsx*/ }
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