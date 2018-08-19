import React, { Component } from 'react'
import {
    View,Image,
    Text,TouchableOpacity,ScrollView, Picker,
    StyleSheet,
} from 'react-native'

class Investment extends Component {


    render () {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style = {styles.button}
                    onPress ={() => this.props.navigation.navigate('DrawerOpen')} >
                    <Image style = {styles.drawer} source={require('../img/drawer_icon.png')} />
                </TouchableOpacity>
                <Text style={styles.text}> Investment</Text>
            </View>
        )
    }
}

export default Investment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    text: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
    },
    button: {
        position: 'absolute',
        top:  0,
        left: 0,
        width:  40,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white'
    },drawer:{
        marginTop:4,
        width:  35,
        height: 27,
    }
})
