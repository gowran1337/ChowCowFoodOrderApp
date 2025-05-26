import React from 'react';
import { useNavigate } from 'react-router-dom'



const Cart = ({cartItems, updateQuantity, onClose, }) => {
  
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0); // räknar ut totalen av alla priser i cartItems arrayen
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navigate = useNavigate()
     const GoToPay = () => {
        
        navigate('/payment') 
      }
 
    return (
      <>
      <div className="cartContainer">
         <button className='closeBTN clickable' onClick={onClose}>X</button>
          <div className="cartItems">
      <h2>Your Cart</h2>

      <p>You have {totalQuantity} items in the cart</p>
      <p>............................................</p>
  
      <div className="itemDisplay">
        {cartItems.length === 0 ? ( /* If cart is empty, show a message */
          <p>Cart is empty</p> 
        ) : (
          cartItems.map(item => (  //loop through cart items and display them
            <div key={item.id} className="cartItemRow">
              <img className="item-cart-image" src={item.image} alt={item.name} /> {/*displayar bilden av itemet */}   

              <div className="cartItemInfo">      
                <span className="itemName">{item.name}</span>
                <span className="itemPrice">${(item.price * item.quantity).toFixed(2)}</span> {/*namnet x kvantitet, gör också en kalkyl på quantity * priset för att få total prieset av t.ex 3 bröd */}

              <div className="quantityControls clickable">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                
               </div>
              </div> 
            </div>
            
          ))
        )}
      </div>
      

       <p>............................................</p>

      <div className="totalLine">
        <span>Total</span>
        <span>${total.toFixed(2)}</span> {/* displayar totalen med 2 decimaler */}
      </div>
      <button className="submitPageBTN" id="placeOrderBTN" onClick={GoToPay}>Place Order</button> {/*knapp för att placera order */}
    </div>
    </div>
    </>
  );
}   

export default Cart;