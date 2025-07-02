
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Images from '../../assets/images/index';
const loader = (props) => {
    function loaderonload() {
        if (props.load) {
            return (
                <View style={styles.container}>
                     <Image source={Images.logo.loader} style={{width:100,height:100,resizeMode:'contain'}} />
                </View>
            )
        } else {
            return null;
        }
    }

    return (
        loaderonload()
    );
};

export default loader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor:'#999',
        opacity:0.5,
        // alignItems: 'center',
        // flexDirection: 'row',
        // marginHorizontal: 40,
        position: 'absolute',
        zIndex: 9999,
        justifyContent: 'center',
        alignItems: 'center'
    },
});