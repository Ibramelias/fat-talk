import React, { useState, useEffect, use } from 'react'
import { View, Text, TextInput, StyleSheet, Modal, SafeAreaView, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native'
import Navigation from '../../src/Navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../../src/APIs/API'
import { TouchableWithoutFeedback } from 'react-native';
import SellItemsModal from '../components/sellItemsModal'

export default function RewardPage({ navigation }) {
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);
    const [count, setCount] = useState({});
    const [sellModal, setSellModal] = useState(false);


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
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.seachContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Looking up for something"
                    onChangeText={(text) => setSearchValue(text)}
                    value={searchValue}
                />
                <TouchableWithoutFeedback style={styles.magnifyIcon}>
                    <Icon name="magnify" size={24} />
                </TouchableWithoutFeedback>
            </View>

            <Text style={styles.totalItems}>Total items: {data.length} </Text>

            {sellModal && (
                <SellItemsModal
                sellModal={sellModal}
                setSellModal={setSellModal}
                />
            )}

            {/* Sell Item Modal */}
            {/* <Modal
                visible={sellModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setSellModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Sell Your Item</Text>
                        <TouchableOpacity onPress={() => setSellModal(false)}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal> */}
            {/* Floating Sell Button */}
            <TouchableOpacity
                style={styles.sellItemBtn}
                onPress={() => setModalVisible(true)}
            >
                <Icon name="plus" size={30} color="white" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.gridContainer}>
                    {data.map((item) => (
                        <View key={item.id} style={styles.dataContainer}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{
                                        uri: "https://pictures.dealer.com/l/lamborghinisanantoniosa/0156/5367882396cd58dc319f439f802b64edx.jpg?impolicy=downsize_bkpt&imdensity=1&w=520",
                                    }}
                                    style={styles.image}
                                />
                                <TouchableOpacity style={styles.likeButton} onPress={() => handleLike(item.id)}>
                                    <Icon name="heart" size={24} color={liked[item.id] ? "red" : "white"} />
                                </TouchableOpacity>
                            </View>
                            <Text>{item.title} Count on this: {count[item.id]}</Text>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={styles.buyBtn} onPress={() => handleIncrement(item.id)}>
                                    <Text>Buy now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* ✅ Move the button outside ScrollView */}
            <TouchableOpacity style={styles.sellItemBtn} onPress={() => setSellModal(true)}>
                <Icon name="plus" size={30} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );

}


const { height } = Dimensions.get("window");

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
    sellItemBtn: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007bff', // Change to a visible color
        padding: 15,
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
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
        height: height * 0.8,
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
})
