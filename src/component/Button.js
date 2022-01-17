/* eslint-disable prettier/prettier */
import React from 'react'
import { StyleSheet, Text, Dimensions, TouchableHighlight } from 'react-native'

const styles = StyleSheet.create({
    button: {
        fontSize: 40,
        height: Dimensions.get('window').width /4, //pega as dimensões do celular e divide por 4
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#F0f0f0',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888'
    }
})

export default props => {
    return (
        <TouchableHighlight onPress={props.onClick}>
            <Text style={styles.button}>{props.label}</Text>
        </TouchableHighlight>

    )
}
