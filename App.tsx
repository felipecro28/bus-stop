import {
  Button,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { getBusStop, IBusResponse } from "./services/api";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject>(
    {} as Location.LocationObject
  );
  const [accessDenied, setAccessDenied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [busStops, setBusStops] = useState<IBusResponse>();
  const [turnOn, setTurnOn] = useState<boolean>(true);

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

  const fetchBusStopData = async () => {
    const { latitude, longitude } = location.coords;
    getBusStop(latitude, longitude)
      .then(({ data }) => setBusStops(data))
      .catch(() =>
        Alert.alert(
          "Erro!",
          "Não foi possível obter as informações sobre os pontos de ônibus no momento. Tente novamente mais tarde!"
        )
      );
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
        minZoomLevel={16}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Você está aqui! :)"
        >
          <Image
            source={require("./assets/home-pin.png")}
            style={{ width: 40, height: 40 }}
          />
        </Marker>
        {busStops?.results?.map((stop) => (
          <Marker
            key={stop.poi.name}
            coordinate={{
              latitude: stop.position.lat,
              longitude: stop.position.lon,
            }}
            title={stop.poi.name}
            description={stop.address.freeformAddress}
          >
            <Image
              source={require("./assets/google-maps-bus-icon-15.png")}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchButton}>
        <Button
          onPress={() => {
            turnOn ? fetchBusStopData() : setBusStops({} as IBusResponse);
            setTurnOn(!turnOn);
          }}
          color="#de3f00fd"
          title={turnOn ? "Pesquisar" : "Limpar Busca"}
        />
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
