import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

function generateRandomNumber() {
  return Math.round(Math.random() * 100);
}
const App = () => {
  const [text, setText] = React.useState('');
  const currentNumber = React.useRef(generateRandomNumber());
  const count = React.useRef(0);

  function doGuess() {
    count.current++;
    const inputNumber = Number(text);
    if (inputNumber > currentNumber.current) {
      Alert.alert('大了');
    } else if (inputNumber < currentNumber.current) {
      Alert.alert('小了');
    } else {
      Alert.alert(`bingo!你一共猜了${count.current}次`);
      count.current = 0;
    }
  }
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
    // alignItems: 'stretch'
  },
  input: {
    marginTop: 500,
    borderWidth: 2,
    borderColor: 'black',
    marginHorizontal: 20,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 26,
  },
  button: {
    borderWidth: 2,
    borderColor: 'blue',
    marginTop: 20,
    width: 50,
    padding: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 22,
  },
});

export default App;
