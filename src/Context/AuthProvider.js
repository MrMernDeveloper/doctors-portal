import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext()
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const updateUser = (userInfo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, userInfo);
    }
    const signIn = (email, password) => {
        setLoading(true)
        
        return signInWithEmailAndPassword(auth, email, password)
    };
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    };

    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubsCribe = onAuthStateChanged(auth, currentUser => {
            console.log('user observing')
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubsCribe();
    }, []);
    const authInfo = { user, createUser, signIn, logOut, updateUser, loading, forgetPassword }
    return (
        <AuthContext.Provider  value={authInfo} >
            {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;