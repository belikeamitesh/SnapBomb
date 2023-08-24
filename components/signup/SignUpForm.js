import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from "yup";
import { Alert } from 'react-native';
import { useContext } from 'react';
import {firebase,db} from '../../firebase';


const getRandomAvatar = async () => {
    const res = await fetch("https://randomuser.me/api")
    const data = await res.json()
    return data.results[0].picture.large
}
const SignUpFormSchema = yup.object({
    email: yup.string().email('provide an valid email').required("required field"),
    username: yup.string().min(4, "should be of  minimum 4 characters").required('required field'),
    password: yup.string().min(8, 'password should be of minimum 8 characters').required('required field')
})
const SignUpForm = ({ navigation }) => {
    const onSignup = async(email,password,username) => {
        try{
          const authUser = await firebase.auth().createUserWithEmailAndPassword(email,password);
          console.log("Signup succesful",email,password)
          db.collection('users').doc(authUser.user.email)
          .set({
            owner_uid: authUser.user.uid,
            username : username,
            email: authUser.user.email,
            profile_picture : await getRandomAvatar(),
        })
        } catch(error){
          Alert.alert('Invalid email or password',error.message)
        }
      }
    return (
        <Formik
            initialValues={{ email: '', username: '', password: '' }}
            validationSchema={SignUpFormSchema}
            onSubmit={async (values) => {
                try {
                   onSignup(values.email,values.password,values.username)
                } catch (e) {
                    Alert.alert("Error while Signing Up, Try Again with different username or email")
                }
            }}
        >
            {({ handleChange, errors, touched, handleBlur, handleSubmit, values, isValid, isSubmitting }) => (
                <>
                    <View style={{ padding: 20 }}>
                        <TextInput style={styles.input}
                            placeholder='Email'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        <Text style={styles.errorText} >
                            {errors.email && touched.email && errors.email ? errors.email : ""}
                        </Text>
                        <TextInput style={styles.input}
                            placeholder='Username'
                            autoCapitalize='none'
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                        <Text style={styles.errorText} >
                            {errors.username && touched.username && errors.username ? errors.username : ""}
                        </Text>
                        <TextInput style={styles.input}
                            placeholder='Password'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        <Text style={styles.errorText} >
                            {errors.password && touched.password && errors.password ? errors.password : ""}
                        </Text>
                        <Button onPress={handleSubmit} disabled={!isValid} title={isSubmitting ? "Registering..." : "Sign up"} />
                    </View>

                    {/* bottom view */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 25 }}>
                        <Text style={{color:'white'}}>Already have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{ color: '#6880F5', fontWeight: '600', marginLeft: 2 }}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </Formik>
    )
}
const styles = StyleSheet.create({
    input: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        backgroundColor: 'white'
    },
    errorText: {
        color: 'red',
    }
})
export default SignUpForm