import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostItem from './screens/Post/postItem';
import PostList from './screens/Post';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Post">
        <Stack.Screen name="Post" component={PostList} />
        <Stack.Screen name="ItemPost" component={PostItem} />
      </Stack.Navigator>
  );
}
