import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";




const Cart = ({cartItems, updateQuantity, onClose, loadLastOrderToCart  }) => {
  
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0); // räknar ut totalen av alla priser i cartItems arrayen
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { currentUser, loadUser } = useAuth();

  const now = new Date();
  const isoWithoutSeconds = now.toISOString().slice(0, 16); // dessa 2 tillåter en att få ett datum utan sekunder och med 2 decimaler, så att det kan sparas i api:et som en string
  

  const navigate = useNavigate()
  
     const PlaceOrder = async () => {     
        if (cartItems.length > 0) {
          const newOrder = {
            id: crypto.randomUUID(),                  // skapar ett id för ordern
            items: cartItems.map(item => ({           //mappar cartItems arrayen till ett nytt objekt som innehåller id, namn, kvantitet och pris
              name: item.name,                        
              quantity: item.quantity,            
              price: item.price,                  
            })),
            total: total,                             
            date: isoWithoutSeconds           // skapar ett datum för ordern
          };

          try {           
            const userId = currentUser.id; // hämtar userId från currentUser med auth context
            const res = await fetch(`http://localhost:3001/users/${userId}`);  //hämtar data från api med userId så vi sen kan uppdatera orders arrayen inuti den
            if (!res.ok) throw new Error('Failed to fetch user');

            const userData = await res.json(); //parsar datan från api så vi kan använda den       
            const updatedOrders = [...(userData.orders || []), newOrder]; //skapar en ny array med samma order + den nya vi skapat
            
            const patchRes = await fetch(`http://localhost:3001/users/${userId}`, { //uppdaterar orders arrayen i usern med den nya ordern som är updatedOrders
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orders: updatedOrders })
            });            
            if (!patchRes.ok) throw new Error('Failed to update orders');     
            await loadUser(); // laddar om användardata för att uppdatera currentUser i AuthContext
            navigate('/payment');  //vid lyckad order placering navigerar vi till payment sidan

          } catch (error) {
            console.error('Order placement failed:', error);
            alert('Failed to place order. Please try again.');
          }
        };
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
      <button className="submitPageBTN" id="placeOrderBTN" onClick={PlaceOrder}>Place Order</button> {/*knapp för att placera order */}
    </div>
    </div>
    </>
  );  
}


export default Cart;