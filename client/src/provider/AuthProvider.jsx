import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


export const  AuthContext = createContext(null)

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    // create user
    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // sign-In
    const signIn = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    // google-signIn
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    // logOut
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // update user profile
    const updateUserProfile = (name,photo) => {
        return updateProfile(auth.currentUser, {
            displayName : name,
            photoURL : photo
        })
    }


    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser)
            console.log('CurrentUser-->', currentUser)
            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    },[])




    const authInfo = {
        user,setUser,loading,setLoading,createUser,signIn,signInWithGoogle,logOut,updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;