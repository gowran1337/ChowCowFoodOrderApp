import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const PaymentPage = () => {
    const [selectedOption, setSelectedOption] = useState('Swish'); //manager för välja vilken payment option
 
    const handleChange = (e) => { //ändrar värdet till det som är valt av användaren i payment option
            setSelectedOption(e.target.value);
    };
        


    const navigate = useNavigate()
    const goToIndex = () => {
        
        navigate('/home', { state: { showPopup: true } }); // this takes you to the home page ("/")
      }
    
    return (  //knapparna ändrar värdet på radioknapparna och renderar rätt inputfält
        <div>
            
          <div className="loginPageHeader">
            <button className="returnBTN" onClick={() => navigate("/home")}>Back</button>
            <h1 id="loginHello">Payment Details</h1>
            
        </div>
        
        <div className="whiteBG scrollerPayment">
          
            <form className="paymentForm">
                <h2>Enter Your Address</h2>

                <label>Name:</label> <input className="inputField" type="text" required />
                <label>City:</label> <input className="inputField" type="text" required />
                <label>Street:</label> <input className="inputField" type="text" required  />
                <label>House Number:</label> <input className="inputField" type="number" required />

            </form>
                





            <div className="radioBTN">
            <label><input type="radio" value="creditCard" checked={selectedOption === 'creditCard'} onChange={handleChange} />Credit Card </label>        
           <label> <input type="radio" value="Swish" checked={selectedOption === 'Swish'} onChange={handleChange} />Swish</label>
          </div>
          {selectedOption === 'creditCard' && (

        <div className="creditCardInput">
          <h3 className="creditCardTitle">Credit Card Details</h3>

          <p className="creditCardText">Please enter your credit card details below:</p>
          
          <input className="inputFieldCard" type='number' placeholder="Card Number" minlength="16" maxlength="16" required/>
          <input className="inputFieldCard" type="number" placeholder="Expiry Date" minlength="4" maxlength="4" required/>
          <input className="inputFieldCard" type="number" placeholder="CVC" minlength="3" maxlength="3" required/>
        </div>
      )}

       {selectedOption === 'Swish' && (
        <div className="swishInput">
          <h3>Swish Number</h3>
          <p>Please enter your Swish number below:</p>
          <input id="swishInputBox" type="number" minlength="9" maxlength="9" placeholder='      +46....'/>
        </div>
      )}
             
          <button className="submitPageBTN"  onClick={goToIndex}>Pay</button>
        </div>
        </div>
    );
};

export default PaymentPage;