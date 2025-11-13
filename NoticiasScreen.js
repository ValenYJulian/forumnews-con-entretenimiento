import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const noticias = [
  {
    id: '1',
    titulo: 'Se aproximan las elecciones por senadores en Argentina',
    subtitulo: 'Los comicios legislativos se acercan y generan debate político.',
    imagen: 'https://www.lanacion.com.ar/resizer/v2/cuando-se-vota-para-las-elecciones-legislativas-5IOC4MEMVBG23FBVXCUZPDXK64.jpg?auth=9fdf5dc784540a2ba92ab42353889bd9959dd92bc11494c77b2d296f23077710&width=880&height=586&quality=70&smart=true',
    contenido: 'Las elecciones legislativas en Argentina definirán la renovación parcial del Senado. Los principales partidos políticos ya se encuentran en plena campaña.',
    analisis: 'El panorama político está muy dividido y los sondeos muestran una competencia cerrada entre los principales partidos. Este resultado podría impactar en futuras reformas legislativas.',
    autor: 'Redacción Política',
    comentarios: [
      { autor: 'Juan', texto: 'Muy interesante, esperemos los resultados.' },
      { autor: 'María', texto: 'Gran artículo, bien detallado!' },
    ],
  },
  {
    id: '2',
    titulo: 'Se está jugando el Mundial Sub-20 con gran expectativa',
    subtitulo: 'Los jóvenes talentos brillan en el torneo internacional.',
    imagen: 'https://www.radiogol.com.ar/wp-content/uploads/2025/05/sub-20-grupos-696x392.jpeg',
    contenido: 'El Mundial Sub-20 se está disputando con la participación de varias selecciones. Argentina busca repetir su historia ganadora en este certamen juvenil.',
    analisis: 'Varios jugadores jóvenes han destacado y podrían ser convocados al primer equipo en los próximos años. Los entrenadores buscan equilibrar experiencia y talento emergente.',
    autor: 'Redacción Deportes',
    comentarios: [
      { autor: 'Pedro', texto: 'Qué bien, espero ver a Messi Jr. en acción!' },
      { autor: 'Lucía', texto: 'El torneo está muy emocionante hasta ahora.' },
    ],
  },
  {
    id: '3',
    titulo: 'Se estrenó la tercera temporada de Spy x Family',
    subtitulo: 'La familia más peculiar del anime regresa a la pantalla.',
    imagen: 'https://ekkonoticia.com.ar/images/noticias/70282.jpg',
    contenido: 'La tercera temporada de Spy x Family fue estrenada con gran éxito, continuando las aventuras de Loid, Yor y Anya en nuevas misiones llenas de comedia y acción.',
    analisis: 'La serie mantiene su combinación perfecta de comedia, acción y drama familiar. Los fans destacan la evolución de los personajes y las situaciones inesperadas.',
    autor: 'Redacción Entretenimiento',
    comentarios: [
      { autor: 'Ana', texto: 'La estaba esperando, me encanta esta serie!' },
      { autor: 'Carlos', texto: 'Anya sigue siendo lo mejor, tan divertida.' },
    ],
  },
  {
    id: '4',
    titulo: 'Nueva película de Demon Slayer llegó a los cines',
    subtitulo: 'El esperado arco de la franquicia ya está disponible.',
    imagen: 'https://media.ambito.com/p/946d32508208bd07eeedd122fcc3ad20/adjuntos/239/imagenes/042/607/0042607687/1200x675/smart/kimetsu-no-yaiba.jpg',
    contenido: 'La nueva película de Kimetsu no Yaiba expande la historia del arco del Pilar de la Niebla, ofreciendo espectaculares batallas con animación de primer nivel.',
    analisis: 'El filme destaca por su animación y la fidelidad al manga. Los fans valoran los detalles en las escenas de combate y la profundidad de los personajes secundarios.',
    autor: 'Redacción Anime',
    comentarios: [
      { autor: 'Miguel', texto: 'Impresionante animación, muy recomendable.' },
      { autor: 'Sofía', texto: 'Demon Slayer nunca decepciona!' },
    ],
  },
  {
    id: '5',
    titulo: 'El Barcelona perdió 2-1 con PSG en la Champions League',
    subtitulo: 'El equipo culé no pudo imponerse en París.',
    imagen: 'https://www.reuters.com/resizer/v2/3DXP35HS7NO5NDZNCIEWZZI3QQ.jpg?auth=27af145a3992a75ced6e6b1b719466c8ff97eff1549b45e208c24d12aef4e9f5&width=1080&quality=80',
    contenido: 'En un partido vibrante, el PSG derrotó al Barcelona 2-1 en la ida de la Champions. El gol decisivo fue anotado en los últimos minutos del encuentro.',
    analisis: 'El Barcelona mostró buen juego, pero la defensa del PSG fue muy sólida. Se espera un partido de vuelta emocionante con posibilidades de remontada.',
    autor: 'Redacción Deportes',
    comentarios: [
      { autor: 'Leo', texto: 'El Barça mereció más, qué lástima.' },
      { autor: 'Martina', texto: 'El PSG jugó muy bien, mereció ganar.' },
    ],
  },
];

const Stack = createNativeStackNavigator();

function NoticiasLista({ navigation }) {
  const renderItem = ({ item }) => (
    <Pressable style={styles.card} onPress={() => navigation.navigate('DetalleNoticia', { noticia: item })}>
      <Image source={{ uri: item.imagen }} style={styles.image} />
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.subtitulo}>{item.subtitulo}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={noticias}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <Text style={styles.header}>📰 Últimas Noticias</Text>
        )}
      />
    </View>
  );
}

function DetalleNoticia({ route }) {
  const { noticia } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: noticia.imagen }} style={styles.detalleImage} />
      <Text style={styles.titulo}>{noticia.titulo}</Text>
      <Text style={styles.contenido}>{noticia.contenido}</Text>

      {/* Sección de análisis */}
      <Text style={styles.seccionHeader}>🔍 Análisis</Text>
      <Text style={styles.analisis}>{noticia.analisis}</Text>

      {/* Sección de comentarios */}
      <Text style={styles.seccionHeader}>💬 Comentarios</Text>
      {noticia.comentarios.map((c, index) => (
        <View key={index} style={styles.comentario}>
          <Text style={styles.comentarioAutor}>{c.autor}:</Text>
          <Text>{c.texto}</Text>
        </View>
      ))}

      {/* Autor */}
      <Text style={styles.autor}>Publicado por: {noticia.autor}</Text>
    </ScrollView>
  );
}

export default function NoticiasScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NoticiasLista" component={NoticiasLista} options={{ title: 'Noticias' }} />
      <Stack.Screen name="DetalleNoticia" component={DetalleNoticia} options={{ title: 'Detalle de Noticia' }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
    elevation: 3, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 180,
  },
  detalleImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 15,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  subtitulo: {
    fontSize: 14,
    color: '#555',
    paddingBottom: 10,
  },
  contenido: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 15,
  },
  seccionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  analisis: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
    color: '#333',
  },
  comentario: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  comentarioAutor: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  autor: {
    fontSize: 13,
    color: '#555',
    marginTop: 20,
    textAlign: 'left',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
