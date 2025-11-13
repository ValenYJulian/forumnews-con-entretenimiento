import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RefreshCcw } from "lucide-react-native"; // ícono de recargar

export default function DolarScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDolar = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch("https://monedapi.ar/api/usd/bna");
      const json = await response.json();
      console.log("Datos MonedAPI:", json);
      setData(json);
    } catch (err) {
      console.error("Error al obtener el dólar oficial:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDolar();
  }, []);

  if (loading) {
    return (
      <LinearGradient colors={["#0a4d68", "#05bfdb"]} style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Cargando cotización...</Text>
      </LinearGradient>
    );
  }

  if (error || !data || !data.compra) {
    return (
      <LinearGradient colors={["#0a4d68", "#05bfdb"]} style={styles.container}>
        <Text style={styles.error}>Error al obtener datos del dólar 😔</Text>
        <TouchableOpacity onPress={fetchDolar} style={styles.refreshButton}>
          <RefreshCcw size={20} color="#fff" />
          <Text style={styles.refreshText}>Reintentar</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#0a4d68", "#05bfdb"]} style={styles.container}>
      <Text style={styles.title}>💵 Dólar Oficial (BNA)</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Compra</Text>
        <Text style={styles.value}>${data.compra}</Text>

        <Text style={styles.label}>Venta</Text>
        <Text style={styles.value}>${data.venta}</Text>

        {data.fecha && (
          <Text style={styles.date}>Actualizado: {data.fecha}</Text>
        )}
      </View>

      <TouchableOpacity onPress={fetchDolar} style={styles.refreshButton}>
        <RefreshCcw size={18} color="#fff" />
        <Text style={styles.refreshText}>Actualizar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    padding: 25,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 8,
  },
  label: {
    fontSize: 18,
    color: "#d4f1f9",
    marginTop: 10,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    fontSize: 13,
    color: "#c0e8ff",
    marginTop: 15,
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
    backgroundColor: "rgba(255,255,255,0.2)",
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
