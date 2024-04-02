import { View, Text} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../config/firebase'
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from "firebase/database";



export default function HomeScreen() {
    const navigation =useNavigation();
    const db = FIREBASE_DATABASE;

    const auth = FIREBASE_AUTH
    const [userData,setUserData] =useState();
    const [username,setUsername] = useState("");
    const [loading,setLoading] = useState(true);
    const [subscriptions,setSubscriptions] = useState();

    useEffect(()=>{
        if(userData){
            setUsername(userData.username);
            setSubscriptions(userData.subscriptions);
        }
        else{
            fetchData(auth.currentUser.uid);
        }
    },[loading])


    const fetchData=(uid)=>{
        const starCountRef = ref(db, 'users/' + uid);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setUserData(data);
            setLoading(false);
        });
    }

    const handleSignOut =()=>{
        auth
            .signOut()
            .then(()=>{
                navigation.navigate("Login");
            })
            .catch(error=>console.log(error));
    }
  return (
   !loading?
    <View className="h-full w-full mt-16">
        <View className="w-full flex-row justify-center items-center">
            <Text className="text-center text-xl font-bold mr-4">You have {userData.subscriptions?userData.subscriptions.length:0} Subscriptions</Text>
            <TouchableOpacity className="bg-sky-400 p-2 rounded-2xl mt-3" onPress={()=>handleSignOut()}>
                <Text className="text-xl font-bold text-white text-center">
                    Signout
                </Text>
            </TouchableOpacity>
        </View>
        <Text className="text-center text-xl font-bold mt-4">Hello {username}!</Text>
        {console.log(typeof(subscriptions))}
        
        {subscriptions?Object.keys(subscriptions).map(key=>{
            s = subscriptions[key];
            return(
            <TouchableOpacity key={key} className="flex-row bg-slate-200 p-2 rounded-2xl mt-3 mx-4 justify-center items-center">
                <View>
                    <Text>{s.companyName}</Text>
                    <Text>{s.price}</Text>
                    <Text>{s.startDate}</Text>
                    <Text>{s.endDate}</Text>
                    <Text>{s.type}</Text>
                </View>
                
                <Text></Text>
            </TouchableOpacity>)
        }):<></>}   
        <TouchableOpacity className="bg-sky-400 p-2 rounded-full mt-3 justify-center items-center mx-40" onPress={()=>navigation.navigate("Add")}>
            <Text>Add</Text>
        </TouchableOpacity>
    </View>:<></>
    
  )
}