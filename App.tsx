import { StatusBar } from 'expo-status-bar';
import React, {type PropsWithChildren, useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, AppState, TouchableOpacity } from 'react-native';
import Backup from "./services/Backup";
import * as DocumentPicker from 'expo-document-picker';

export default function App() {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [backendConnected, setBackendConnected] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        // App has come to the foreground!
        Backup.get()
        .then((res:any) => setBackendConnected(true))
        .catch((err:string) => {
          setBackendConnected(false)
          console.error("Failed to connect to backend " + err)
        })
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.type);
    console.log(result);
  }


  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      { backendConnected ? <Text style={{color: "green"}}>"CONNECTED"</Text> : <Text style={{color: "red"}}>"DISCONNCETED"</Text> }
      <TouchableOpacity activeOpacity={0.8} onPress={_pickDocument}>
        <Text>Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
