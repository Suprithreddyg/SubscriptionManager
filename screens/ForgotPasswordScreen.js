import { View, Text, Image, ViewBase, TextInputComponent, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { FIREBASE_APP, FIREBASE_AUTH } from '../config/firebase'
import {signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth'



export default function ForgotPasswordScreen() {
    const navigation =useNavigation();
    const [email,setEmail]=useState('');
    const [password,setPassword] = useState('');
    const auth = FIREBASE_AUTH;

    useEffect(() => {
        console.log("auth",auth,"------------")
        auth.onAuthStateChanged(user=>{
            if(user){
                navigation.navigate("Home");
            }
        })
    }, [])

    const forgotPassword =()=>{
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert("Password reset email sent");
            navigation.push('Login');
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }

  return (
    <View className="bg-white h-full w-full">
        <StatusBar style="light" />
        <Animated.Image className="h-full w-full absolute" source={require('../assets/images/image1.jpeg')}/>
        <Animated.View entering={FadeIn.delay(400).duration(1000).springify().damping(3)} className="h-full w-full flex justify-around pt-40 pb-40">
            <View className="flex items-center">
                <Text className="text-black font-bold tracking-wider text-2xl" >Reset Your Password</Text>
            </View>
            <View className="flex items-center mx-4 space-y-4">
                <View className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="gray"
                        value={email}
                        onChangeText={(email)=>{setEmail(email)}}
                    />
                </View>
                <Animated.View entering={FadeInUp.delay(400).duration(1000).springify().damping(3)} className="flex-row justify-center">
                    <TouchableOpacity onPress={()=>forgotPassword()} className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                        <Text className="text-xl font-bold text-white text-center">Reset Password</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View entering={FadeInUp.delay(400).duration(1000).springify().damping(3)} className="flex-row justify-center">
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={()=>{
                        navigation.push('SignUp')
                        }}>
                        <Text className="text-sky-600">SignUp</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View entering={FadeInUp.delay(400).duration(1000).springify().damping(3)} className="flex-row justify-center">
                    <TouchableOpacity onPress={()=>{
                        navigation.push('Login')
                        }}>
                        <Text className="text-sky-600">Sign In?</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Animated.View>


    </View>
  )
}