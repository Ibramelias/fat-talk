import React, { useState, useEffect, use } from 'react'
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Navigation from '../../src/Navigation'
import { Video } from 'expo-av'
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
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View>
                <Text>Welcome to quacka marketPlace</Text>
                <View style={styles.loginContianer}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => handleIncrement(item.id)}
                    >
                        <Text>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.signUp}
                        onPress={() => handleIncrement(item.id)}
                    >
                        <Text>Sign up</Text>
                    </TouchableOpacity>

                </View>
                <Video
                    source={require('../media/sneakers.mp4')}
                    style={{ width: '98%', height: 650, borderRadius: 5 }}
                    // useNativeControls
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                />
                {/* <ScrollView> */}
                <Text>Shop Video Games</Text>
                <SafeAreaView>
                    <View style={styles.gridContainer}>
                        {items
                            .filter(item => item.productType === "video games")
                            .map(item => (
                                <View key={item.id} style={styles.dataContainer}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={{
                                                uri: "https://pictures.dealer.com/l/lamborghinisanantoniosa/0156/5367882396cd58dc319f439f802b64edx.jpg?impolicy=downsize_bkpt&imdensity=1&w=520",
                                            }}
                                            style={styles.image}
                                        />
                                        <TouchableOpacity
                                            style={styles.likeButton}
                                            onPress={() => handleLike(item.id)}
                                        >
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: 10, gap: 5 }}>
                                        <Text style={{ fontWeight: "600", fontSize: 14 }}>
                                            {item.description}
                                        </Text>
                                        <Text style={{ fontWeight: "400", fontSize: 12 }}>
                                            {item.description}
                                        </Text>
                                        <View
                                            style={{
                                                marginTop: 10,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Text style={{ fontSize: 14, color: "gray", fontWeight: "500" }}>
                                                ${item.price}
                                            </Text>
                                            <Text style={{ fontWeight: "400", fontSize: 12 }}>
                                                {item.location}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.btnContainer}>
                                        <TouchableOpacity
                                            style={styles.buyBtn}
                                            onPress={() => handleIncrement(item.id)}
                                        >
                                            <Text>Add to cart</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                    </View>
                </SafeAreaView>

                <Text>Shop Cars</Text>
                <SafeAreaView>
                    <View style={styles.gridContainer}>
                        {items
                            .filter(item => item.productType === "car")
                            .map(item => (
                                <View key={item.id} style={styles.dataContainer}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={{
                                                uri: "https://pictures.dealer.com/l/lamborghinisanantoniosa/0156/5367882396cd58dc319f439f802b64edx.jpg?impolicy=downsize_bkpt&imdensity=1&w=520",
                                            }}
                                            style={styles.image}
                                        />
                                        <TouchableOpacity
                                            style={styles.likeButton}
                                            onPress={() => handleLike(item.id)}
                                        >
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: 10, gap: 5 }}>
                                        <Text style={{ fontWeight: "600", fontSize: 14 }}>
                                            {item.description}
                                        </Text>
                                        <Text style={{ fontWeight: "400", fontSize: 12 }}>
                                            {item.description}
                                        </Text>
                                        <View
                                            style={{
                                                marginTop: 10,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Text style={{ fontSize: 14, color: "gray", fontWeight: "500" }}>
                                                ${item.price}
                                            </Text>
                                            <Text style={{ fontWeight: "400", fontSize: 12 }}>
                                                {item.location}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.btnContainer}>
                                        <TouchableOpacity
                                            style={styles.buyBtn}
                                            onPress={() => handleIncrement(item.id)}
                                        >
                                            <Text>Add to cart</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                    </View>
                </SafeAreaView>

                <Text>Shop Laptops</Text>
                <SafeAreaView>
                    <View style={styles.gridContainer}>
                        {items
                            .filter(item => item.productType === "laptop")
                            .map(item => (
                                <View key={item.id} style={styles.dataContainer}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={{
                                                uri: "https://pictures.dealer.com/l/lamborghinisanantoniosa/0156/5367882396cd58dc319f439f802b64edx.jpg?impolicy=downsize_bkpt&imdensity=1&w=520",
                                            }}
                                            style={styles.image}
                                        />
                                        <TouchableOpacity
                                            style={styles.likeButton}
                                            onPress={() => handleLike(item.id)}
                                        >
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: 10, gap: 5 }}>
                                        <Text style={{ fontWeight: "600", fontSize: 14 }}>
                                            {item.description}
                                        </Text>
                                        <Text style={{ fontWeight: "400", fontSize: 12 }}>
                                            {item.description}
                                        </Text>
                                        <View
                                            style={{
                                                marginTop: 10,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Text style={{ fontSize: 14, color: "gray", fontWeight: "500" }}>
                                                ${item.price}
                                            </Text>
                                            <Text style={{ fontWeight: "400", fontSize: 12 }}>
                                                {item.location}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.btnContainer}>
                                        <TouchableOpacity
                                            style={styles.buyBtn}
                                            onPress={() => handleIncrement(item.id)}
                                        >
                                            <Text>Add to cart</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                    </View>
                </SafeAreaView>

            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    loginContianer: {
        width: '97%',
        marginVertical: 20, 
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'lightgray',

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
    },

    scrollViewContainer: {
        padding: 10,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // Ensures spacing between items
    },

    dataContainer: {
        width: '48%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'lightgray',
        backgroundColor: 'lightgray',
        position: "relative",
    },
    imageContainer: {
        position: "relative",
    },
    image: {
        width: '100%',
        height: 225,
        borderRadius: 5,
    },
    likeButton: {
        position: "absolute",
        top: 5,
        right: 5,
        //backgroundColor: "rgba(0, 0, 0, 0.5)", // Slight background for visibility
        borderRadius: 15,
        padding: 5,
    },
    btnContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        // padding: 10,
        marginTop: 5,
    },
    btnStyle: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 50,
        padding: 10,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    buyBtn: {
        borderRadius: 3,
        padding: 8,
        width: 100,
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        // alignContent: 'center',
        backgroundColor: '#FFC72C',
    },
    totalItems: {
        marginBottom: 10,
        fontSize: 14,
        fontWeight: 600,
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        // height: height * 0.8,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 10,
        color: '#007bff',
        fontWeight: 'bold',
    },
    signIn: {
        borderRadius: 3,
        margin: 5,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFC72C',
    },
    signUp: {
        borderRadius: 3,
        margin: 5,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
    },
})


