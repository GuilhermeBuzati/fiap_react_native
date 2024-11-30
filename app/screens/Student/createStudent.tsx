import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function CreateStudent({ navigation }: { navigation: NavigationProp<any> })  {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [classroom, setClassroom] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !classroom) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    // Simulando uma ação para salvar aluno
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
      navigation.navigate('StudentList', { newStudent: { name, email, classroom } });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastrar Aluno</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Aluno"
        value={name}
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
      <TextInput
        style={styles.input}
        placeholder="Turma"
        value={classroom}
        onChangeText={setClassroom}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Enviando...' : 'Cadastrar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
