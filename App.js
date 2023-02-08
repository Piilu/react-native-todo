import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskPage from './views/Task/TaskPage';

const Stack = createNativeStackNavigator();

// eh it can be js
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskPage">
        <Stack.Screen options={{headerTitle: "Tasks",}} name="TaskPage" component={TaskPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;