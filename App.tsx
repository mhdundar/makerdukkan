import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFetch } from "./lib/hook/useFetch";

const Button = () => (
  <TouchableOpacity>
    <Text />
  </TouchableOpacity>
);

interface Param {
  id: string;
}

interface Response {
  _id: string;
  Malzeme_Adi: string;
  Malzeme_Tipi: string;
  Malzeme_Adedi: number;
  Alici: string;
}

const App = () => {
  const { data } = useFetch<Param, Response>("https://gece.dev/{id}", {
    params: {
      id: "5f80cbd522f99a312c549f48",
    },
  });

  return (
    <View style={styles.container}>
      <Text>{data._id}</Text>
      <Text>{data.Alici}</Text>
      <Text>{data.Malzeme_Adedi}</Text>
      <Text>{data.Malzeme_Adi}</Text>
      <Text>{data.Malzeme_Tipi}</Text>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
