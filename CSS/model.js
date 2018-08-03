import { StyleSheet } from 'react-native';


export default StyleSheet.create({
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
        marginTop:20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    inputModel: {
        margin:  2,
        height: 200,
        width: '98%',
        alignItems: 'stretch',
        borderColor: '#4b636e',
        borderWidth: 1
    },
    modelContainer_btn_bottom: {
        marginTop: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modelButton: {
        margin:2,
        marginTop:5,
        backgroundColor: '#ffffff',
        width: '49%',
        height: 42
    },



});