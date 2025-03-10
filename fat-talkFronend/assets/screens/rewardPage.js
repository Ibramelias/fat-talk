import React, { useState, useEffect, use } from 'react'
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import Navigation from '../../src/Navigation'
import API from '../../src/APIs/API'

export default function RewardPage({ navigation }) {
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);
    const [count, setCount] = useState({});

    // const handleIncrement = (id) => {
    //     data.map((item) => item.id === id ? setCount(count + 1 ) : '');

    // }

    // const handleDecrement = (id) => {
    //     setCount(count - 1)
    // }

    const handleInputValue = (e) => {
        setSearchValue(e.target.vaue)
    }

    // useEffect(() => {
    //   async function gettingData() {
    //     try{
    //         const res = await API.get('/photos');
    //         setData(res.data.slice(0, 100))

    //     }catch(error){
    //         console.log(error);
    //     }
    //   }
    //   gettingData();
    // },[])


    useEffect(() => {
        async function gettingData() {
            try {
                const res = await API.searchGifs('/photos');
                const initialData = res.data.slice(0, 10);
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
            [id]:  prevCounts[id] - 1, // Prevents going below 0
        }));
    };




    return (
        <SafeAreaView>
            <Text style={styles.container}> Gifs page</Text>
            <TextInput
                style={styles.textInput}
                placeholder='Search for a gif'
                onChange={(e) => handleInputValue(e)}
                value={searchValue}
            // value='dsadasdas'
            />
            <Text>See the Data Here</Text>
            <ScrollView>
                {data.map((item) => (
                    <View key={item.id} style={styles.dataContainer}>
                        <Text>Num:{item.id} - {item.title} Count on this: {count[item.id]}</Text>
                        <Image
                            source={{
                                uri: 'https://pictures.dealer.com/l/lamborghinisanantoniosa/0156/5367882396cd58dc319f439f802b64edx.jpg?impolicy=downsize_bkpt&imdensity=1&w=520',
                                height: 300,
                                padding: 10,
                                borderWidth: 1
                            }}
                        />
                        <TouchableOpacity onPress={() => handleIncrement(item.id)}>
                            <Text>+ Increment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDecrement(item.id)}>
                            <Text>- Decrement</Text>
                        </TouchableOpacity>
                    </View>
                ))}
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
    textInput: {
        height: 40,
        padding: 10,
        borderWidth: 1,
    },
    dataContainer: {
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'lightgray'


    }
})
