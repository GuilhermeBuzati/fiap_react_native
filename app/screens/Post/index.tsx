
import { Post } from '@/app/types/Post';
import React, { useState } from 'react';
import { View, FlatList, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const postsData = [
  { id: 1, title: 'Postagem 1', author: 'Autor 1', content: 'Descrição breve do post 1' },
  { id: 2, title: 'Postagem 2', author: 'Autor 2', content: 'Descrição breve do post 2' },
  { id: 3, title: 'Postagem 3', author: 'Autor 3', content: 'Descrição breve do post 3' },
  { id: 4, title: 'Postagem 4', author: 'Autor 4', content: 'Descrição breve do post 4' },
  { id: 5, title: 'Postagem 5', author: 'Autor 5', content: 'Descrição breve do post 5' },
  { id: 6, title: 'Postagem 7', author: 'Autor 7', content: 'Descrição breve do post 7' },
  { id: 7, title: 'Postagem 8', author: 'Autor 8', content: 'Descrição breve do post 8' },
  { id: 8, title: 'Postagem 9', author: 'Autor 9', content: 'Descrição breve do post 9' },
  { id: 9, title: 'Postagem 10', author: 'Autor 10', content: 'Descrição breve do post 10' },
  { id: 10, title: 'Postagem 11', author: 'Autor 11', content: 'Descrição breve do post 11' },
  { id: 11, title: 'Postagem 12', author: 'Autor 12', content: 'Descrição breve do post 12' },
  { id: 12, title: 'Postagem 13', author: 'Autor 13', content: 'Descrição breve do post 13' },
  { id: 13, title: 'Postagem 14', author: 'Autor 14', content: 'Descrição breve do post 14' },
  { id: 14, title: 'Postagem 15', author: 'Autor 15', content: 'Descrição breve do post 15' },
  { id: 15, title: 'Postagem 16', author: 'Autor 16', content: 'Descrição breve do post 16' },
  { id: 16, title: 'Postagem 17', author: 'Autor 17', content: 'Descrição breve do post 17' },
  { id: 17, title: 'Postagem 18', author: 'Autor 18', content: 'Descrição breve do post 18' },
  { id: 18, title: 'Postagem 19', author: 'Autor 19', content: 'Descrição breve do post 19' },
  { id: 19, title: 'Postagem 20', author: 'Autor 20', content: 'Descrição breve do post 20' },
  { id: 20, title: 'Postagem 21', author: 'Autor 21', content: 'Descrição breve do post 21' },
  { id: 21, title: 'Postagem 22', author: 'Autor 22', content: 'Descrição breve do post 22' },
  { id: 22, title: 'Postagem 23', author: 'Autor 23', content: 'Descrição breve do post 23' },
  { id: 23, title: 'Postagem 24', author: 'Autor 24', content: 'Descrição breve do post 24' },
];


export default function PostList({ navigation }: { navigation: NavigationProp<any> }) {
  const [data, setData] = useState<Post[]>(postsData.slice(0, 10));
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(data);
  const [loading, setLoading] = useState(false);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredPosts(data);
    } else {
      const filtered = postsData.filter(post =>
        post.title.toLowerCase().includes(text.toLowerCase()) ||
        post.content.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const loadMoreData = () => {
    if (loading || searchTerm !== '') return;

    setLoading(true);
    const nextData = postsData.slice(data.length, data.length + 3);
    if (nextData.length === 0) {
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setData((prevData) => [...prevData, ...nextData]);
      setFilteredPosts((prevFilteredPosts) => [...prevFilteredPosts, ...nextData]);
      setLoading(false);
    }, 1000);
  };

  const handleEdit = (post: Post) => {
    navigation.navigate('EditPost', { post });
  };

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postItem}>
      <TouchableOpacity
        style={styles.postContent}
        onPress={() => navigation.navigate('ItemPost', { post: item })}
      >
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postAuthor}>Autor: {item.author}</Text>
        <Text style={styles.postDescription}>{item.content}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
        <Ionicons name="create-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar postagens..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text>Loading...</Text> : null}
      />
    </View>
  );
}

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
    flexDirection: 'row',
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
  postContent: {
    flex: 1,
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
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 50,
    marginLeft: 10,
  },
});