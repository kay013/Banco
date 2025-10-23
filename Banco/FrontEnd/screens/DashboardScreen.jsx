import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styled from "styled-components/native";
import { api } from "../services/api";

const Container = styled.View`
  flex: 1;
  background-color: #6b21a8;
  padding: 20px;
`;
const Balance = styled.Text`
  color: white;
  font-size: 26px;
  margin: 20px 0;
`;

export default function DashboardScreen({ navigation }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    api.get("/account/balance").then((res) => setBalance(res.data.balance));
  }, []);

  return (
    <Container>
      <Text style={{ color: "white", fontSize: 22 }}>Bem-vindo, cliente!</Text>
      <Balance>Saldo: R$ {balance}</Balance>
      <TouchableOpacity
        style={{
          backgroundColor: "#9333ea",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Transfer")}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Fazer Transferência</Text>
      </TouchableOpacity>
    </Container>
  );
}
