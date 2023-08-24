import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { users } from "../../data/users"

const Stories = () => {
  return (
    <>
      <View style={styles.storyContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {
            users.map((story, index) => (
                  <View key ={index} style={styles.avatarContainer}>
                    <Image
                      style={styles.avatar}
                      // source={{uri: 'https://reactjs.org/logo-og.png'} }
                      source={require('../../assets/timer.png')}
                       />
                    <Text style={styles.avatarName}>{story.name.length > 10 ? story.name.slice(0, 10) + "..." : story.name}</Text>
                  </View>
            ))
          }
        </ScrollView>
      </View>
      <View
        style={{
          borderBottomColor: 'lightgrey',
          borderBottomWidth: 0.2,
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
    storyContainer: {
      flexDirection: "row"
    },
    avatarContainer: {
      margin: 10,
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      height: 50,
      width: 50,
      padding:5,
      borderColor: 'lightblue',
      borderWidth: 2,
      borderRadius: 50
    },
    avatarName: {
      paddingTop:5,
      color: 'white'
    }
})
export default Stories