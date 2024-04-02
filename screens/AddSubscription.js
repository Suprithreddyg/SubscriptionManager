import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TextInput } from 'react-native'
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '../config/firebase'
import { ref, set, onValue} from "firebase/database";
import { DatePickerInput } from 'react-native-paper-dates';
import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


export default function AddSubscription() {

    const navigation =useNavigation();
    const [companyName, setCompanyName] =useState("");
    const [price, setprice] = useState("");
    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [type,setType] = useState("");
    const dropdownData = [
        { label: 'Trial', value: 'Trial' },
        { label: 'Weekly', value: 'Weekly' },
        { label: 'Monthly', value: 'Monthly' },
        { label: 'Yearly', value: 'Yearly' },
      ];

    const writeUserData = ()=> {
        const db = FIREBASE_DATABASE;
        const uid = FIREBASE_AUTH.currentUser.uid;

        var availableSubcriptions;
        var data;

        if(companyName=="" || type=="" || price=="" || startDate=="" || endDate==""){
            Alert.alert("Please Enter All the fields");
        }
        else{
            var jsonData = {
                companyName:companyName,
                type:type.value,
                price:price,
                startDate:startDate.toLocaleDateString(),
                endDate:endDate.toLocaleDateString()
            }
    
            const starCountRef = ref(db, 'users/' + uid);
            onValue(starCountRef, (snapshot) => {
                data = snapshot.val();
                availableSubcriptions = data.availableSubcriptions;
            });
            availableSubcriptions++;
    
            set(ref(db,"users/"+uid), {
                ...data,
                "availableSubcriptions": availableSubcriptions,
            });
    
            set(ref(db,"users/"+uid+"/subscriptions/"+availableSubcriptions), jsonData);
            Alert.alert("Success");
        }
      }
  return (
    <View className="bg-white h-full w-full">
        <StatusBar style="light" />
        <View className="h-full w-full flex justify-around pt-40 pb-40">
            <View className="flex items-center">
                <Text className="text-black font-bold tracking-wider text-2xl" >Add your Subscription</Text>
            </View>
            <View className="flex items-center mx-4 space-y-4">
                <View className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput
                        placeholder="Company Name"
                        placeholderTextColor="gray"
                        value={companyName}
                        onChangeText={(companyName)=>{setCompanyName(companyName)}}
                    />
                </View>
                <View className="flex-row justify-center w-full ">
                    <View className="bg-black/5 rounded-2xl w-32 p-4 mr-4">
                        <TextInput
                            placeholder="Price"
                            placeholderTextColor="gray"
                            value={price}
                            keyboardType='numeric'
                            onChangeText={(price)=>{setprice(price)}}
                        />
                    </View>
                    <View className="bg-black/5 rounded-2xl w-60">
                        <Dropdown
                            className="m-2 "
                            placeholderStyle={{textAlign:'center'}}
                            // selectedTextStyle={{fontSize: 16}}
                            // inputSearchStyle={{height: 40,fontSize: 16}}
                            iconStyle={{}}
                            data={dropdownData}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Type of Subcription"
                            value={type}
                            onChange={type => setType(type)}
                            />
                    </View>
                </View>
                <View className="flex-row justify-center w-full p-8">
                    <View className="w-40 mr-10">
                        <DatePickerInput
                            className ="bg-black/5 rounded-2xl"
                            label="Start Date"
                            value={startDate}
                            onChange={(startDate)=>{setstartDate(startDate)}}
                            />
                    </View>
                    <View className="w-40">
                        <DatePickerInput
                            className ="bg-black/5 rounded-2xl w-40"
                            label="End Date"
                            value={endDate}
                            onChange={(endDate)=>{setendDate(endDate)}}
                            />
                    </View>
                </View>
                
                <View className="flex-row justify-center">
                    <TouchableOpacity onPress={()=>{writeUserData()}} className="w-40 mr-10 bg-sky-400 p-3 rounded-2xl mb-3">
                        <Text className="text-xl font-bold text-white text-center">Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Home")}} className="w-40  bg-red-400 p-3 rounded-2xl mb-3">
                        <Text className="text-xl font-bold text-white text-center">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  )
}