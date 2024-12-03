import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { editStudent } from '@/app/service/studentService';

export default function EditStudent({
  route,
  navigation,
}: {
  route: any;
  navigation: NavigationProp<any>;
}) {
  const { student } = route.params;

  const [username, setName] = useState(student.username || '');
  const [email, setEmail] = useState(student.email || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!username || !email) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    const updateStudent = { ...student, username, email};

    console.log(updateStudent);
    
    await editStudent(updateStudent);

    Alert.alert('Sucesso', 'Estudante atualizado com sucesso!');
    
    navigation.navigate('StudentStack', { screen: 'StudentList'});

  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Aluno</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do aluno"
        value={username}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail do aluno"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSave}
        disabled={loading}
      >
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
  buttonDisabled: {
    backgroundColor: '#cccccc',
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
