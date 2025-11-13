import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [viewMode, setViewMode] = useState('posts'); // posts o comments
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/150?img=12');
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState('Juan Pérez');
  const [alias, setAlias] = useState('@juanp');

  const posts = [
    { id: '1', text: 'Gran partido hoy, impresionante el gol al último minuto.' },
    { id: '2', text: '¿Quién creen que ganará la Champions este año?' },
  ];

  const comments = [
    { id: '1', text: 'Totalmente de acuerdo, fue un partidazo.' },
    { id: '2', text: 'Creo que el Real Madrid tiene más chances.' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );

  // Función para cambiar foto
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveChanges = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {/* Info de usuario */}
      <View style={styles.header}>
        <Image source={{ uri: profileImage }} style={styles.avatar} />

        <TouchableOpacity style={styles.changePhotoBtn} onPress={pickImage}>
          <Text style={styles.changePhotoText}>Cambiar Foto</Text>
        </TouchableOpacity>

        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nombre"
            />
            <TextInput
              style={styles.input}
              value={alias}
              onChangeText={setAlias}
              placeholder="Alias"
            />
            <TouchableOpacity style={styles.saveBtn} onPress={saveChanges}>
              <Text style={styles.saveText}>Guardar Cambios</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.alias}>{alias}</Text>
            <TouchableOpacity style={styles.editBtn} onPress={() => setIsEditing(true)}>
              <Text style={styles.editText}>Editar Perfil</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Botones de navegación */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, viewMode === 'posts' && styles.activeTab]}
          onPress={() => setViewMode('posts')}
        >
          <Text style={[styles.tabText, viewMode === 'posts' && styles.activeTabText]}>
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, viewMode === 'comments' && styles.activeTab]}
          onPress={() => setViewMode('comments')}
        >
          <Text style={[styles.tabText, viewMode === 'comments' && styles.activeTabText]}>
            Comentarios
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Posts o Comentarios */}
      <FlatList
        data={viewMode === 'posts' ? posts : comments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  header: {
    alignItems: 'center',
    marginBottom: 20
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10
  },
  changePhotoBtn: {
    backgroundColor: '#1E90FF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 10
  },
  changePhotoText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  alias: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10
  },
  editBtn: {
    backgroundColor: '#32CD32',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    textAlign: 'center'
  },
  saveBtn: {
    backgroundColor: '#1E90FF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  tab: {
    paddingVertical: 10,
    width: '45%',
    alignItems: 'center'
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#1E90FF'
  },
  tabText: {
    fontSize: 16,
    color: 'gray'
  },
  activeTabText: {
    color: '#1E90FF',
    fontWeight: 'bold'
  },
  list: {
    marginTop: 10
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  itemText: {
    fontSize: 16
  }
});
