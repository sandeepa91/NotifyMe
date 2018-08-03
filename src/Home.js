import React , { Component } from 'react'
import styles from '../CSS/login_css.js';

import {
    View, Image,
    Text, StyleSheet, TextInput,
    TouchableOpacity, AppRegistry,
} from 'react-native'


class Home extends Component {
    state = {
        base_url : 'http://185.58.193.10:555/api/home',
        progress: 0,
        indeterminate: true,
        progress_status: 0,

        email: '',
        password: ''
    }

    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    login = (email, pass) => {
        if(email != '' && pass != ''){
            this.setState({progress_status : 1});
            this.fetchData(email,pass);
        }else{
            alert("Ompliu el nom d'usuari i la contrasenya");
        }
    }


    fetchData = async (email,pass) => {
        const url_string = this.state.base_url+"/GetPlannedDates?username="+email+"&password=" +pass ;
        const response = await fetch(url_string);
        const json = await response.json();
        this.setState({ data: json.data });
        if(json.data != "Invalid user"){
            this.setState({progress_status : 0});
            this.props.navigation.goBack(null)
            this.props.navigation.navigate('ShowCalendarScreen', {dateData: this.state.data, url: this.state.base_url})
        }else{
            this.setState({progress_status : 0});
            alert("L'inici de sessió no s'ha completat. Comprova el nom d'usuari i la contrasenya");
        }
    };

    animate() {
        let progress = 0;
        this.setState({ progress });
        setTimeout(() => {
            this.setState({ indeterminate: false });
            setInterval(() => {
                progress += Math.random() / 5;
                if (progress > 1) {
                    progress = 1;
                }
                this.setState({ progress });
            }, 500);
        }, 1500);
    }


    render() {


        return (
            <View style={styles.container}>

                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../img/notify.png')}  />
                </View>
                <Text style={styles.welcome}>
                    Benvingut a Barnasfalt
                </Text>

                <View style={styles.formContainer}>
                    <TextInput style = {styles.input}
                               underlineColorAndroid = "transparent"
                               placeholder = "Nom"
                               placeholderTextColor = "#000000"
                               autoCapitalize = "none"
                               returnKeyType="next"
                               onSubmitEditing={() => this.passwordInput.focus()}
                               keyBoardType='email-address'
                               autoCorrect={false}
                               onChangeText = {this.handleEmail}/>

                    <TextInput style = {styles.input}
                               underlineColorAndroid = "transparent"
                               placeholder = "Contrasenya"
                               placeholderTextColor = "#000000"
                               autoCapitalize = "none"
                               secureTextEntry
                               returnKeyType="go"
                               onChangeText = {this.handlePassword}
                               ref={(input) => this.passwordInput = input}/>

                    <View style={{margin:10}} >
                        {this.state.progress_status == '1' ? progressBar : null}
                    </View>
                    <TouchableOpacity
                        style = { styles.submitButton }
                        // onPress = { () => this.login(this.state.email, this.state.password)}
                        onPress={() => this.props.navigation.navigate('DrawerOpen')}
                        // onPress = { () =>  this.props.navigation.navigate('Plain') }
                    >
                        {/*AppRegistry.registerComponent('RNNavigators', () => Login );*/}
                    <Text style = {styles.submitButtonText}> Entrar </Text>
                    </TouchableOpacity>

                </View>
                {/*<Button onPress={() => this.props.navigation.navigate('ShowCalendarScreen')} title="Go"/>*/}
            </View>
    )
  }
}

export default Home
