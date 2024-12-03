import { editTeacher } from '@/app/service/teacherService';
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function EditTeacher({ route, navigation }: { route: any, navigation: NavigationProp<any> }) {
  const { teacher } = route.params;

  const [username, setName] = useState(teacher.username || '');
  const [email, setEmail] = useState(teacher.email || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username || !email) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    const updateTeacher = { ...teacher, username, email};
    
    await editTeacher(updateTeacher);

    Alert.alert('Sucesso', 'Professor atualizado com sucesso!');
    
    setLoading(false);

    navigation.navigate('TeacherStack', { screen: 'TeacherList'});

  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Professor</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do professor"
        value={username}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Salvando...' : 'Salvar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonBack: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});
