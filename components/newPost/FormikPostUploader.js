import { View, Text, TextInput, Button, Image, ScrollView } from 'react-native'
import React, { useState,useEffect } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { db,firebase } from '../../firebase'

const Schema = yup.object({
    caption: yup.string().max(2200, "caption limit is reached")
})
const placeholder_img = 'https://i.ibb.co/182bP1y/4k.png'
const FormikPostUploader = ({navigation}) => {
    const [imageUrl, setImageUrl] = useState(placeholder_img)
    const [currentLoggedInUser, setCurrentLoggedinUser] = useState(null);
    const getUsername = () => {
        const user = firebase.auth().currentUser;
        const unsubscribe = db.collection('users')
        .where('owner_uid','==',user.uid).limit(1).onSnapshot(
            snapshot => snapshot.docs.map(doc=>{
                setCurrentLoggedinUser(
                    {
                        username : doc.data().username,
                        profile_picture : doc.data().profile_picture
                    })
            })
        )
        return unsubscribe
    }

    useEffect(()=>{
        getUsername()
    },[])

    const uploadPostToFirebase = (imageUrl,caption) => {
        const unsubscribe = db
        .collection('users')
        .doc(firebase.auth().currentUser.email).collection('posts').add({
            imageUrl: imageUrl,
            user: currentLoggedInUser.username ? currentLoggedInUser.username : "Unknown User",
            profile_picture: currentLoggedInUser.profile_picture ? currentLoggedInUser.profile_picture:'Unknown Porfile Picture',
            owner_uid : firebase.auth().currentUser.uid,
            caption: caption,
            createdAt : firebase.firestore.FieldValue.serverTimestamp(),
            likes: 0,
            likes_by_user: [],
            owner_email: firebase.auth().currentUser.email,
            comments: [],
        })
        .then(()=> navigation.goBack())
     return unsubscribe
    }
    return (
        <>
            <Formik
                initialValues={{
                    imageUrl: "",
                    caption: ""
                }}
                validationSchema={Schema}
                onSubmit={ (values) => {
                       uploadPostToFirebase(values.imageUrl,values.caption)
                    }}
            >
                {({ handleChange, errors, handleBlur, handleSubmit, values, isValid, isSubmitting }) => (
                    <ScrollView>
                        <View style={{margin: 20, justifyContent:'space-between',flexDirection:'row'}}>
                            <Image
                                style={{
                                    width: '100%',
                                    height: 300,
                                    resizeMode: 'cover'
                                }}
                                // source={{ uri: yup.string().url(imageUrl) ? imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJiT-UHSm6w0Jperb8SitpfoAKeMUE3uynPg5YO-2Drw&s" }}
                                source={require('../../assets/placeholderimg.png')}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.text} >Image Url</Text>
                            <TextInput
                                placeholder='Provide a valid Image Url'
                                style={styles.input}
                                onChange={(e) => { setImageUrl(e.nativeEvent.text) }}
                                onChangeText={
                                    handleChange('imageUrl')
                                }
                                onBlur={handleBlur('imageUrl')}
                                value={values.imageUrl}
                                multiline numberOfLines={3}
                            />
                            <Text style={styles.errorText} >
                                {errors.imageUrl && errors.imageUrl ? errors.imageUrl : ""}
                            </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.text}>About Image</Text>
                            <TextInput
                                placeholder='Write something about your post'
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption}
                                style={styles.input}
                                multiline numberOfLines={3}

                            />
                            <Text style={styles.errorText} >
                                {errors.caption && errors.caption ? errors.caption : ""}
                            </Text>

                            <Button onPress={handleSubmit} title={isSubmitting ? "Sharing....." : "Share"} disabled={!isValid} />
                        </View>
                    </ScrollView>
                )}
            </Formik >
        </>
    )
}

const styles = {
    inputContainer: {
        marginHorizontal: 10
    },
    input: {
        fontSize: 15,
        padding: 5,
        paddingLeft: 20,
        backgroundColor: 'lightgrey',
        marginVertical: 5,
        borderRadius: 10
    },
    text: {
        color: 'white'
    },
    errorText: {
        color: 'red',
    }
}
export default FormikPostUploader