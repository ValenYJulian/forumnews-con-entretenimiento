import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RefreshCcw } from "lucide-react-native";

export default function ClimaScreen() {
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const ciudad = "Buenos Aires";

  const fetchClima = async () => {
    try {
      setCargando(true);
      setError(false);
      const response = await fetch(`https://wttr.in/${ciudad}?format=j1`);
      const data = await response.json();
      setClima(data);
    } catch (error) {
      console.error("Error al obtener el clima:", error);
      setError(true);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchClima();
  }, []);

  if (cargando) {
    return (
      <LinearGradient colors={["#00c6ff", "#0072ff"]} style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Cargando clima...</Text>
      </LinearGradient>
    );
  }

  if (error || !clima) {
    return (
      <LinearGradient colors={["#00c6ff", "#0072ff"]} style={styles.container}>
        <Text style={styles.error}>Error al obtener el clima 😔</Text>
        <TouchableOpacity onPress={fetchClima} style={styles.refreshButton}>
          <RefreshCcw size={20} color="#fff" />
          <Text style={styles.refreshText}>Reintentar</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  const current = clima.current_condition[0];
  const iconUrl = current.weatherIconUrl[0].value;

  return (
    <LinearGradient colors={["#00c6ff", "#0072ff"]} style={styles.container}>
      <Text style={styles.title}>☀️ Clima en {ciudad}</Text>

      <View style={styles.card}>
        <Image source={{ uri: iconUrl }} style={styles.icon} />

        <Text style={styles.temp}>{current.temp_C}°C</Text>
        <Text style={styles.desc}>{current.weatherDesc[0].value}</Text>

        <View style={styles.extraInfo}>
          <Text style={styles.detail}>💧 Humedad: {current.humidity}%</Text>
          <Text style={styles.detail}>🌬️ Viento: {current.windspeedKmph} km/h</Text>
          <Text style={styles.detail}>🌡️ Sensación: {current.FeelsLikeC}°C</Text>
        </View>
      </View>

      <TouchableOpacity onPress={fetchClima} style={styles.refreshButton}>
        <RefreshCcw size={18} color="#fff" />
        <Text style={styles.refreshText}>Actualizar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 25,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 10,
  },
  icon: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  temp: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  desc: {
    fontSize: 22,
    color: "#e6faff",
    fontStyle: "italic",
    marginTop: 5,
    textTransform: "capitalize",
  },
  extraInfo: {
    marginTop: 15,
    width: "100%",
  },
  detail: {
    fontSize: 16,
    color: "#d9f3ff",
    textAlign: "center",
    marginVertical: 3,
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
  },
  error: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  refreshText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
});
