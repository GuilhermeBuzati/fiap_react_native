import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostList from './screens/Post';
import PostItem from './screens/Post/postItem';
import CreatePost from './screens/Post/createPost';
import EditPost from './screens/Post/editPost';
import TeacherList from './screens/Teacher';
import CreateTeacher from './screens/Teacher/createTeacher';
import EditTeacher from './screens/Teacher/editTeacher';
import Login from './screens/Login';

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

function TeacherStack() {
  return (
    <Stack.Navigator initialRouteName="TeacherList"       
    screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen
        name="TeacherList"
        component={TeacherList}
        options={{ title: 'Lista de Professores' }}

      />
        <Stack.Screen
        name="EditTeacher"
        component={EditTeacher}
        options={{ title: 'Editar Professor' }}
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
        <Drawer.Screen
          name="TeacherStack"
          component={TeacherStack}
          options={{ title: 'Professores' }}
        />
        <Drawer.Screen
          name="CreateTeacher"
          component={CreateTeacher}
          options={{ title: 'Cadastrar Professor' }}
        />
        <Drawer.Screen
          name="LoginProfessor"
          component={Login}
          options={{ title: 'Login' }}
        />
      </Drawer.Navigator>
  );
}
