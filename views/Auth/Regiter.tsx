import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { useState } from "react"
import { auth } from "../../firebase"
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterPage = ({ navigation }) => {
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [passwordConfirm, setPasswordConfirm] = useState<string>()
    const [errorMessage, setErrorMessage] = useState<string>()

    const handleRegister = async () => {
        if (password === passwordConfirm) {
            await createUserWithEmailAndPassword(auth, email, password)
                .catch(error => {
                    setErrorMessage(error.message)
                })
        }
        else {
            setErrorMessage("Passwords doesn't match")
        }
    }

    return (
        <View style={styles.centeredView} >
            <View style={{marginHorizontal:25}}>
                <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
            </View>
            <View>
                <TextInput style={{ width: 300, marginBottom: 20 }} onChangeText={(text) => { setEmail(text) }} value={email} label="Email"></TextInput>
                <TextInput style={{ width: 300, marginBottom: 20 }} secureTextEntry={true} onChangeText={(text) => { setPassword(text) }} value={password} label="Password"></TextInput>
                <TextInput style={{ width: 300, marginBottom: 20 }} secureTextEntry={true} onChangeText={(text) => { setPasswordConfirm(text) }} value={passwordConfirm} label="Confirm password"></TextInput>
                <Button style={{ width: 300, marginBottom: 20 }} mode="contained" onPress={() => { handleRegister() }}>Register</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
export default RegisterPage