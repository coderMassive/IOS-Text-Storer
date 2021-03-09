import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage'

const STORAGE_KEY = '@save_message'

function Untitled(props) {
  const [message, setMessage] = useState('')
  const saveData = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, message)
  } catch (e) {
    alert('Failed to save the data to the storage')
  }
}
const readData = async () => {
  try {
    const userMessage = await AsyncStorage.getItem(STORAGE_KEY)

    if (userMessage !== null) {
      setMessage(userMessage)
    }
  } catch (e) {
    alert('Failed to fetch the data from storage')
  }
}
useEffect(() => {
  readData()
}, [])
const clearStorage = async () => {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    alert('Failed to clear the async storage.')
  }
}
const onChangeText = userMessage => setMessage(userMessage)

const onSubmitEditing = () => {
  if (!message) return

  saveData(message)
  setMessage('')
}
  return (
    <View style = {{flex:1}}>
        <TextInput
          placeholder="Edit message here..."
          style={styles.textInput}
          onChangeText={onChangeText}
        ></TextInput>
        <Image
          source={require("./assets/images/send+icon-1320185654900887696.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <TouchableOpacity
        style={styles.button}
        onPress={onSubmitEditing}></TouchableOpacity>
<Text style={styles.text} multiline={true}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 54,
    width: 316,
    fontSize: 20,
    marginTop: 700,
    marginLeft: 60
  },
  text: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 93,
    width: "90%",
    fontSize: 50,
    opacity: 2,
    marginTop: 40,
    alignSelf: "center",
  },
  image: {
    top: 0,
    left: 220,
    width: 60,
    height: 54,
    position: "absolute",
    marginTop: 700,
    marginLeft: 40
  },
  button: {
    top: 0,
    left: 212,
    width: 68,
    height: 58,
    position: "absolute",
    marginTop: 700,
    marginLeft: 40
  },
});

export default Untitled;
