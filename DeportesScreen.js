// DeportesScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, ScrollView } from "react-native";

const API_KEY = "60b395e90b284f59b74515c4b6c39023";
const BASE_URL = "https://api.football-data.org/v4";

// Solo las 5 grandes ligas
const COMPETITIONS = ["PL", "PD", "SA", "FL1", "BL1"];

const competitionNames = {
  PL: "Premier League",
  PD: "LaLiga",
  SA: "Serie A",
  FL1: "Ligue 1",
  BL1: "Bundesliga",
};

const formatToArgentinaTime = (utcDate) => {
  return new Date(utcDate).toLocaleTimeString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function DeportesScreen() {
  const [matchesYesterday, setMatchesYesterday] = useState([]);
  const [matchesToday, setMatchesToday] = useState([]);
  const [matchesTomorrow, setMatchesTomorrow] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async (date, setter) => {
    try {
      let allMatches = [];
      for (let comp of COMPETITIONS) {
        const dateStr = date.toISOString().split("T")[0];
        const response = await fetch(
          `${BASE_URL}/competitions/${comp}/matches?dateFrom=${dateStr}&dateTo=${dateStr}`,
          { headers: { "X-Auth-Token": API_KEY } }
        );
        const data = await response.json();
        if (data.matches) {
          allMatches = [
            ...allMatches,
            ...data.matches.map((m) => ({
              ...m,
              competitionName: competitionNames[comp] || m.competition.name,
              competitionLogo: m.competition.emblem,
              matchDate: dateStr,
            })),
          ];
        }
      }
      allMatches.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
      setter(allMatches);
    } catch (error) {
      console.error("Error al traer partidos:", error);
    }
  };

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

    Promise.all([
      fetchMatches(yesterday, setMatchesYesterday),
      fetchMatches(today, setMatchesToday),
      fetchMatches(tomorrow, setMatchesTomorrow),
    ]).finally(() => setLoading(false));
  }, []);

  const renderMatch = ({ item }) => {
    const isFinished = item.status === "FINISHED";
    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          {item.competitionLogo ? (
            <Image source={{ uri: item.competitionLogo }} style={styles.compLogo} />
          ) : null}
          <Text style={styles.league}>{item.competitionName}</Text>
        </View>

        <View style={styles.teamRow}>
          <Image source={{ uri: item.homeTeam.crest }} style={styles.crest} />
          <Text style={styles.team}>{item.homeTeam.name}</Text>
          <Text style={styles.score}>
            {item.score.fullTime.home !== null ? item.score.fullTime.home : "-"}
          </Text>
        </View>

        <View style={styles.teamRow}>
          <Image source={{ uri: item.awayTeam.crest }} style={styles.crest} />
          <Text style={styles.team}>{item.awayTeam.name}</Text>
          <Text style={styles.score}>
            {item.score.fullTime.away !== null ? item.score.fullTime.away : "-"}
          </Text>
        </View>

        <Text style={styles.date}>{formatToArgentinaTime(item.utcDate)}</Text>
        {isFinished && <Text style={styles.finalizado}>Finalizado</Text>}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text>Cargando partidos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>📅 Partidos de Ayer</Text>
      {matchesYesterday.length > 0 ? (
        <FlatList
          data={matchesYesterday}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMatch}
          scrollEnabled={false}
        />
      ) : (
        <Text style={styles.empty}>No hubo partidos ayer</Text>
      )}

      <Text style={styles.sectionHeader}>⚽ Partidos de Hoy</Text>
      {matchesToday.length > 0 ? (
        <FlatList
          data={matchesToday}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMatch}
          scrollEnabled={false}
        />
      ) : (
        <Text style={styles.empty}>No hay partidos hoy</Text>
      )}

      <Text style={styles.sectionHeader}>🔮 Partidos de Mañana</Text>
      {matchesTomorrow.length > 0 ? (
        <FlatList
          data={matchesTomorrow}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMatch}
          scrollEnabled={false}
        />
      ) : (
        <Text style={styles.empty}>No hay partidos mañana</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  sectionHeader: { fontSize: 20, fontWeight: "bold", margin: 10 },
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  compLogo: { width: 25, height: 25, marginRight: 8 },
  league: { fontSize: 16, fontWeight: "bold", color: "#1E90FF" },
  teamRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 },
  crest: { width: 28, height: 28, marginRight: 10 },
  team: { flex: 1, fontSize: 15 },
  score: { fontSize: 16, fontWeight: "bold", minWidth: 50, textAlign: "center" },
  date: { textAlign: "center", marginTop: 5, color: "gray" },
  finalizado: { textAlign: "center", color: "red", marginTop: 2, fontWeight: "bold" },
  empty: { textAlign: "center", color: "gray", marginBottom: 10 },
});
