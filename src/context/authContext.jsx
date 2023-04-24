import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../fbConfig.jsx";

// creacion del contexto
export const authContext = createContext();

//creo una funcion para ejecutar el useContext en otros archivos
export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

//provider de autenticacion
export function AuthProvider({ children }) {
  const [userRegister, setUserRegister] = useState(null);
  const [userLogined, setUserLogined] = useState(null);
  const [loading, setLoading] = useState(true);

  // createUserWithEmailAndPassword() se utiliza para la creacion de un usuario
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //signInWithEmailAndPassword() se utiliza para logiar a un usuario
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password).then((user) => {
      setUserLogined(user);
    });
    return;
  };

  //signOut se utiliza para cerrar la sesion
  const logOut = async () => {
    try {
      return await signOut(auth);
    } catch (er) {
      console.log(er);
    }
  };

  //sirve para loguearse con la cuenta de google
  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    return await signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const valuesContext = {
    signUp,
    login,
    userRegister,
    userLogined,
    logOut,
    loading,
    loginWithGoogle,
    resetPassword,
  };

  useEffect(() => {
    //con onAuthStateChange obtengo la informacion de sesion del ultimo usuario ya sea registrado o logiado, es decir el estado
    onAuthStateChanged(auth, (currentUser) => {
      setUserRegister(currentUser);
      setLoading(false);
    });
  }, []);

  return (
    
    <authContext.Provider value={valuesContext}>
      {children}
    </authContext.Provider>
  );
}