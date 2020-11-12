import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useFetch } from "./lib/hook/useFetch";

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
  const [value, setValue] = useState("5f80cbd522f99a312c549f48");

  const { data, load, isLoading } = useFetch<Param, Response>(
    "https://gece.dev/{id}",
    {
      params: {
        id: value,
      },
    },
  );

  const onTextChangeHandler = () => {
    load({ id: value });
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <Text>{JSON.stringify(data, null, 2)}</Text>

      {/*
      <Text>{data?._id}</Text>
      <Text>{data?.Alici}</Text>
      <Text>{data?.Malzeme_Adedi}</Text>
      <Text>{data?.Malzeme_Adi}</Text>
      <Text>{data?.Malzeme_Tipi}</Text>
      */}

      <View style={styles.wrapper}>
        <TextInput style={styles.input} value={value} onChangeText={setValue} />

        <TouchableOpacity onPress={onTextChangeHandler} style={styles.button}>
          <Text>Request</Text>
          {isLoading && <ActivityIndicator color="#fff" />}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  wrapper: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#d1313c",
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#ccc",
    width: 220,
    fontSize: 12,
    textAlign: "center",
  },
});
