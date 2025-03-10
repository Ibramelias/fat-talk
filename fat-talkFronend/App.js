import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import Navigation from './src/Navigation';

export default function App() {
  // const handlePressLink = () => {console.log('We Clicked it!!!')}
  return (
    <View style={styles.container}>
      {/* <Text onPress={handlePressLink}>Finally, fixing it, here</Text>
      <Image source={{
        uri: 'https://picsum.photos/200/300',
        width: 200,
        height: 300,
      }}/>
      <StatusBar style="auto" /> */}
    <Navigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'yellow',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});