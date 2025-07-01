import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const provider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    },[])

    const updateDisplayName = (userInfo) => {
        setUser({ ...user, displayName: userInfo.displayName })
        return updateProfile(auth.currentUser, userInfo);
    }

    const createEmailUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginEmailUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logInWithGoogle = () => {
        return signInWithPopup(auth, provider);
    }

    const logOut = () => {
        return signOut(auth)
    }

    const authInfo = {
        user,
        loading,
        updateDisplayName,

        createEmailUser,
        loginEmailUser,
        logInWithGoogle,
        logOut
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;