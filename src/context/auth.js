import { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext({});

const useAuth = () => {
    return useContext(AuthContext);
  };

function AuthProvider({children}) {    
    const [user, setUser] = useState("");  
    const isAuthenticated =!!user;
    return(
    <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
        {children}
    </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider, useAuth }