import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostList from './screens/Post';
import PostItem from './screens/Post/postItem';
import CreatePost from './screens/Post/createPost';
import EditPost from './screens/Post/editPost';
import TeacherList from './screens/Teacher';
import CreateTeacher from './screens/Teacher/createTeacher';
import EditTeacher from './screens/Teacher/editTeacher';
import StudentList from './screens/Student';
import CreateStudent from './screens/Student/createStudent';
import EditStudent from './screens/Student/editStudent';
import Login from './screens/Teacher/signInTeacher';
import SignUp from './screens/Teacher/signUpTeacher';
import { Logout } from './components/LogoutButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Para ícones

const Tab = createBottomTabNavigator();
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
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{ title: 'Criar Nova Postagem' }}
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
      <Stack.Screen
        name="CreateTeacher"
        component={CreateTeacher}
        options={{ title: 'Cadastrar Professor' }}
      />
    </Stack.Navigator>
  );
}

function StudentStack() {
  return (
    <Stack.Navigator initialRouteName="StudentList"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="StudentList"
        component={StudentList}
        options={{ title: 'Lista de Alunos' }}
      />
      <Stack.Screen
        name="EditStudent"
        component={EditStudent}
        options={{ title: 'Editar Aluno' }}
      />
      <Stack.Screen
        name="CreateStudent"
        component={CreateStudent}
        options={{ title: 'Cadastrar Aluno' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);



  return (
    <Tab.Navigator
      initialRouteName="PostStack"
      screenListeners={({ navigation }) => ({
        focus: (e) => {
          const checkAuth = async () => {
            const token = await AsyncStorage.getItem('@auth_token');
            setIsAuthenticated(!!token);
          };
          checkAuth()

        }
      })}
      screenOptions={{
        tabBarActiveTintColor: '#003CB3',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="PostStack"
        component={PostStack}
        options={{
          title: 'Postagens',
          tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
        }}
      />

      {isAuthenticated && (
        <>
          <Tab.Screen
            name="TeacherStack"
            component={TeacherStack}
            options={{
              title: 'Professores',
              tabBarIcon: ({ color }) => <Ionicons name="school" size={24} color={color} />,
            }}
          />
          <Tab.Screen
            name="StudentStack"
            component={StudentStack}
            options={{
              title: 'Alunos',
              tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
            }}
          />
          <Tab.Screen
            name="Logout"
            component={Logout}
            options={{
              title: 'Desconectar',
              tabBarIcon: ({ color }) => <Ionicons name="log-out" size={24} color={color} />,
            }}
          />
        </>
      )}

      {!isAuthenticated && (
        <><Tab.Screen
          name="LoginProfessor"
          component={Login}
          options={{
            title: 'Login',
            tabBarIcon: ({ color }) => <Ionicons name="log-in" size={24} color={color} />,
          }} /><Tab.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: 'Cadastrar-se',
              tabBarIcon: ({ color }) => <Ionicons name="person-add" size={24} color={color} />,
            }} /></>
      
    
      )}
    </Tab.Navigator>
  );
}
