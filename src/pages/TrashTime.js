import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default function TrashTime({navigation}) {
    const handleViewOcurrances = () =>{
        navigation.navigate('ViewOcurrance')
    }
    return (
        <View style={styles.container}>
             <TouchableOpacity onPress={handleViewOcurrances} style={styles.button}>
                <Icon name='arrow-left' size={25} color={'white'} />
            </TouchableOpacity>
                
                <Text style={styles.header}>Horários da coleta do lixo</Text>

                <Table></Table>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignContent: 'center',
        padding: 10,
        marginVertical: 10
    },
    button: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#4286f4',
        marginLeft: 5,
        marginTop: 15,
        width: 50
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    }
})