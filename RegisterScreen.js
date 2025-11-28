import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Completa todos los campos");
    }

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.error) {
        return Alert.alert("Error", data.error);
      }

      Alert.alert("Listo", "Usuario registrado");
      navigation.navigate("Login");

    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 25, marginBottom: 20 }}>Registrarse</Text>

      <TextInput
        placeholder="Email"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Crear cuenta" onPress={register} />
    </View>
  );
}
