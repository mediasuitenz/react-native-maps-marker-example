import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

// import facilities from './mockdata/facilities.json'
// import facilityMarker from './assets/toilet.png'
import moorings from './mockdata/moorings.json'
import mooringMarker from './assets/mooring.png'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // facilities: facilities.data.map(facility => {
      //   const geom = JSON.parse(facility.attributes.geometry).coordinates
      //   facility.attributes.coordinate = {
      //     latitude: geom[1],
      //     longitude: geom[0]
      //   }
      //   return facility
      // }),
      moorings: moorings.data.map(mooring => {
        const geom = JSON.parse(mooring.attributes.geometry).coordinates
        mooring.attributes.coordinate = {
          latitude: geom[1],
          longitude: geom[0]
        }
        return mooring
      })
    }
    // console.log('Loaded facilities', this.state.facilities.length)
    console.log('Loaded moorings', this.state.moorings.length)
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: -41.0205168,
            longitude: 173.9723944,
            latitudeDelta: 0.26949, // No idea how this works, used some voodoo from here
            longitudeDelta: 0.76276, // https://github.com/airbnb/react-native-maps/issues/505
          }}>
          // {this.state.facilities.map(facility => (
          //   <MapView.Marker
          //     key={'facility-' + facility.id}
          //     coordinate={facility.attributes.coordinate}
          //     title={facility.attributes.name}
          //     description={facility.attributes['facility-type']}
          //     image={facilityMarker}
          //   />
          // ))}
          {this.state.moorings.map(mooring => (
            <MapView.Marker
              key={'mooring-' + mooring.id}
              coordinate={mooring.attributes.coordinate}
              title="Mooring"
              description={mooring.attributes['mooring-number']}
              image={mooringMarker}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // height: 400,
    // width: 400,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    margin: 10,
    marginTop: 50,
  }
});

Expo.registerRootComponent(App);
