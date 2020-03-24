import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import React, { Component } from 'react'
import { Text, TouchableOpacity, View, AsyncStorage, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Location from 'expo-location';
import Estilos from '../../assets/Estilos'
import api from '../services/api'


export default class Map extends Component {
  state = {
    latitude: -22.120763,      // para renderizar mapa
    longitude: -51.408102,
    ownLocation: {},
    markers: [],
    
  }

  async componentDidMount() {   //invocado imediatamente apos a construcao do componente 
    let location = await Location.getCurrentPositionAsync({});
    await this.setState({
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0142,
        longitudeDelta: 0.0231
      },
      ownLocation:
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      },
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });

    this.carregarMarcadores();
  }

  async carregarMarcadores() {
    try {
      let result = await api.get('/ocurrance',
        {
          headers: {
            Authorization: 'Bearer ' + await AsyncStorage.getItem('token'),
            user: await AsyncStorage.getItem('user')
          }
        }

      )

      let markers = JSON.parse(result.request._response);

      this.setState({ markers })

    } catch (err) {
      console.log(err);
    }
  }

  
  render() {
    let date, dia,mes,ano;
    return (
      <View style={Estilos.container}>
        <MapView style={Estilos.map} showsMyLocationButton={true} showsUserLocation={true}
          followsUserLocation={true} initialRegion={this.state.region} loadingEnabled={true}
          provider={PROVIDER_GOOGLE}

        >
          {this.state.markers.map((marker, index) => (      //percorrendo array com os marcadores
            <Marker key={index}

              coordinate={{
                latitude: marker.lat,
                longitude: marker.lng,
              }}
            >
             
              <Callout style={styles.callOutView} >
                <Text style={styles.label}>Tipo da ocorrência : </Text>
                <Text>{marker.type}</Text>
                <Text style={styles.label}>Descrição : </Text>
                <Text>{marker.description}</Text>
                <Text style={styles.label}>Registrado em  : </Text>
                <Text>{marker.createdAt}</Text>
              </Callout>

            </Marker>
          ))}
          <MapView.Marker
            ref={(ref) => { this.marker = ref; }}
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            onDragEnd={e => {

              this.setState({ ownLocation: e.nativeEvent.coordinate })
            }}
            pinColor={"#76ff03"}
            title={"Sua localização"}
            draggable />
        </MapView>
        <View style={Estilos.viewMapa}>




          <View style={styles.place}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, backgroundColor: 'transparent', }}>Localização</Text>
            <Text>Latitude : {this.state.ownLocation.latitude}</Text>
            <Text>Longitude : {this.state.ownLocation.longitude}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}
                onPress={
                  async ({ navigation }) => {
                    await AsyncStorage.setItem('lat', this.state.ownLocation.latitude.toString())
                    await AsyncStorage.setItem('lng', this.state.ownLocation.longitude.toString())
                    this.props.navigation.navigate('Ocurrances')
                  }
                }>
                <Text style={{ color: 'white', fontSize: 15, padding: 2 }}>Ultilizar essa localização</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}
                onPress={
                  async ({ navigation }) => {
                    this.props.navigation.navigate('TrashTime')
                  }
                }>
                <Text style={{ color: 'white', fontSize: 18, padding: 2 }}>Hora do lixo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
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

  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  label:{
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
    width: width - 250,
    height:50
  }
})