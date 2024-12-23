import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Post from '@/app/types/Post';
import { deletePost, fetchData } from '@/app/service/postService';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function PostList({ navigation }: { navigation: NavigationProp<any> }) {
  const [data, setData] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(data);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const loadPosts = async () => {
        const data = await fetchData(); 
        setData(data);
        setFilteredPosts(data.slice(0, 10));
      };

      const checkAuth = async () => {
        const token = await AsyncStorage.getItem('@auth_token');
        setIsAuthenticated(!!token);
      };

      checkAuth()
      loadPosts();
    }, []) 
  ); 


  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredPosts(data);
    } else {
      const filtered = data.filter(post =>
        post.title.toLowerCase().includes(text.toLowerCase()) ||
        post.content.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const loadMoreData = () => {
    if (loading || searchTerm !== '') return;

    setLoading(true);

    const nextData = data.slice(filteredPosts.length, filteredPosts.length + 3);

    if (nextData.length === 0) {
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setFilteredPosts((prevFilteredPosts) => [...prevFilteredPosts, ...nextData]);
      setLoading(false);
    }, 1000);
  };

  const handleEdit = (post: Post) => {
    navigation.navigate('EditPost', { post });
  };

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId);
  
      setFilteredPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      setData((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      
      Alert.alert('Sucesso', 'Postagem deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar o post:', error);
      Alert.alert('Erro', 'Não foi possível deletar a postagem.');
    }
  };
  
  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postItem}>
      <TouchableOpacity
        style={styles.postContent}
        onPress={() => navigation.navigate('ItemPost', { post: item })}
      >
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postAuthor}>{item.author.name}</Text>
        <Text style={styles.postDescription}>{item.content}</Text>
      </TouchableOpacity>
      
      {isAuthenticated && (
      <><TouchableOpacity onPress={() => handleEdit(item)} style={styles.iconButton}>
          <Ionicons name="create-outline" size={24} color="blue" />
        </TouchableOpacity><TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconButton}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity></>
      )}

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
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text>Loading...</Text> : null}
      />
      {isAuthenticated && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreatePost')}
        >
          <Text style={styles.addButtonText}>Adicionar Postagem</Text>
        </TouchableOpacity>
      )}

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
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 50,
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});