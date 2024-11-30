import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function StudentList({ route, navigation }: { route: any, navigation: NavigationProp<any> }) {
  const initialStudents = [
    { id: '1', name: 'João Silva', email: 'joao@example.com', classroom: '1A' },
    { id: '2', name: 'Maria Oliveira', email: 'maria@example.com', classroom: '2B' },
  ];

  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(initialStudents);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params?.newStudent) {
      const newStudent = {
        id: (students.length + 1).toString(),
        ...route.params.newStudent,
      };
      setStudents((prev) => [...prev, newStudent]);
      setFilteredStudents((prev) => [...prev, newStudent]);
    }
  }, [route.params?.newStudent]);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(
        (student) =>
          student.name.toLowerCase().includes(text.toLowerCase()) ||
          student.email.toLowerCase().includes(text.toLowerCase()) ||
          student.classroom.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  const handleEdit = (student: any) => {
    navigation.navigate('EditStudent', { student });
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.studentItem}>
      <TouchableOpacity
        style={styles.studentContent}
        onPress={() => navigation.navigate('StudentDetails', { student: item })}
      >
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentEmail}>{item.email}</Text>
        <Text style={styles.studentClassroom}>Turma: {item.classroom}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
        <Ionicons name="create-outline" size={24} color="blue" />
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
});
