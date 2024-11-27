import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Post } from '@/app/types/Post'; // Ajuste o caminho de acordo com sua estrutura

export default function EditPost({ route, navigation }: { route: any, navigation: NavigationProp<any> }) {
  const { post } = route.params; // Recebe o post a ser editado
  const [title, setTitle] = useState(post.title);
  const [author, setAuthor] = useState(post.author);
  const [content, setContent] = useState(post.content);

  const handleSave = () => {
    if (!title || !author || !content) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const updatedPost = { ...post, title, author, content };
    console.log('Post atualizado:', updatedPost);

    navigation.navigate('PostStack', { screen: 'PostList', params: { updatedPost } });

    Alert.alert('Sucesso', 'Postagem atualizada com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Postagem</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
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
  buttonBack: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});
