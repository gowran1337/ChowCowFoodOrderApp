import React from 'react';
import { useAuth } from "../context/AuthContext";



const ConfirmationPopUp = ({onClosePopUp}) => {
    const { currentUser } = useAuth(); //hämtar currentUser från AuthContext
   
      
    const latestOrder = currentUser?.orders?.[currentUser.orders.length - 1] || null; //hämtar den senaste ordern från currentUser, om det finns några orders


        
   
        
    return (
        
  <div className="confirmationContainer"> 
    
  <div className="confirmationPopUp">
            
      <h4 id="titlepopup">Thank you, {currentUser.username}</h4>
            
         <p id="zerbi">For ordering from ChowCow</p>
         <p id="zerbi">---------------------------</p>
         <p id="zerbi">Here is your order:</p>

         <div className="orderDetails">

            <ul>
                {latestOrder.items.map((item, index) => (
                    <li key={index}>
                    {item.quantity}x {item.name} - ${item.price.toFixed(2)}
                </li>
                ))}
            </ul>

            <p>Total: ${latestOrder.total.toFixed(2)}</p>
            <p> Date: {new Date(latestOrder.date).toLocaleString
            (undefined, {year: 'numeric', month: 'short', day: 'numeric',hour: '2-digit',minute: '2-digit',hour12: false // remove this line if you want AM/PM
        })}</p>
            
        </div>
        </div>
        <button id="closePopUp" className="submitPageBTN clickable" onClick={onClosePopUp}>Close</button>
    </div>
    );
};

export default ConfirmationPopUp;