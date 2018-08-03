import { StyleSheet } from 'react-native';


export default StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#16a085',
        padding: 20,
    },
    text: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
    button: {
        position: 'absolute',
        top:  0,
        left: 0,
        width:  40,
        height: 40,
        backgroundColor: '#f39c12',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white'
    },drawer:{
        width:  40,
        height: 40,
    },

    modalContent: {
        backgroundColor: "white",
        height: 350,
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },

/** Login */
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ced7db',
},
    logoContainer:{
        backgroundColor: '#ced7db',
    },
    formContainer:{
        backgroundColor: '#ced7db',
    },
    welcome: {
        marginTop:20,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    logo:{width: 150, height: 150,
    },
    input: {
        margin: 15,
        height: 50,
        width:300,
        alignItems: 'stretch',
        borderColor: '#4b636e',
        borderWidth: 1,
        borderRadius: 25,
        paddingLeft: 20
    },
    submitButton: {
        backgroundColor: '#37474f',
        paddingTop: 10,
        alignItems: 'stretch',
        margin: 10,
        height: 50,
        borderRadius: 25
    },
    submitButtonText:{
        color: '#ffffff',
        fontWeight: '800',
        textAlign: 'center',
        fontSize: 15,
    },
    progress: {
        color: 'green',
        width : 300,
        margin: 10,
        alignItems: 'stretch',
    },



});
