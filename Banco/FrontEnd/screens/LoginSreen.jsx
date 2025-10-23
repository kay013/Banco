import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { api } from "../services/api";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #6b21a8;
  padding: 20px;
`;
const Input = styled.TextInput`
  background-color: white;
  width: 90%;
  margin: 8px 0;
  padding: 10px;
  border-radius: 10px;
`;
const Btn = styled.TouchableOpacity`
  background-color: #9333ea;
  padding: 12px 30px;
  border-radius: 10px;
  margin-top: 10px;
`;
const BtnText = styled.Text`
  color: white;
  font-weight: bold;
`;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigation.navigate("Dashboard");
    } catch {
      Alert.alert("Erro", "Login inválido");
    }
  };

  return (
    <Container>
      <Text style={{ color: "white", fontSize: 30, marginBottom: 30 }}>Banco Sombra 💸</Text>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <Btn onPress={handleLogin}>
        <BtnText>Entrar</BtnText>
      </Btn>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={{ color: "white", marginTop: 10 }}>Criar conta</Text>
      </TouchableOpacity>
    </Container>
  );
}
