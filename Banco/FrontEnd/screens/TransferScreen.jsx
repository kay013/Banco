import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { api } from "../services/api";

const Container = styled.View`
  flex: 1;
  background-color: #6b21a8;
  justify-content: center;
  align-items: center;
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

export default function TransferScreen() {
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    try {
      await api.post("/transactions", { type: "WITHDRAW", amount, description: "PIX enviado" });
      Alert.alert("Sucesso", "Transferência realizada!");
    } catch {
      Alert.alert("Erro", "Falha ao transferir");
    }
  };

  return (
    <Container>
      <Text style={{ color: "white", fontSize: 26, marginBottom: 20 }}>Transferência PIX 💸</Text>
      <Input placeholder="Valor (R$)" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <Btn onPress={handleTransfer}>
        <BtnText>Enviar</BtnText>
      </Btn>
    </Container>
  );
}
