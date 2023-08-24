import { View, TouchableOpacity, Image } from 'react-native'
import React, {  useState } from 'react'

const BottomTabs = () => {
    const [activeTab, setActiveTab] = useState('Home')
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 5,
            width: '100%',
            backgroundColor: 'black',
        }}>
            <TouchableOpacity
                onPress={() => setActiveTab('Home')}
            >
                <Image
                    style={{
                        width: 30,
                        height: 30,
                        margin: 5,
                        borderRadius: 8,
                        backgroundColor: activeTab === 'Home' ? 'orange' : 'black'
                    }}
                    source={require('../../assets/home.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setActiveTab('Search')}
            >
                <Image
                    style={{
                        width: 30,
                        height: 30,
                        margin: 5,
                        borderRadius: 8,
                        backgroundColor: activeTab === 'Search' ? 'orange' : 'black'
                    }}
                    source={require('../../assets/search.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setActiveTab('Reels')}
            >
                <Image
                    style={{
                        width: 30,
                        height: 30,
                        margin: 5,
                        borderRadius: 8,
                        backgroundColor: activeTab === 'Reels' ? 'orange' : 'black'
                    }}
                    source={require('../../assets/calender.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setActiveTab('Cart')}
            >
                <Image
                    style={{
                        width: 45,
                        height: 45,
                        borderRadius: 8,
                        backgroundColor: activeTab === 'Cart' ? 'orange' : 'black'
                    }}
                    source={require('../../assets/cart.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setActiveTab('Avatar')}
            >
                <Image
                    style={{
                        width: 35,
                        height: 35,
                        margin: 5,
                        borderRadius: 50,
                        backgroundColor: activeTab === 'Avatar' ? 'orange' : 'black'
                    }}
                    source={require('../../assets/profile.jpg')}
                />
            </TouchableOpacity>
        </View>

    )
}

export default BottomTabs