import { StyleSheet } from 'react-native';


export default StyleSheet.create({


/** Login */
container: {
    flex: 1,
    backgroundColor: '#ffffff'
},
    container_btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60
    },
    button_DNI: {
        margin:2,
        marginTop:5,
        backgroundColor: '#ffffff',
        width: '49%',
        height: 42
    },
    button: {
        margin:2,
        marginTop:5,
        backgroundColor: '#ffffff',
        width: '49%',
        height: 55
    },
    formLabel:{
        color: '#000000',
        fontSize: 30,
        height: 20,
        padding:5,
    },
    input: {
        margin:  2,
        height: 40,
        width: '98%',
        alignItems: 'stretch',
        borderColor: '#4b636e',
        borderWidth: 1,
        paddingLeft:2
    },

    //Photo avetar
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: '98%',
        height: 40
    },


    progress: {
        color: 'green',
        width : 300,
        margin: 10,
        alignItems: 'stretch',
    },

});