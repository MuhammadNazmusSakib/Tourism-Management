import React, { useEffect, useState } from 'react'
import { Contex } from './Contex'
import auth from '../FireBase/Firebase.config'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const DataProvider = ({ children }) => {

    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
            }
            else {
                //  remove token 
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        })
        return () => {
            unSubscribe()
        }
    }, [axiosPublic])

    const userLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // update user profile
    const updateUserProfile = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
    }

    //  Google signIn
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    // Forgot Password..
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }



    const dataInfo = {
        user, setUser, createNewUser, logOut, userLogin, loading, updateUserProfile, googleSignIn, resetPassword
    }

    return (
        <Contex.Provider value={dataInfo}>
            {children}
        </Contex.Provider>
    )
}

export default DataProvider