import React, { useState } from 'react';
import { View, FlatList, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const teachersData = [
  { id: 1, name: 'Professor 1', email: 'prof1@email.com', subject: 'Matemática' },
  { id: 2, name: 'Professor 2', email: 'prof2@email.com', subject: 'Português' },
  { id: 3, name: 'Professor 3', email: 'prof3@email.com', subject: 'Ciências' },
  { id: 4, name: 'Professor 4', email: 'prof4@email.com', subject: 'História' },
  { id: 5, name: 'Professor 5', email: 'prof5@email.com', subject: 'Geografia' },
  { id: 6, name: 'Professor 6', email: 'prof6@email.com', subject: 'Física' },
  { id: 7, name: 'Professor 7', email: 'prof7@email.com', subject: 'Química' },
  { id: 8, name: 'Professor 8', email: 'prof8@email.com', subject: 'Biologia' },
  { id: 9, name: 'Professor 9', email: 'prof9@email.com', subject: 'Inglês' },
  { id: 10, name: 'Professor 10', email: 'prof10@email.com', subject: 'Educação Física' },
];

export default function TeacherList({ navigation }: { navigation: NavigationProp<any> }) {
  const [data, setData] = useState(teachersData.slice(0, 5));
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState(data);
  const [loading, setLoading] = useState(false);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredTeachers(data);
    } else {
      const filtered = teachersData.filter(teacher =>
        teacher.name.toLowerCase().includes(text.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(text.toLowerCase()) ||
        teacher.email.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredTeachers(filtered);
    }
  };

  const loadMoreData = () => {
    if (loading || searchTerm !== '') return;

    setLoading(true);
    const nextData = teachersData.slice(data.length, data.length + 3);
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

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.teacherItem}>
      <TouchableOpacity
        style={styles.teacherContent}
        onPress={() => navigation.navigate('TeacherDetails', { teacher: item })}
      >
        <Text style={styles.teacherName}>{item.name}</Text>
        <Text style={styles.teacherSubject}>Matéria: {item.subject}</Text>
        <Text style={styles.teacherEmail}>Email: {item.email}</Text>
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
});
