import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Completa todos los campos");
    }

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.error) {
        return Alert.alert("Error", data.error);
      }

      Alert.alert("Bienvenido", "Login correcto 😎");

      // después lo vamos a guardar en AsyncStorage
      console.log("TOKEN:", data.token);

      navigation.replace("Home"); // redirigir a tu pantalla principal

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 25, marginBottom: 20 }}>Iniciar sesión</Text>

      <TextInput
        placeholder="Email"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Contraseña"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={login} />

      <Text
        style={{
          marginTop: 20,
          color: "blue",
        }}
        onPress={() => navigation.navigate("Register")}
      >
        ¿No tenés cuenta? Registrate
      </Text>
    </View>
  );
}
