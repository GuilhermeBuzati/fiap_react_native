import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PostItem({ route }: any) {
  const { post } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>Autor: {post.author}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
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
  backButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
    textAlign: 'center',
  },
  author: {
    fontSize: 16,
    color: '#555555',
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 18,
    lineHeight: 28,
    color: '#444444',
    textAlign: 'justify',
    paddingHorizontal: 10,
  },
});
