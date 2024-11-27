import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostList from './screens/Post';
import PostItem from './screens/Post/postItem';
import CreatePost from './screens/Post/createPost';
import { useWindowDimensions } from 'react-native';
import EditPost from './screens/Post/editPost';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function PostStack() {
  return (
    <Stack.Navigator initialRouteName="PostList"       
    screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen
        name="PostList"
        component={PostList}
        options={{ title: 'Lista de Postagens' }}

      />
      <Stack.Screen
        name="ItemPost"
        component={PostItem}
        options={{ title: 'Detalhes da Postagem' }}
      />
        <Stack.Screen
        name="EditPost"
        component={EditPost}
        options={{ title: 'Editar Postagem' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
      <Drawer.Navigator initialRouteName="PostStack" 
      screenOptions={{
        drawerActiveTintColor: '#FFFFFF',
        drawerActiveBackgroundColor: '#003CB3',
        drawerStyle: {
          width: 240,
        },
      }}>
        <Drawer.Screen
          name="PostStack"
          component={PostStack}
          options={{ title: 'Postagens' }}
        />
        <Drawer.Screen
          name="CreatePost"
          component={CreatePost}
          options={{ title: 'Criar Nova Postagem' }}
        />
      </Drawer.Navigator>
  );
}
