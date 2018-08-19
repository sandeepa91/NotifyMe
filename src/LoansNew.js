import React, { Component } from 'react'
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
// import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import {
    View,
    Text,
    StyleSheet,TouchableOpacity , Image,ScrollView,TextInput
} from 'react-native'
import Firebase from './Firebase' ;

class LoansNew extends Component {


    static navigationOptions = ({ navigation }) => ({
        title: 'New Loan',
    })


    handleDNI = (text) => {
        this.setState({nic : text})
    }
    handleCategory = (text) => {
        this.setState({ bankAccount: text })
    }
    handleMachine = (text) => {
        this.setState({ customerType: text })
    }
    handleName = (text) => {
        this.setState({ name: text })
    }
    handleSurename = (text) => {
        this.setState({ email: text })
    }

    saveCustomer = (name,nic, email, tp_mobile, bankAccount, userType ) => {
        if(name != '' && nic != '' && tp_mobile != '' && userType != ''){
            // this.saveNewCustomer(name,nic,email,tp_mobile,bankAccount,userType)
            this.saveNewCustomerFirebase(name,nic,email,tp_mobile,bankAccount,userType)

        }else{
            alert("Please fill the fields");
        }
    }

    saveNewCustomerFirebase = async (name,nic,email,tp_mobile,bankAccount,userType) => {
        Firebase.database().ref('customers/'+nic).set(
            {
                name: name,
                nic: nic,
                email: email,
                mobile: tp_mobile,
                bankAccount: bankAccount,
                userType: 1,
            }
        ).then(() => {
            console.log('Inserted');
        }).catch((error) =>{
            console.log(error);
        });
    }



    constructor(props) {
        super(props);
        const { navigation } = this.props;

        const date  = navigation.getParam('date');
        const userID  = navigation.getParam('userID');
        const loanAmount  = navigation.getParam('loanAmount');

        // alert(name + mobile );
        this.state = {
            date: date,
            userID: userID,
            loanAmount: loanAmount,
        };

    }

    render () {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style = {styles.button}
                    onPress ={() => this.props.navigation.navigate('DrawerOpen')} >
                    <Image style = {styles.drawer} source={require('../img/drawer_icon.png')} />
                </TouchableOpacity>

                <View style={{flex: 0.9}}>

                    <Text style={styles.text}>New Loans</Text>

                    <ScrollView style={styles.container}>
                        <View style={styles.container}>
                            <View style={{height:4}}>

                            </View>
                            <View style={styles.container_btn}>
                                <View style={{flex: 0.3}}>
                                    <Text >  Date </Text>
                                </View>
                                <View style={{flex: 0.7}}>
                                    <TextInput style = {styles.input}
                                               underlineColorAndroid = "transparent"
                                               placeholderTextColor = "#000000"
                                               autoCapitalize = "none"
                                               returnKeyType="go"
                                               editable={false}
                                               onChangeText={(date) => this.setState({date})}
                                               value={this.state.date}
                                               ref={(input) => this.passwordInput = input} />
                                </View>
                            </View>

                            <View style={styles.container_btn}>
                                <View style={{flex: 0.3}}>
                                    <Text>  Customer</Text>
                                </View>
                                <View style={{flex: 0.7}}>
                                    <TextInput style = {styles.input}
                                               underlineColorAndroid = "transparent"
                                               placeholderTextColor = "#000000"
                                               autoCapitalize = "none"
                                               returnKeyType="go"
                                               onChangeText={(userID) => this.setState({userID: userID})}
                                               value={this.state.userID}
                                               ref={(input) => this.passwordInput = input} />
                                </View>
                            </View>



                        </View>

                    </ScrollView>
                </View>

                {/*<View style={{margin:10}} >*/}
                {/*{this.state.progress_status == '1' ? progressBar : null}*/}
                {/*</View>*/}

                <View style={{flex: 0.1, marginBottom: 20}}>
                    <View style={styles.container_btn}>
                        <View style={styles.button} >
                            <RaisedTextButton  color="#37474f" rippleDuration={600} rippleOpacity={0.54} title='Back'
                                               onPress={() => this.props.navigation.goBack(null)} titleColor='#ffffff' />
                        </View>
                        <View style={styles.button}>
                            <RaisedTextButton    color="#37474f" onPress={() => this.saveLoan(this.state.date, this.state.userID)}
                                                 rippleDuration={600} rippleOpacity={0.54} title='Save' titleColor='#ffffff' />
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}
export default LoansNew

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container_btn: {
        marginTop:5,
        marginBottom: 3,
        marginLeft:3,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container_title: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        marginLeft: 80,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        margin:2,
        marginTop:5,
        backgroundColor: '#ffffff',
        width: '49%',
        height: 42
    },
    buttonText: {
        color: 'white'
    },
    drawer:{
        marginTop:4,
        width:  35,
        height: 27,
    },
    input:{
        margin:  2,
        height: 45,
        width: '98%',
        alignItems: 'stretch',
        borderColor: '#4b636e',
        borderWidth: 1
    },
})