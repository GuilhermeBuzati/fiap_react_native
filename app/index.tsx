import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";

const PostList = () => {
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "Aprendendo React Native",
      author: "João Silva",
      description: "Uma introdução prática ao React Native.",
    },
    {
      id: "2",
      title: "Dicas de produtividade",
      author: "Maria Souza",
      description: "Como melhorar seu foco e organização no trabalho.",
    },
    {
      id: "3",
      title: "Cozinha para iniciantes",
      author: "Carlos Lima",
      description: "Receitas fáceis e práticas para o dia a dia.",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar posts..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postAuthor}>Autor: {item.author}</Text>
            <Text style={styles.postDescription}>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noResults}>Nenhum post encontrado.</Text>
        }
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  postItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  postAuthor: {
    fontSize: 14,
    color: "#555",
  },
  postDescription: {
    fontSize: 14,
    color: "#777",
  },
  noResults: {
    textAlign: "center",
    color: "#777",
    marginTop: 16,
  },
});

export default PostList;
