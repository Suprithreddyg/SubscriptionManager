import { View, Text, Image, ViewBase, TextInputComponent, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Animated, { FadeIn, FadeInUp, FadeOutUp } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../config/firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { ref, set } from "firebase/database";

export default function SignupScreen() {
    const navigation =useNavigation();

    const [name,setName] = useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const auth = FIREBASE_AUTH;

    const handleSignUp = ()=>{
        // if(password!==confirmPassword){
        //     Alert.alert("Passwords not matched")
        // }
        if(name==""){
            Alert.alert("Enter Name")
        }
        else{
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
              const user = userCredential.user;
            //   console.log(user.uid)
              writeUserData(user.uid, name, email)
              setName('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
              Alert.alert("Successfully Registered");
              navigation.push('Login');
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              Alert.alert(errorMessage); 
            });
            
        }    
    }

    function writeUserData(uid, name, email) {
        const db = FIREBASE_DATABASE;
        set(ref(db,"users/"+uid ), {
            "email":email,
            "username": name,
            "availableSubcriptions":0,
            "subcriptions":{}
        });
      }
    
    
  return (
    <View className="bg-white h-full w-full">
        <StatusBar style="light" />
        <Animated.Image className="h-full w-full absolute" source={require('../assets/images/image1.jpeg')}/>
        <Animated.View entering={FadeIn.delay(400).duration(1000).springify().damping(3)} className="h-full w-full flex justify-around pt-40 pb-40">
            <View className="flex items-center">
                <Text className="text-black font-bold tracking-wider text-4xl" >Sign Up</Text>
            </View>
            <View className="flex items-center mx-4 space-y-4">
                <View className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput
                        placeholder="Name"
                        placeholderTextColor="gray"
                        value={name}
                        onChangeText={(name)=>setName(name)}
                    />
                </View>
                <View className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="gray"
                        value={email}
                        onChangeText={(email)=>setEmail(email)}
                    />
                </View>
                <View className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput
                            placeholder="Password"
                            placeholderTextColor="gray"
                            value={password}
                            onChangeText={(password)=>setPassword(password)}
                            secureTextEntry
                        />
                </View>
                <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                    <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor="gray"
                            value={confirmPassword}
                            onChangeText={(password)=>setConfirmPassword(password)}
                            secureTextEntry
                        />
                </View>
                <Animated.View entering={FadeInUp.delay(400).duration(1000).springify().damping(3)} className="w-full">
                    <TouchableOpacity onPress={()=>handleSignUp()} className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                        <Text className="text-xl font-bold text-white text-center">Sign Up</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View entering={FadeInUp.delay(400).duration(1000).springify().damping(3)} className="flex-row justify-center">
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={()=>{navigation.push('Login')}}>
                        <Text className="text-sky-600">Login</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Animated.View>


    </View>
  )
}