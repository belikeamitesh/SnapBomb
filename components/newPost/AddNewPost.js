import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import FormikPostUploader from './FormikPostUploader'

const AddNewPost = ({navigation}) => {
    return (
        <View>
            <Header navigation={navigation}/>
        </View>
    )
}

const Header = ({navigation}) => {
    return (
        <>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                  onPress={()=>navigation.goBack()}
                >
                    <Image
                        style={styles.icon}
                        source={require('../../assets/back.png')}
                    />
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 25, fontWeight:'900', marginLeft: 60 }}>NEW CAPSULE</Text>
            </View>
            <FormikPostUploader navigation={navigation}/>
        </>
    )
}
const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
        margin: 5,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        marginLeft: 20
    }
})

export default AddNewPost