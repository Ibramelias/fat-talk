import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, Alert, TextInput, StyleSheet, Button } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from 'expo-image-picker';
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from 'react-native-paper';



export default function SellItemsModal({ sellModal, setSellModal }) {

    const [desc, setDesc] = useState('');
    const [phoneChecked, setPhoneChecked] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);
    const [location, setLocation] = useState('')
    const [itemPrice, setItemPrice] = useState(0)
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "Appliances", value: "appliances" },
        { label: "Car", value: "car" },
        { label: "Mobile", value: "mobile" },
        { label: "Video Games", value: "video games" },
        { label: "Cloth", value: "cloth" },
    ]);

    // Function to pick an image
    const pickImage = async () => {
        // Ask for permissions
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Required', 'You need to allow access to the gallery.');
            return;
        }
        // Open image picker
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }


    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Denied", "Allow location access to continue.");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(`${location.coords.latitude}, ${location.coords.longitude}`);
    };




    return (
        <Modal
            visible={sellModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setSellModal(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* Header Section */}
                    <View style={styles.modalHeader}>
                        <Text style={styles.headerText}>Adding a new Product</Text>
                    </View>

                    {/* Modal Body */}
                    {/* <Text style={styles.modalText}>Sell HEREEEEE</Text> */}
                    <View style={styles.container}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder="Select a category"
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownContainer}
                            listItemContainerStyle={styles.listItem} // 
                        />
                    </View>
                    {/* Image Upload Section */}
                    <View style={{ alignItems: 'center', borderWidth: 1, borderColor: '#d3d3d3', width: 350, padding: 30, borderRadius: 5 }}>
                        <Text style={styles.label}>Upload a photo</Text>
                        <Button title="Choose Image" onPress={pickImage} />
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 10 }} />}
                    </View>

                    {/* Description  Section */}
                    <View style={styles.container}>
                        <TextInput
                            style={styles.textArea}
                            placeholder="Enter your description..."
                            multiline={true} // Enables multi-line input
                            numberOfLines={4} // Initial height (optional)
                            value={desc}
                            onChangeText={setDesc}
                        />
                    </View>


                    {/* Price & Location  Section */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.PriceContainer}>
                            {/* Price Input */}
                            <TextInput
                                style={styles.input}
                                placeholder="Sell for? 'Price"
                                value={itemPrice}
                                onChangeText={setItemPrice}
                                keyboardType="numeric"
                            />

                            {/* Location Input with Button Inside */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.locationInput}
                                    placeholder="Location"
                                    value={location}
                                    editable={false} // Prevent manual editing
                                />
                                <TouchableOpacity onPress={getLocation} style={styles.iconButton}>
                                    <Ionicons name="location-sharp" size={20} color="gray" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    <View style={{ marginVertical: 20, padding: 10, }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
                            How would you like to be contacted?
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {/* Phone Option */}
                            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 8 }}>
                                <View style={{ borderWidth: 1, borderColor: "lightgray", borderRadius: 5, padding: 1 }}>
                                    <Checkbox
                                        status={phoneChecked ? "checked" : "unchecked"}
                                        onPress={() => setPhoneChecked(!phoneChecked)}
                                        color={"#007bff"} // Blue checkbox when checked
                                    />
                                </View>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>Phone</Text>
                            </View>
                            {/* Email Option */}
                            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 8, }}>
                                <View style={{ borderWidth: 1, borderColor: "lightgray", borderRadius: 5, padding: 1 }}>
                                    <Checkbox
                                        status={emailChecked ? "checked" : "unchecked"}
                                        onPress={() => setEmailChecked(!emailChecked)}
                                        color={"#007bff"}
                                    />
                                </View>
                                <Text style={{ fontSize: 14, marginLeft: 10 }}>Email</Text>
                            </View>
                        </View>
                    </View>



                    {/* Save Button */}
                    <TouchableOpacity onPress={() => setSellModal(false)}>
                        <Text style={styles.saveButton}>Publish it</Text>
                    </TouchableOpacity>

                    {/* Close Button */}
                    <TouchableOpacity onPress={() => setSellModal(false)}>
                        <Text style={styles.closeButton}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end", // 👈 Push modal to bottom
        backgroundColor: "rgba(0, 0, 0, 0.5)", // 👈 Dark overlay
    },
    modalContent: {
        height: "93%", // 👈 Cover 70% of the screen
        backgroundColor: "white",
        borderTopLeftRadius: 25, // 👈 Rounded top corners
        borderTopRightRadius: 25,
        padding: 20,
        alignItems: "center",
    },
    modalHeader: {
        width: "100%",
        paddingVertical: 10,
        borderBottomWidth: 1, // 👈 Add a bottom border
        borderBottomColor: "#ccc",
        alignItems: "left",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    modalText: {
        fontSize: 18,
        marginVertical: 20,
        textAlign: "center",
    },
    closeButton: {
        marginTop: 20,
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        borderRadius: 5,
        width: 350,
        padding: 10,
        backgroundColor: 'red',
        textAlign: 'center'
    },

    saveButton: {
        marginTop: 20,
        fontSize: 16,
        color: "#000",
        fontWeight: "bold",
        borderRadius: 5,
        width: 350,
        padding: 10,
        backgroundColor: '#FFC72C',
        textAlign: 'center'
    },





    container: {
        // flex: 1,
        padding: 20,
    },
    dropdown: {
        borderColor: "#d3d3d3",
        borderWidth: 1,
        borderRadius: 5,
    },
    dropdownContainer: {
        borderColor: "#ccc",
    },
    listItem: {
        borderBottomWidth: 1, // 👈 Adds border between options
        borderBottomColor: "#ddd", // 👈 Light gray border
    },



    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    uploadButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 15,
    },
    uploadText: {
        color: "white",
        fontSize: 16,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginTop: 10,
    },

    textArea: {
        height: 100, // Adjust height as needed
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        textAlignVertical: "top", // Ensures text starts from the top
        width: 350,
        maxWidth: 350,
        minWidth: 350,
    },


    PriceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        // gap: 3,
    },
    input: {
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 5,
        padding: 15,
        fontSize: 14,
        width: "45%",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 5,
        width: "45%",
        paddingLeft: 15, // Space for text
    },
    locationInput: {
        flex: 1, // Take remaining space
        fontSize: 14,
        paddingVertical: 15, // Match the input height
    },
    iconButton: {
        padding: 10, // Add touchable area
    },

    Boxescontainer: {
        marginVertical: 20,
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    label: {
        fontSize: 14,
        marginLeft: 8,
    },
});
