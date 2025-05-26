import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const PaymentPage = () => {
    const [selectedOption, setSelectedOption] = useState('Swish'); //manager för välja vilken payment option

        const handleChange = (e) => { //ändrar värdet till det som är valt av användaren i payment option
            setSelectedOption(e.target.value);
        };


    const navigate = useNavigate()
    const goToIndex = () => {
        
        navigate('/home') // this takes you to the home page ("/")
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

                <label>Name:</label> <input className="inputField" type="text" />
                <label>City:</label> <input className="inputField" type="text" />
                <label>Street:</label> <input className="inputField" type="text"  />
                <label>House Number:</label> <input className="inputField" type="text"  />

            </form>
                





            <div className="radioBTN">
            <label><input type="radio" value="creditCard" checked={selectedOption === 'creditCard'} onChange={handleChange} />Credit Card </label>        
           <label> <input type="radio" value="Swish" checked={selectedOption === 'Swish'} onChange={handleChange} />Swish</label>
          </div>
          {selectedOption === 'creditCard' && (

        <div className="creditCardInput">
          <h3 className="creditCardTitle">Credit Card Details</h3>

          <p className="creditCardText">Please enter your credit card details below:</p>
          
          <input className="inputFieldCard" type='number' placeholder="Card Number" />
          <input className="inputFieldCard" type="number" placeholder="Expiry Date" />
          <input className="inputFieldCard" type="number" placeholder="CVC" />
        </div>
      )}

       {selectedOption === 'Swish' && (
        <div className="swishInput">
          <h3>Swish Number</h3>
          <p>Please enter your Swish number below:</p>
          <input id="swishInputBox" type="number" placeholder='      +46....'/>
        </div>
      )}
             
          <button className="submitPageBTN"  onClick={goToIndex}>Pay</button>
        </div>
        </div>
    );
};

export default PaymentPage;