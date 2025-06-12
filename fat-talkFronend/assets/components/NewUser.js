import React, { useReducer } from 'react';
import { Modal, Text, TouchableWithoutFeedback, View, TextInput, StyleSheet, Button } from 'react-native';
import API from '../../src/APIs/API';

const signUpForm = {
    userName: '',
    email: '',
    phone: '',
    password: '',
    consfirmPass: '',
    errors: {}
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_UserName':
            return { ...state, userName: action.payload, errors: { ...state.errors, userName: '' } };
        case 'SET_EMAIL':
            return { ...state, email: action.payload, errors: { ...state.errors, email: '' } };
        case 'SET_PHONE':
            return { ...state, phone: action.payload, errors: { ...state.errors, phone: '' } };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload, errors: { ...state.errors, password: '' } };
        case 'SET_CONFIRMPASS':
            return { ...state, confirmPass: action.payload, errors: { ...state.errors, consfirmPass: '' } };
        case 'SET_ERRORS':
            return { ...state, errors: action.payload };
        default:
            return state;
    }
};

export default function NewUser({ signUp, setSignUp }) {
    const [state, dispatch] = useReducer(reducer, signUpForm);

    const validateForm = (state) => {
        let errors = {};

        if (!state.userName.trim()) {
            errors.userName = 'Username is required';
        }

        if (!state.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errors.email = 'Enter a valid email';
        }

        if (!state.phone.match(/^\d{10}$/)) {
            errors.phone = 'Enter a valid 10-digit phone number';
        }

        if (state.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        if (state.password !== state.confirmPass) {
            errors.confirmPass = 'Passwords do not match';
        }

        return errors;
    };


    const handleSubmit = async () => {
        const errors = validateForm(state);
        if (Object.keys(errors).length > 0) {
            dispatch({ type: 'SET_ERRORS', payload: errors });
        } else {
            const newUser = {
                userName: state.userName,
                email: state.email,
                phone: state.phone,
                password: state.password,
                confirmPass: state.confirmPass
            };
            try {
                const response = await API.createNewUser(newUser);
                alert("You are all set")
                setSignUp(false)
            } catch (err) {
                alert("ERRRORRRRRR")
            }
        }
    };


    return (
        <Modal
            visible={signUp}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setSignUp(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.container}>
                        <Text style={styles.text}>Sign up</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='username'
                                value={state.userName}
                                onChangeText={(text) => dispatch({ type: 'SET_UserName', payload: text })}
                            />
                            {state.errors.userName && <Text style={styles.error}>{state.errors.userName}</Text>}
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='email'
                                value={state.email}
                                onChangeText={(text) => dispatch({ type: 'SET_EMAIL', payload: text })}
                            />
                            {state.errors.email && <Text style={styles.error}>{state.errors.email}</Text>}
                            <Text style={styles.label}>Phone</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='phone number'
                                value={state.phone}
                                onChangeText={(text) => dispatch({ type: 'SET_PHONE', payload: text })}
                            />
                            {state.errors.phone && <Text style={styles.error}>{state.errors.phone}</Text>}

                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.textInput}
                                placeholder='password'
                                value={state.password}
                                onChangeText={(text) => dispatch({ type: 'SET_PASSWORD', payload: text })}
                            />
                            {state.errors.password && <Text style={styles.error}>{state.errors.password}</Text>}

                            <Text style={styles.label}>Confirm password</Text>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.textInput}
                                placeholder='ConfirmPassword'
                                value={state.consfirmPassDDDSSDV}
                                onChangeText={(text) => dispatch({ type: 'SET_CONFIRMPASS', payload: text })}
                            />
                            {state.errors.confirmPass && <Text style={styles.error}>{state.errors.confirmPass}</Text>}

                            <TouchableWithoutFeedback onPress={handleSubmit} >
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>Sign up</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={() => setSignUp(true)}><Text style={styles.btnText}>Cancel</Text></TouchableWithoutFeedback>
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
        backgroundColor: "#fff",
        borderTopLeftRadius: 25, // 👈 Rounded top corners
        borderTopRightRadius: 25,
        padding: 20,
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        marginVertical: 20,
        textAlign: "center",
    },

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
    label: {
        fontSize: 16,
        fontWeight: 500,
        // marginBottom: 2,
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
    }, error: { color: 'red', fontSize: 12, marginBottom: 5 },

});
