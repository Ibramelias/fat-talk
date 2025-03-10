import React from 'react'
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Navigation from '../../src/Navigation'

export default function Home({navigation}) {
  return (
    <View style={styles.Container}>
        <Text>Welcome, This is your home</Text>
        <Image 
            style={{borderRadius: 20}}
            source={{
            width: 200,
            height: 200,
            uri: "https://picsum.photos/200/300"}}/>
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