import React, {useState, useEffect, use} from 'react'
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Navigation from '../../src/Navigation'
import {Video} from 'expo-av'
import API from '../../src/APIs/API'

export default function Home({ navigation }) {

    const [items, setItems] = useState([]);

    console.log(items)


       async function gettingData() {
            try {
                const res = await API.callAllItems();
                const initialData = res.data
                setItems(initialData);
    
                // Initialize count state for each item with `0`
                const initialCounts = {};
                initialData.forEach((item) => {
                    initialCounts[item.id] = 0;
                });
                setCount(initialCounts);
            } catch (error) {
                console.log(error);
            }
        }
    
        useEffect(() => {
            gettingData();
        }, []);

    
    return (
        <View style={styles.Container}>
            <Text>Welcome to quacka marketPlace</Text>
            <Video
                source={require('../media/sneakers.mp4')}
                style={{ width: '98%', height: 650 }}
                // useNativeControls
                resizeMode="cover"
                shouldPlay
                isLooping
            />
            <Text>Shop Laptops</Text>
            {items?.map((item) => item.productType === "laptop") (
                
            )}
            <Text>Shop Video games</Text>
            <Text>Shop Sneakers</Text>


            {/* <Image 
            style={{borderRadius: 20}}
            source={{
            width: 200,
            height: 200,
            uri: "https://picsum.photos/200/300"}}/> */}
            {/* <View style={styles.BtnContainer}>
            <TouchableOpacity style={styles.Buttons} onPress={() => navigation.navigate('Contact us')}>
                <Text>Contact us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Buttons} onPress={() => navigation.navigate('About us')}>
                <Text>About us</Text>
            </TouchableOpacity>
            </View> */}
        </View>
    )
}


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },

    BtnContainer: {
        flexDirection: "row",
        justifyContent: 'space-around',
        marginHorizontal: 10,
    },

    Buttons: {
        backgroundColor: 'gray',
        padding: 15,
        borderRadius: 5,
        color: '#fff',
        marginHorizontal: 5,
    }
}) 