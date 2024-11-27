import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function CreatePost({ navigation }: { navigation: any }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!title || !author || !content) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newPost = {
      id: Math.random().toString(36).slice(2,9),
      title,
      author,
      content,
    };

    navigation.navigate('PostStack', { screen: 'PostList', params: { newPost } });

    Alert.alert('Sucesso', 'Postagem criada com sucesso!');
    setTitle('');
    setAuthor('');
    setContent('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Criar Nova Postagem</Text>
      <TextInput
        style={styles.input}
        placeholder="Título da postagem"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Conteúdo da postagem"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Salvar Postagem</Text>
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
  textArea: {
    height: 120,
    textAlignVertical: 'top',
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
});
