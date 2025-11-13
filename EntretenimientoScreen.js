import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const noticias = [
  {
    titulo: "Plantas contra Zombis Replanted: el regreso más esperado",
    descripcion:
      "EA y PopCap sorprenden con el remake completo del clásico 'Plantas contra Zombis', con gráficos renovados, nuevas plantas y una jugabilidad mejorada para consolas y PC.",
    imagen: "https://tse4.mm.bing.net/th/id/OIP.U6xDiKGDoTA-OUdmmQ87fQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    fuente: "EA PopCap News",
  },
  {
    titulo: "Monsters: la nueva serie de Netflix que rompe récords",
    descripcion:
      "‘Monsters’, la antología de Ryan Murphy, vuelve con su segunda temporada centrada en crímenes reales. Ya es una de las series más vistas del mes en Netflix.",
    imagen: "https://tse2.mm.bing.net/th/id/OIP.qZXnrlZuE6AvK5OAGM7TsAHaD3?rs=1&pid=ImgDetMain&o=7&rm=3",
    fuente: "Netflix",
  },
  {
    titulo: "El eternauta",
    descripcion:
      "La serie argentina 'El eternauta' se posiciona como una de las más vistas en Latinoamérica",
    imagen: "https://media.ambito.com/p/3bd7b0a6cb663b886073f9dff833bbce/adjuntos/239/imagenes/041/718/0041718592/el-eternauta.jpg",
    fuente: "Clarín Espectáculos",
  },
  {
    titulo: "La huésped: regresa con una nueva adaptación cinematográfica",
    descripcion:
      "La novela de Stephenie Meyer vuelve al cine con una historia actualizada y efectos visuales renovados. El elenco promete grandes interpretaciones.",
    imagen: "https://tse3.mm.bing.net/th/id/OIP.AZBNpK5EA-AEsqznETatOwHaEn?rs=1&pid=ImgDetMain&o=7&rm=3",
    fuente: "CineHoyts",
  },
  {
    titulo: "Animal: la película argentina que causa impacto en Netflix",
    descripcion:
      "Con Guillermo Francella como protagonista, 'Animal' vuelve a ser tendencia tras su incorporación al catálogo global de Netflix.",
    imagen: "https://i.ytimg.com/vi/2RNbOqdG8l8/maxresdefault.jpg",
    fuente: "Infobae Cine",
  },
  {
    titulo: "Peacemaker: James Gunn confirma la temporada 2",
    descripcion:
      "James Gunn anuncia oficialmente la segunda temporada de ‘Peacemaker’, prometiendo más acción, humor y cameos del universo DC.",
    imagen: "https://www.infobae.com/resizer/v2/AWGBBYRJHJCWXGA6CPHDIIGNRM.jpg?auth=0df257548a12872fb0bc4d559a5a9b7f8f43b7b3d2e6ae1c3ae7b7646a0a2ab9&smart=true&width=1200&height=675&quality=85",
    fuente: "DC Studios",
  },
  {
    titulo: "Chainsaw Man: la película del Arco de Reze ya está aquí",
    descripcion:
      "MAPPA Studios lanza la esperada película de Chainsaw Man: Reze Arc. Los fans destacan la animación impecable y el tono más emocional del nuevo filme.",
    imagen: "https://senpaitv.com/wp-content/uploads/2023/06/chainsawman.png",
    fuente: "Crunchyroll News",
  },
];

export default function EntretenimientoScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tituloPrincipal}>Noticias de Entretenimiento</Text>
      {noticias.map((item, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: item.imagen }} style={styles.imagen} />
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
          <Text style={styles.fuente}>Fuente: {item.fuente}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  tituloPrincipal: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  imagen: {
    width: "100%",
    height: 200,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  descripcion: {
    fontSize: 15,
    marginHorizontal: 10,
    color: "#333",
  },
  fuente: {
    fontSize: 13,
    color: "gray",
    margin: 10,
    textAlign: "right",
  },
});
