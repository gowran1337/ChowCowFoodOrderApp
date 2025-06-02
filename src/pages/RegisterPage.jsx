import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "", orders:[] });//skapar en state för att spara användarnamn och lösenord. I början är de tomma strängar därav "".
  const [errors, setErrors] = useState({}); //skapar en state för att spara felmeddelanden

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();  //sidan resetas inte ifall man får error när man trycker submit

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); //om det finns errors, spara till state
      return; //avbryter funktionen eftersom det finns felmeddelanden
    }
    try {
      await axios.post(`http://localhost:3001/users`, form); //postar via axios till backend
      navigate("/login"); //navigerar till login 
      alert("Registration successful!");
    } catch (error) {
      alert("Registration failed: " + (error.response?.data?.message || error.message));
    }
  };

  const validate = () => {
  const newErrors = {};

  if (!form.username.trim()) {
    newErrors.username = "Username is required";
  }

  if (!form.email.trim()) { //tar bort mellanslag och kollar om det är tomt
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) { // kollar om email är i rätt format
    newErrors.email = "Email is invalid";
  }

  if (!form.password) {
    newErrors.password = "Password is required";
  } else if (form.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }
  if (!form.confirmPassword) {
  newErrors.confirmPassword = "Please confirm your password";
} else if (form.confirmPassword !== form.password) {
  newErrors.confirmPassword = "Passwords do not match";
}

  return newErrors; //returnerar felmeddelandena om något inte stämmer
};

  return (
   <>

             <div className="loginPageHeader">
                <button className="returnBTN" onClick={() => navigate("/")}>Back</button>
                <h1 id="loginHello">Hello!</h1>
            </div>

   <div className="whiteBG">
    <form id="loginForm" onSubmit={handleSubmit}>
      <h2>Register User</h2>

      <label>Username</label>
      <input
        type="text" className="inputField"
        
        value={form.username} //ger username värdet i inputfältet
        onChange={(e) => setForm({ ...form, username: e.target.value })} //skickar värdet till setForm som uppdaterar state
      />
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>} {/*render för felmedelandet */}

     <label>Email</label>
      <input className="inputField"
        type="email"    
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      <label>Password</label>
      <input className="inputField"
        type="password"
        
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <label>Confirm Password</label>
      <input className="inputField"
      type="password"
      value={form.confirmPassword}   
       onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
      />
      {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
       
      

       {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
       <div className="formBTN">
      <button className="submitPageBTN" type="submit">Register</button>
      <p>already have an account?</p>
      <button id="btnReg">Login</button>
      </div>
    </form>
    </div>
    </>
  );
};

export default RegisterPage;
