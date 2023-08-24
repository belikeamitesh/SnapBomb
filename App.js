import { View } from "react-native";
import React,{useEffect, useState} from 'react'
import {firebase} from './firebase'
import { SignInStack, SignOutStack } from "./Navigation";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const useHandler = (user) => user? setCurrentUser(user) : setCurrentUser(null)
  useEffect(() => 
      firebase.auth().onAuthStateChanged(user => useHandler(user))
  , [])
  return (
    <View
      style={{
        flex: 1,
        marginTop: 16
      }}
    >
     {currentUser ? <SignInStack /> : <SignOutStack /> }
    </View>
  );
}
