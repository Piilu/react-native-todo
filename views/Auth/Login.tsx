import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { useState } from "react"
import {
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from "../../firebase"

const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [errorMessage, setErrorMessage] = useState<string>()

    const handleLogin = async () => {
        await signInWithEmailAndPassword(auth, email, password).then(cred => {
            navigation.replace("TaskPage")
        })
            .catch(error => {
                setErrorMessage(error.message)
            })
    }

    const handleNavigateRegister = () => {
        navigation.navigate("RegisterPage")
    }

    return (
        <View style={styles.centeredView} >
            <View style={{ marginHorizontal: 25 }}>
                <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
            </View>
            <View>
                <TextInput style={{ width: 300, marginBottom: 20 }} onChangeText={(text) => { setEmail(text) }} value={email} label="Email"></TextInput>
                <TextInput style={{ width: 300, marginBottom: 20 }} secureTextEntry={true} onChangeText={(text) => { setPassword(text) }} value={password} label="Password"></TextInput>
                <Button style={{ width: 300, marginBottom: 20 }} mode="contained" onPress={() => { handleLogin() }}>Login</Button>
                <Button style={{ width: 300, marginBottom: 20 }} mode="outlined" onPress={() => { handleNavigateRegister() }}>Register</Button>
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

export default LoginPage