import React, { useState } from 'react';
import { View, FlatList, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import useAuth from '@/app/hooks/useAuthenticated';
import { deleteTeacher, fetchTeachers } from '@/app/service/teacherService';
import Teacher from '@/app/types/Teacher';
import { deleteStudent } from '@/app/service/studentService';


export default function TeacherList({ navigation }: { navigation: NavigationProp<any> }) {
  const [data, setData] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState(data);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      const loadPosts = async () => {
        const data = await fetchTeachers(); 
        setData(data);
        setFilteredTeachers(data.slice(0, 10));
      };
  
      loadPosts();
    }, []) 
  ); 


  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredTeachers(data);
    } else {
      const filtered = data.filter(teacher =>
        teacher.username.toLowerCase().includes(text.toLowerCase()) ||
        teacher.email.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredTeachers(filtered);
    }
  };

  const loadMoreData = () => {
    if (loading || searchTerm !== '') return;

    setLoading(true);
    const nextData = data.slice(data.length, data.length + 3);
    if (nextData.length === 0) {
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setData((prevData) => [...prevData, ...nextData]);
      setFilteredTeachers((prevFilteredTeachers) => [...prevFilteredTeachers, ...nextData]);
      setLoading(false);
    }, 1000);
  };

  const handleEdit = (teacher: any) => {
    navigation.navigate('EditTeacher', { teacher });
  };

  const handleDelete = async (teacherId: string) => {
    try {
      await deleteTeacher(teacherId);
  
      setFilteredTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.id !== teacherId));
      setData((prevTeachers) => prevTeachers.filter((teacher) => teacher.id !== teacherId));
      
      Alert.alert('Sucesso', 'Professor deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar o professor:', error);
      Alert.alert('Erro', 'Não foi possível deletar a professor.');
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.teacherItem}>
      <TouchableOpacity
        style={styles.teacherContent}
        onPress={() => void 0}
      >
        <Text style={styles.teacherName}>{item.username}</Text>
        <Text style={styles.teacherEmail}>{item.email}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
        <Ionicons name="create-outline" size={24} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconButton}>
      <Ionicons name="trash-outline" size={24} color="red" />
    </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar professores..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredTeachers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text>Carregando...</Text> : null}
      />
      {isAuthenticated && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateTeacher')}
        >
          <Text style={styles.addButtonText}>Adicionar Professor</Text>
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
  teacherItem: {
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
  teacherContent: {
    flex: 1,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  teacherSubject: {
    fontSize: 14,
    color: "#555",
  },
  teacherEmail: {
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
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 50,
    marginLeft: 10,
  }
});
