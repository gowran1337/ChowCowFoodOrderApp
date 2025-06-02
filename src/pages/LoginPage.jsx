import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const { login } = useAuth(); //hämtar login funktionen från AuthContext
    const [error, setError] = useState("");
    const navigate = useNavigate()
          

    

    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.get(`http://localhost:3001/users?email=${form.email}`);

        if (res.data.length === 0) {
      alert("Fel email eller användare finns inte");
      return;
    }
     const user = res.data.find(u => u.password === form.password);


    if (user) {
       login(user); // log in the user
       console.log(res.data)
      navigate("/home");
    } else {
      alert("Fel lösenord");
    }    
    } catch (error) {
        alert("Inloggning misslyckades: " + (error.response?.data?.message || error.message));
    }
};

  
    return (
        <>
        <div className="loginPageHeader">
            <button className="returnBTN" onClick={() => navigate("/")}>Back</button>
            <h1 id="loginHello">Hello!</h1>
        </div>
      

       <div className="whiteBG">
        

        

       <form id="loginForm" onSubmit={handleSubmit}>
        <h2 id="WbText">Welcome Back</h2>
        <p>Login</p>
        <label>Email</label>
      <input className="inputField"
        type="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <label>Password</label>
      <input className="inputField"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
        <div className="formBTN">
            <button className="submitPageBTN" type="submit">Log in</button>
            <p>or</p>
            <button id="btnReg" type="button" onClick={() => navigate("/register")}>
                Create Account
            </button>
      </div>
        </form>
      </div>
      
    </>
  );
};


export default LoginPage;