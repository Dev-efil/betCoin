import { useState, createContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [getBet, setGetBet] = useState(0);
    // console.log("auth",auth);
    // console.log("from context",auth);
    // const login = (value) => {
    //     console.log("value",value);
    //     // const token = localStorage.getItem('token');
    //     setAuth(value);
    // }
    // const logout = () => {
    //     setAuth({});
    // }
    return (
        <AuthContext.Provider value={{ auth, setAuth, getBet, setGetBet }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;
