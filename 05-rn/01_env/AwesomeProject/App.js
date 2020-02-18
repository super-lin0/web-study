/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

const generateRandomNumber = () => {
  return Math.round(Math.random() * 100);
};

const App = () => {
  const [text, setText] = useState('');

  const currentNumber = useRef(generateRandomNumber()).current;
  const count = useRef(0);

  console.warn(currentNumber);

  const doGuess = () => {
    count.current++;
    const inputNumber = Number(text);

    if (inputNumber > currentNumber) {
      Alert.alert('大了');
    } else if (inputNumber < currentNumber) {
      Alert.alert('小了');
    } else {
      Alert.alert(`bingo,一共猜了${count.current}次`);
      count.current = 0;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput style={styles.input} value={text} onChangeText={setText} />
      <TouchableOpacity style={styles.button} onPress={doGuess}>
        <Text style={styles.buttonText}>猜</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 50,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 10,
    fontSize: 26,
  },
  button: {
    borderColor: 'blue',
    borderWidth: 2,
    marginTop: 20,
    padding: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
  },
});

export default App;
