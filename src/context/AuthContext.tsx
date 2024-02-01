import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../helpers/apiCommunicator";

type User = {
    name: string;
    email: string;
};
type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => void;
    signup: (name: string, email: string, password: string) => void;
    logout: () => void;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {

    },[]);
    const login=async(email:string,password:string)=>{
        const data=await loginUser(email,password);
        if(data){
            setUser({name:data.name,email:data.email});
            setIsLoggedIn(true);
        }
    };
    const signup=async(name:string,email:string,password:string)=>void{

    };
    const logout=()=>void{

    };

    return (
        <AuthContext.Provider value={{isLoggedIn,user,login,signup,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=()=>useContext(AuthContext);