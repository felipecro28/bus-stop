import {
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { LocationObject } from "expo-location";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject>(
    {} as Location.LocationObject
  );
  const [accessDenied, setAccessDenied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserLocation: () => void = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Acesso Negado: ",
        "É necessário autorizar o acesso á localização do dispositivo para continuar."
      );
      setAccessDenied(true);
      return;
    }
    const locationResponse = await Location.getCurrentPositionAsync({});
    setLocation(locationResponse);
    setLoading(false);
  };

  useEffect(() => {
    getUserLocation();
  }, [accessDenied]);

  return !loading ? (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        mapType="mutedStandard"
        style={styles.map}
      />
      <View style={styles.searchButton}>
        <Button color="#de3f00fd" title="Pesquisar" />
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <MapView mapType="mutedStandard" style={styles.map} />
      <ActivityIndicator
        color="#de3f00b8"
        size={56}
        style={{ position: "absolute", top: "50%", alignSelf: "center" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontFamily: "",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchButton: {
    position: "absolute",
    bottom: 32,
    alignSelf: "center",
    width: "40%",
  },
});
