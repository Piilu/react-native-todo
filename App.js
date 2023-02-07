// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar, BottomNavigation, Button, Card, Drawer, IconButton } from 'react-native-paper';
import { useState } from 'react';
import TaskPage from './views/Task/TaskPage';
import ProfilePage from './views/Profile/ProfilePage';
// import { createDrawerNavigator } from '@react-navigation/drawer';

const MusicRoute = () => <TaskPage />

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;


const Stack = createNativeStackNavigator();

// eh it can be js
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TaskPage"
      >
        <Stack.Screen options={{
          headerTitle: "Testing title",
          headerRight: () => (
            <Button
              onPress={() => alert('Here will be profile')}
            > Profile</Button>
          )
        }}
          name="TaskPage"
          component={TaskPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function CustomNavigationBar({ navigation, back }) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Todo app" />
    </Appbar.Header>
  );
}
export default App;