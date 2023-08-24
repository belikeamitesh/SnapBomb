import { View, Text, Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import {firebase} from '../../firebase';

const Header = ({navigation}) => {
    const handleSignout = async () => {
    try{
        await firebase.auth().signOut()
        console.log("Singed out")
    }
    catch(error)
    {
        console.log(error)
    }}
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleSignout}> 
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
        </TouchableOpacity>
        <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={()=> navigation.push('NewPostScreen')}> 
                <Image style={styles.icons} source={require('../../assets/timer.png')} />
            </TouchableOpacity>
            <TouchableOpacity> 
                <Image style={styles.iconsand} source={require('../../assets/sandtimer.png')} />
            </TouchableOpacity>
            <TouchableOpacity> 
                <View style={styles.unreadBadge}>
                    <Text style={styles.unreadBadgeText}>11</Text>
                </View>
                <Image style={styles.iconmessage} source={require('../../assets/message.png')} />
            </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create(
    {
        container: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection:'row'
        },
        iconsContainer:{
            flexDirection:'row'
        },
        logo: {
            width: 100,
            height : 50,
            resizeMode: 'contain',
        },
        icons: {
            width: 30,
            height: 30,
            marginLeft: 10,
            resizeMode: 'contain'
        },
        iconsand: {
            width: 38,
            height: 38,
            marginTop: -3,
            marginLeft: 10,
        },
        iconmessage: {
            width: 35,
            height: 35,
            marginTop: -3,
            marginLeft: 10,
            resizeMode: 'contain'
        },
        unreadBadge:{
            backgroundColor: '#FF3250',
            position: 'absolute',
            left:20,
            bottom: 18,
            width: 25,
            height: 18,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
        },
        unreadBadgeText: {
            color: 'white',
            fontWeight: '600',
        },
    }
)
export default Header