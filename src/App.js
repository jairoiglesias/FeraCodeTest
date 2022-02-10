
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Fixture from './screens/Fixture';
import Classification from './screens/Classification';
import TeamDetail from './screens/TeamDetail';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgb(9, 92, 75)',}}>
        <Stack.Navigator>
          
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="Fixture" component={Fixture} options={{headerShown: false}}/>
          <Stack.Screen name="Classification" component={Classification} options={{headerShown: false}}/>
          <Stack.Screen name="TeamDetail" component={TeamDetail} options={{headerShown: false}}/>

        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;