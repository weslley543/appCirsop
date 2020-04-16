import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, AsyncStorage, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Estilos from '../../assets/Estilos'
import api from '../services/api'


export default function Map({ navigation }) {
  const [region, setInitialRegion] = useState();
  const [ownLocation, setOwnLocation] = useState();
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    async function LoadingInitialPosition() {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }

      let location = await Location.getCurrentPositionAsync({});

      await setInitialRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0142,
          longitudeDelta: 0.0231
        }
      );
     await setOwnLocation(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      );
      
    }
    async function loadMarkers() {
      try {
        let result = await api.get('/ocurrance',
          {
            headers: {
              Authorization: 'Bearer ' + await AsyncStorage.getItem('token'),
              user: await AsyncStorage.getItem('user')
            }
          }

        )


        setMarkers(JSON.parse(result.request._response));

      } catch (e) {
        console.log(e);
      }

    }


    const unsubscribe = navigation.addListener('focus', () => {
      LoadingInitialPosition();
      loadMarkers();
    });
    return unsubscribe;

  }, [])

  function renderMarkers() {
    let marcador = markers.map((marker, index) => {
      return (<Marker key={index} coordinate={{
        latitude: marker.lat,
        longitude: marker.lng,
      }} >
        <Callout style={styles.callOutView} >
          <Text style={styles.label}>Tipo da ocorrência : </Text>
          <Text>{marker.type}</Text>
          <Text style={styles.label}>Descrição : </Text>
          <Text>{marker.description}</Text>
          <Text style={styles.label}>Registrado em  : </Text>
          <Text>{marker.createdAt}</Text>
        </Callout>
      </Marker>);
    })
    return marcador;
  }

  return (

    <View style={Estilos.container}>
      <MapView style={Estilos.map} showsMyLocationButton={true} showsUserLocation={true}
        followsUserLocation={true} initialRegion={region} loadingEnabled={true}
        provider={PROVIDER_GOOGLE}

      >
        {

          renderMarkers()
        }
        <Marker
          coordinate={{
            latitude:ownLocation.latitude,
            longitude:ownLocation.longitude
          }}
          pinColor= '#76ff03'
          draggable
          title= 'Sua localização'
        />
        <View style={styles.place}>
          <Text style={styles.label}>Latitude</Text>
        </View>
      </MapView>

    </View>
  )
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  place: {
    width: width - 40,
    maxHeight: 400,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    justifyContent: 'flex-end'

  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'transparent'
  },
  callOutView: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 25,
    padding: 10,
    backgroundColor: '#4286f4',
    width: width - 40,
    height: 50
  }
})