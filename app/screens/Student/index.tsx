import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { deleteStudent, fetchStudents } from '@/app/service/studentService';
import Student from '@/app/types/Student';

export default function StudentList({ route, navigation }: { route: any, navigation: NavigationProp<any> }) {
  const [data, setData] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(data);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const loadPosts = async () => {
        const data = await fetchStudents(); 
        setData(data);
        setFilteredStudents(data.slice(0, 10));
      };
  
      loadPosts();
    }, []) 
  ); 


  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredStudents(data);
    } else {
      const filtered = data.filter(
        (student) =>
          student.username.toLowerCase().includes(text.toLowerCase()) ||
          student.email.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  const handleEdit = (student: any) => {
    navigation.navigate('EditStudent', { student });
  };

  const handleDelete = async (studentId: string) => {
    try {
      await deleteStudent(studentId);
  
      setFilteredStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
      
      Alert.alert('Sucesso', 'Estudante deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar o estudante:', error);
      Alert.alert('Erro', 'Não foi possível deletar a estudante.');
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.studentItem}>
      <TouchableOpacity
        style={styles.studentContent}
        onPress={() => navigation.navigate('StudentDetails', { student: item })}
      >
        <Text style={styles.studentName}>{item.username}</Text>
        <Text style={styles.studentEmail}>{item.email}</Text>
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
        placeholder="Buscar alunos..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredStudents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text>Loading...</Text> : null}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateStudent')}
      >
        <Text style={styles.addButtonText}>Adicionar Aluno</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  studentItem: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  studentContent: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  studentEmail: {
    fontSize: 14,
    color: '#555',
  },
  studentClassroom: {
    fontSize: 14,
    color: '#777',
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
