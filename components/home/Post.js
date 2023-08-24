import { View, Text, Image,StyleSheet,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { db, firebase } from '../../firebase'
// import { Divider } from 'react-native-elements'


const Post = ({post}) => {
  return (
    <View style={{marginBottom: 30, marginTop:15}}>
        <PostHeader post={post} />
        <PostImage post={post} />
        <PostFooter post={post} />
        <View
        style={{
          borderBottomColor: 'lightgrey',
          borderBottomWidth: 0.2,
        }}
      />
    </View>
  )
}

const PostImage = ((post) => (
    <View style={{ width: '100%',height: 450,}}>
         {/* <Image source={{uri:post.imagUrl}} style={{height: '100%', resizeMode: 'cover'}} /> */}
         <Image source={require('../../assets/post.jpg')} style={{height: '100%', resizeMode: 'cover'}} />
    </View>
))
const PostHeader = ({ post }) => (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '5',
        alignItems: 'center'
    }} >
        <View style={{flexDirection: 'row' , alignItems: 'center'}}>
            <Image source={require('../../assets/profile.jpg')} style={styles.story} />
            <Text style={{color: 'white',marginLeft: 5,fontWeight: '900'}}>
                {post.user}
            </Text>
        </View>
        <Text style={{color: 'white', fontWeight: '900'}}>...</Text>
    </View>
)
const PostFooter = ({ post }) => {
    const [open, setOpen] = useState(false)
    const handlelike = post => {
        const currentLikes = !post.likes_by_user.includes(
            firebase.auth().currentUser.email
        )
        db.collection('users')
        .doc(post.owner_email)
        .collection('posts')
        .doc(post.id)
        .update({
            likes_by_user:currentLikes ? 
            firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email)
            :firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email)
        })
        .then(()=>{
           
        })
        .catch(error=>{
            console.log(error)
        })
    }
        return (
            <View style={styles.footerContainer}>
                {/* <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%'
                }}> */}
                    {/* left icons */}
                    <View style={styles.iconContainer}>
                        <TouchableOpacity
                          onPress={()=> handlelike(post)}
                        >
                            <Image
                                style={styles.icons}
                                source={post.likes_by_user.includes(firebase.auth().currentUser.email)?
                                    require('../../assets/rocketlike.png'):require('../../assets/rocket.png')
                                }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                style={styles.icons}
                                source={require('../../assets/comments.png')}
                            />
                        </TouchableOpacity>
                    </View>
                {/* </View> */}
    
                {/* likes */}
                <View>
                    <View style={{ marginVertical: 5, flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center' }}>
                        <Text style={{ color: 'white', fontSize: 12 }}>{post.likes_by_user.length } reactions</Text>
                        <Text style={{ color: 'white', fontSize: 12 }}>{post.comments.length} comments</Text>
                    </View>
                    {/* caption */}
                    <View style={{ flexDirection: 'row', justifyContent:'center',marginTop:5,alignItems: 'center' }}>
                        <Text style={{
                            color: 'white',
                            fontWeight: '900',
                            fontSize: 17
                        }}>{post.user + " "}
                            <Text style={{
                                color: 'lightgrey',
                                fontSize: 16
                            }}>{post.caption}
                            </Text>
                        </Text>
                    </View>
                </View>
                {/* comments */}
                <View>
                    {
                        post.comments && post.comments.length > 0 ?
                            <TouchableOpacity
                                onPress={() => setOpen(!open)}>
                                <Text style={{ color: 'grey', marginVertical: 5 }}
                                >
                                    {!open ? `View ${post.comments.length} comments` : "Hide Comments"}
                                </Text>
                            </TouchableOpacity>
                            : null
                    }
                    <View style={{ display: !open ? 'none' : 'flex' }}>
                        {
                            post && post.comments.map((comment, index) => {
                                return (
                                    <View key={index}>
                                        <View style={{
                                            flexDirection: 'row', alignItems: 'center',
                                            margin: 3
                                        }}>
                                            <Image
                                                style={{
                                                    height: 30, width: 30,
                                                    borderColor: 'lightblue',
                                                    borderWidth: 1,
                                                    borderRadius: 50
                                                }}
                                                source={{
                                                    uri: comment.image
                                                }} />
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    paddingLeft: 10
                                                }}>
                                                {comment.user}
                                            </Text>
                                        </View>
                                        <Text
                                            style={{
                                                color: 'grey', fontSize: 12,
                                                marginLeft: 45
                                            }}>
                                            {comment.comment}
                                        </Text>
                                    </View>
                                )
                            })
                        }
    
                    </View>
                </View>
            </View >
        )
    }
const styles = StyleSheet.create({
    story: {
      height: 35,
      width: 35,
      borderColor: 'lightblue',
      borderWidth: 1.6,
      borderRadius: 50,
      marginLeft: 6
    },
    footerContainer: {
        padding: 5,
        margin: 5
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    icons: {
        width: 30,
        height: 30,
        marginRight: 15,
        borderRadius: 10
    },
})
export default Post