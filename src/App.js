import {View, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import MusicPlayer from './Screens/MusicPlayer';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={{flex: 1}}>
        <MusicPlayer />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
});
