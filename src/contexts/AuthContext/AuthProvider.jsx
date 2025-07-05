import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const provider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuthLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const updateUserInfo = (userInfo) => {
        for (let key in userInfo) {
            setUser({ ...user, [key]: userInfo[key] });
        }

        return updateProfile(auth.currentUser, userInfo);
    }

    const createEmailUser = (email, password) => {
        setIsAuthLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginEmailUser = (email, password) => {
        setIsAuthLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logInWithGoogle = () => {
        setIsAuthLoading(true);
        return signInWithPopup(auth, provider);
    }

    const logOutUser = () => {
        setIsAuthLoading(true);
        return signOut(auth)
    }

    const authInfo = {
        user,
        isAuthLoading,
        updateUserInfo,
        createEmailUser,
        loginEmailUser,
        logInWithGoogle,
        logOutUser
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;