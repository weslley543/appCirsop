import React, { useState } from  'react';
import {Image, View} from 'react-native'

import  MapView , { AnimatedRegion } from 'react-native-maps';


export default function Driver (){
    const [driver, setDriverPosition] = useState({uid : "noIdPassed", location:{latitude:0,longitude:0}});


    const coordinate = new MapView.Marker.AnimatedRegion({
        latitude:driver.location.latitude,
        longitude:driver.location.longitude
    });

    return(
        <View/>
    )
}