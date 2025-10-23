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

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { name, email, password });
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      navigation.navigate("Login");
    } catch {
      Alert.alert("Erro", "Falha ao criar conta");
    }
  };

  return (
    <Container>
      <Text style={{ color: "white", fontSize: 28, marginBottom: 30 }}>Nova Conta 🏦</Text>
      <Input placeholder="Nome completo" value={name} onChangeText={setName} />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <Btn onPress={handleRegister}>
        <BtnText>Cadastrar</BtnText>
      </Btn>
    </Container>
  );
}
