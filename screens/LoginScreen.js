import { View, Text, Image } from 'react-native'
import React from 'react'
import LoginForm from "../components/login/LoginForm"

const LoginScreen = ({ navigation }) => {
    return (
        <>
        <View style={{backgroundColor: 'black',height: '100%'}}>
        <View style={{
                flexDirection: 'row',
                height: 250,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={require('../assets/logo.png')} style={{width: '100%',height: 100}}/>
            </View>
            <LoginForm navigation={navigation} />
        </View>
        </>
    )
}

export default LoginScreen