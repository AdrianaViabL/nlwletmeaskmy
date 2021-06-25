import { createContext, ReactNode, useEffect, useState  } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextType = {
    user: User | undefined;
    signInGooogle: () => Promise<void>; 
  }

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);//forma de disponibilizar uma informação para todas as páginas do sistema

export function AuthContextProvider(props:AuthContextProviderProps){
    const [user, setUser] = useState<User>();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user){
          const { displayName, photoURL, uid} = user
          if (!displayName || !photoURL){
            throw new Error('Missing information from Google Account')
          }
          setUser({
            id: uid,
            name:displayName,
            avatar: photoURL
          })
        }
      })
      return () => {//sempre se deve descadastrar de um evento listner(useEffect) para que não haja erros ao sair da pagina, pois ele continua procurando se o usuário está cadastrado
        unsubscribe();
      }
    }, [])
  
    async function signInGooogle(){//essa função é enviada pelo contexto para ser possível ser feito login de qualquer parte da aplicação
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await auth.signInWithPopup(provider)
      if (result.user){
        const { displayName, photoURL, uid} = result.user
  
        if (!displayName || !photoURL){
          throw new Error('Missing information from Google Account')
        }
        setUser({
          id: uid,
          name:displayName,
          avatar: photoURL
        })
      } 
    }

    return (
    <AuthContext.Provider value={{ user, signInGooogle }}>
        {props.children }
    </AuthContext.Provider>
    );
}