import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import  Post  from '@/app/types/Post';  // Importando a tipagem do Post


export default function PostItem({ route, navigation }: { route: any, navigation: NavigationProp<any> }) {
  const  {post} = route.params; 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>{post.author.name}</Text>
      <Text style={styles.publishedAt}>Publicado em: {new Date(post.publishedAt).toLocaleDateString()}</Text>
      <Text style={styles.content}>{post.content}</Text>

      <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    color: '#555555',
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  publishedAt: {
    fontSize: 16,
    color: '#777777',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 18,
    lineHeight: 28,
    color: '#444444',
    textAlign: 'justify',
    marginBottom: 20,
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
