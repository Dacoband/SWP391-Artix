import React, { createContext, useState, useContext } from 'react';
import { User } from '../Interfaces/UserInterface';
import { useNavigate } from 'react-router-dom';
interface AuthContextType {
  auth: User | null; //User is the predefine interface for user login account
  storeUserData: (userData: any) => void; // Replace 'any' with the actual type of your user data
  logout:()=>void; //
}
// Define the context with the AuthContextType
export const AuthContext = createContext<AuthContextType>({
  auth: null, // Provide initial value for auth based on its type
  storeUserData: () => {}, // Provide a placeholder function for storeUserData
  logout:()=>{}
});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<AuthContextType['auth']>(null); // Use the 'auth' type from the context type
    // Function to store user data in sessionStorage
    const storeUserData = (userData: AuthContextType['auth']) => {
        // Save the user data in the state
        setAuth(userData);
        // Also update the sessionStorage
        sessionStorage.setItem('auth', JSON.stringify(userData));
    };
    //Log out the user
    const redirect = useNavigate()
    //useNavigate to rediract the user back to the login screen
    const logout = () => {
        // Clear the user data in the state
        setAuth(null);
        // Also clear the sessionStorage
        sessionStorage.removeItem('auth');
        redirect("/")
    };
    return (
        <AuthContext.Provider value={{ auth, storeUserData,logout }}>
            {children}
        </AuthContext.Provider>
    );
};
// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};