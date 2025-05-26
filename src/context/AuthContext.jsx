import { createContext, useState, useContext } from "react";

const AuthContext = createContext(); //skapar instans av AuthContext


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));


     const login = (newToken) => { //vid login sparas en token i localStorage och i state
    localStorage.setItem("token", newToken); 
    setToken(newToken); //uppdaterar state med den nya token
  };

  
  const logout = () => { //tar bort token från localStorage och state vid logout
    localStorage.removeItem("token"); 
    setToken(null); 
  };


   
  return ( //wrappar authprovider runt children, vilket gör att hela appen kan använda authcontext
    <AuthContext.Provider value={{ token, login, logout }}> {/*skickar med token, login och logout till alla komponenter*/}
      {children} 
    </AuthContext.Provider>
  );
};


export const useAuth = () => {  //ger safety access till authcontext
  const context = useContext(AuthContext); 
  if (!context) {
    
    throw new Error("useAuth måste användas inom en <AuthProvider>");
  } 
  return context;
};