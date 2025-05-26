import React from 'react';
import { useNavigate } from 'react-router-dom'


const WelcomePage = () => {

    const navigate = useNavigate()

    const handleLoginOption = () => {
    // (Optional: validate login here)
    navigate('/login') // this takes you to the home page ("/")
  }

   const handleRegisterOption = () => {
    
    navigate('/register') 
  }

  

    return (
 <div className="welcome">
            <div className="slogan">
            <img src={"/images/cowlogo.png"} alt="Logo" className="welcome-image"/>
            <h1>Buy Food for Money</h1>
            <h3>Get Moo for free</h3>
            </div>


         <div className="welcome-btn">
            <button className="welcome-btn" id="loginbtn" onClick={handleLoginOption}>Login </button> 
            <button className="welcome-btn" id="registerbtn" onClick={handleRegisterOption}>Register</button>      
            </div>         
        
 </div>
    );
};

export default WelcomePage;