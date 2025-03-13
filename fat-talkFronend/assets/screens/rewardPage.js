import React, { useState, useEffect, use } from 'react'
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import Navigation from '../../src/Navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../../src/APIs/API'
import { TouchableWithoutFeedback } from 'react-native';

export default function RewardPage({ navigation }) {
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);
    const [count, setCount] = useState({});


    const [liked, setLiked] = useState({});

    const handleLike = (id) => {
        setLiked((prevLiked) => ({
            ...prevLiked,
            [id]: !prevLiked[id],
        }));
    };

    const handleInputValue = (e) => {
        setSearchValue(e.target.vaue)
    }

    useEffect(() => {
        async function gettingData() {
            try {
                const res = await API.searchGifs('/photos');
                const initialData = res.data.slice(0, 50);
                setData(initialData);

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
        gettingData();
    }, []);

    const handleIncrement = (id) => {
        setCount((prevCounts) => ({
            ...prevCounts,
            [id]: prevCounts[id] + 1,
        }));
    };

    const handleDecrement = (id) => {
        setCount((prevCounts) => ({
            ...prevCounts,
            [id]: prevCounts[id] - 1, // Prevents going below 0
        }));
    };




    return (
        <SafeAreaView>
            {/* <Text style={styles.container}> Gifs page</Text> */}
            <View style={styles.seachContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Looking up for something'
                    onChange={(e) => handleInputValue(e)}
                    value={searchValue}
                // value='dsadasdas'
                />
                <TouchableWithoutFeedback style={styles.magnifyIcon}>
                    <Icon name="magnify" size={24} />
                </TouchableWithoutFeedback>
            </View>
                <Text style={styles.totalItems}>Total items: {data.length} </Text>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.gridContainer}>
                    {data.map((item) => (
                        <View key={item.id} style={styles.dataContainer}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{
                                        uri: 'https://pictures.dealer.com/l/lamborghinisanantoniosa/0156/5367882396cd58dc319f439f802b64edx.jpg?impolicy=downsize_bkpt&imdensity=1&w=520',
                                    }}
                                    style={styles.image}
                                />
                                <TouchableOpacity style={styles.likeButton} onPress={() => handleLike(item.id)}>
                                    <Icon name="heart" size={24} color={liked[item.id] ? "red" : "white"} />
                                </TouchableOpacity>
                            </View>
                            <Text>{item.title} Count on this: {count[item.id]}</Text>
                            <View style={styles.btnContainer}>
                                {/* <TouchableOpacity style={styles.btnStyle} onPress={() => handleDecrement(item.id)}>
                                    <Text>-</Text>
                                </TouchableOpacity> */}
                                {/* <TouchableOpacity style={styles.btnStyle} onPress={() => handleIncrement(item.id)}>
                                    <Text>+</Text>
                                </TouchableOpacity> */}
                                    <TouchableOpacity style={styles.buyBtn} onPress={() => handleIncrement(item.id)}>
                                    <Text>Buy now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            {/* <Button title='Back to Home page' onPress={() => navigation.navigate('Home')}/> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    seachContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 20,
        paddingHorizontal: 15,
        marginHorizontal: 15,
        marginTop: 15,
        backgroundColor: "#fff",
        marginBottom: 15,
    },
    textInput: {
        flex: 1,
        height: 40,
        paddingLeft: 10,
    },
    magnifyIcon: {
        position: "absolute",
        left: 1,
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
        // backgroundColor: 'lightgray',
        position: "relative",
    },
    imageContainer: {
        position: "relative",
    },
    image: {
        width: '100%',
        height: 150,
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
        // borderColor: 'gray',
        borderRadius: 3,
        padding: 8,
        // height: 40,
        width: 100,
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        // alignContent: 'center',
        backgroundColor: '#FFC72C',
    },
    totalItems:{
        marginBottom: 10,
        fontSize: 14,
        fontWeight: 600,
        marginLeft: 10,
    }
})
