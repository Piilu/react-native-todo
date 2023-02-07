import { SafeAreaView, View, Text } from 'react-native'

const NoItems = () => {
    return (
        <SafeAreaView style={{ flexGrow: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>You don't have any tasks</Text>
        </SafeAreaView>
    )
}

export default NoItems