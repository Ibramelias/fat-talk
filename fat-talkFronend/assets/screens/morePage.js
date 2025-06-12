import React, { useState } from 'react'
import { View, TextInput, TouchableWithoutFeedback, Text, Button, StyleSheet } from 'react-native'
import NewUser from '../components/NewUser'

export default function Profile() {

    const [signUp, setSignUp] = useState(false)
    return (
        <View style={styles.container}>
            {signUp && (
                <NewUser
                    signUp={signUp}
                    setSignUp={setSignUp}
                />
            )}
            <Text style={styles.text}>Welcome, Login</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder='username'
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.textInput}
                    placeholder='password'
                />
                <TouchableWithoutFeedback >
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Log in</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setSignUp(true)}><Text style={styles.btnText}>Don't have an account?</Text></TouchableWithoutFeedback>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        gap: 15,
        width: "100%",
        backgroundColor: '#fff'

        // margin: 0,
    },
    text: {
        fontSize: 24
    },
    inputContainer: {
        gap: 10
    },
    textInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 3,
        width: 250,
        maxWidth: 250,
        fontSize: 14,
        backgroundColor: '#fff',
        padding: 10,

    },
    btn: {
        borderColor: '#ccc',
        borderWidth: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFC72C',
    },
    btnText: {
        fontSize: 14,
        fontWeight: 400,
    }

})
