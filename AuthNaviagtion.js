
import React,{useEffect, useState} from 'react'
import {firebase} from './firebase'
import { SignInStack, SignOutStack } from './Navigation'

const AuthNaviagtion = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const useHandler = (user) => user? setCurrentUser(user) : setCurrentUser(null)
    useEffect(() => 
        firebase.auth().onAuthStateChanged(user => useHandler(user))
    , [])
    
  return (
   <> {currentUser ? <SignInStack /> : <SignOutStack /> } </>
  );
}

export default AuthNaviagtion