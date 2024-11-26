import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PostItem({ route }) {
  const { postId } = route.params;

  // Aqui, simulamos a busca do post pelo ID (você poderia buscar do banco ou API)
  const post = {
    id: '1',
    title: 'Postagem 1',
    author: 'Autor 1',
    description: 'Descrição completa do post 1',
    content: 'Conteúdo completo do post 1 aqui...',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>Autor: {post.author}</Text>
      <Text style={styles.content}>{post.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#333',
  },
});
