import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './views/Auth/Login';
import RegisterPage from './views/Auth/Regiter';
import TaskPage from './views/Task/TaskPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useState } from 'react';
import { Button } from 'react-native-paper';
import { signOut } from "firebase/auth"
const Stack = createNativeStackNavigator();

// eh it can be js
function App({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  });

  const handleLogOut = async () => {
    await signOut(auth);
  }
  return (
    <NavigationContainer>
      <Stack.Navigator >
        {
          isLoggedIn ?
            (<Stack.Screen options={{
              headerTitle: "Tasks", headerRight: () => (
                <Button onPress={() => { handleLogOut() }}>Log out</Button>
              )
            }} name="TaskPage" component={TaskPage} />
            ) :
            <>
            <Stack.Screen options={{ headerTitle: "Login", }} name="LoginPage" component={LoginPage} /> 
            <Stack.Screen options={{ headerTitle: "Register", }} name="RegisterPage" component={RegisterPage} />
            </>
            }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;