import { createContext, useState, useContext } from "react";

const AuthContext = createContext(); //skapar instans av AuthContext

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  ); //hämtar token från localStorage och sparar i state, om ingen token finns så sätts den till null

  const login = (user) => { //vid login sparas en token i localStorage och i state
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user); //uppdaterar state med den nya token
  };

  const logout = () => { //tar bort token från localStorage och state vid logout
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const loadUser = async () => { //funktion för att hämta uppdaterad användardata från servern
    if (!currentUser?.id) return; //om currentUser inte finns eller saknar id, returnera direkt

    try {
      const res = await fetch(`http://localhost:3001/users/${currentUser.id}`); //hämta användardata med userId
      if (!res.ok) throw new Error("Failed to load user");
      const user = await res.json(); //parsar svar till JSON
      localStorage.setItem("currentUser", JSON.stringify(user)); //sparar nya användardata i localStorage
      setCurrentUser(user); //uppdaterar state med ny användardata
    } catch (err) {
      console.error("Error loading user:", err);
    }
  };

  return ( //wrappar authprovider runt children, vilket gör att hela appen kan använda authcontext
    <AuthContext.Provider value={{ currentUser, login, logout, loadUser }}> {/*skickar med token, login och logout till alla komponenter*/}
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
