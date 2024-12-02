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
import StudentList from './screens/Student';
import CreateStudent from './screens/Student/createStudent';
import EditStudent from './screens/Student/editStudent';

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
        name="TeacherStack"
        component={TeacherStack}
        options={{ title: 'Professores' }}
      />

      <Drawer.Screen
        name="StudentStack"
        component={StudentStack}
        options={{ title: 'Alunos' }}
      />

      <Drawer.Screen
        name="LoginProfessor"
        component={Login}
        options={{ title: 'Login' }}
      />
    </Drawer.Navigator>
  );
}
