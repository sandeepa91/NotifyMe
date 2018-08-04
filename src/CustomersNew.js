import React, { Component } from 'react'
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
// import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import {
    View,
    Text,
    StyleSheet,TouchableOpacity , Image,ScrollView,TextInput
} from 'react-native'

class CustomersNew extends Component {


    static navigationOptions = ({ navigation }) => ({
        title: 'New Customer',
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
            this.saveNewCustomer(name,nic,email,tp_mobile,bankAccount,userType)
        }else{
            alert("Please fill the fields");
        }
    }

    saveNewCustomer = async (name,nic,email,tp_mobile,bankAccount,userType) => {
        fetch('http://notifyme.resortsunandmoon.com/Customers/add.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "nic": nic,
                "email": email,
                "tp_mobile": tp_mobile,
                "account_no": bankAccount,
                "user_type": userType
            })
        }).then((response) => {
            {
                var res = response.ok;
                //{ res.toString() == 'true' ? this.setState({ progress_status : 0 }) : this.setState({ progress_status : 1 }) }
                // { res == 'ok' ? Alert.alert("response OK  "+response.ok) : Alert.alert("response "+response.ok)}
            }
        })
            .then((responseData) => { console.log("response: " + responseData); })
            .catch((err) => { console.log(err); });
    }

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        // const name = this.props.navigation.state.params.customerName;
        const name  = navigation.getParam('customerName');
        const nic  = navigation.getParam('customerNIC');
        const email = navigation.getParam('customerEmail');
        const bankAccount = navigation.getParam('customerBankAccount');
        // const mobile = this.props.navigation.state.params.customerMobile;
        const mobile = navigation.getParam('customerMobile');
        const customerType = navigation.getParam('customerType');
        const customerID = navigation.getParam('customerID');
        // alert(name + mobile );
        this.state = {
            name: name,
            nic: nic,
            email: email,
            bankAccount: bankAccount,
            customerType: customerType,
            mobile: mobile,
            customerID: customerID,

            progress: 0,
            indeterminate: true,
            progress_status: 0,

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

                    <Text style={styles.text}>New Customer</Text>

                    <ScrollView style={styles.container}>
                        <View style={styles.container}>
                            <View style={{height:4}}>

                            </View>
                            <View style={styles.container_btn}>
                                <View style={{flex: 0.3}}>
                                    <Text >  Name </Text>
                                </View>
                                <View style={{flex: 0.7}}>
                                    <TextInput style = {styles.input}
                                               underlineColorAndroid = "transparent"
                                               placeholderTextColor = "#000000"
                                               autoCapitalize = "none"
                                               returnKeyType="go"
                                               onChangeText={(name) => this.setState({name})}
                                               value={this.state.name}
                                               ref={(input) => this.passwordInput = input} />
                                </View>
                            </View>

                            <View style={styles.container_btn}>
                                <View style={{flex: 0.3}}>
                                    <Text>  NIC</Text>
                                </View>
                                <View style={{flex: 0.7}}>
                                    <TextInput style = {styles.input}
                                               underlineColorAndroid = "transparent"
                                               placeholderTextColor = "#000000"
                                               autoCapitalize = "none"
                                               returnKeyType="go"
                                               onChangeText={(nic) => this.setState({nic: nic})}
                                               value={this.state.nic}
                                               ref={(input) => this.passwordInput = input} />
                                </View>
                            </View>

                            <View style={styles.container_btn}>
                                <View style={{flex: 0.3}}>
                                    <Text >  Email</Text>
                                </View>
                                <View style={{flex: 0.7}}>
                                    <TextInput style = {styles.input}
                                               underlineColorAndroid = "transparent"
                                               placeholderTextColor = "#000000"
                                               autoCapitalize = "none"
                                               returnKeyType="go"
                                               onChangeText={(email) => this.setState({email: email})}
                                               value={this.state.email}
                                               ref={(input) => this.passwordInput = input} />
                                </View>
                            </View>

                            <View style={styles.container_btn}>
                                <View style={{flex: 0.3}}>
                                    <Text>  Mobile</Text>
                                </View>
                                <View style={{flex: 0.7}}>
                                    <TextInput style = {styles.input}
                                               underlineColorAndroid = "transparent"
                                               placeholderTextColor = "#000000"
                                               autoCapitalize = "none"
                                               returnKeyType="go"
                                               onChangeText={(mobile) => this.setState({mobile: mobile})}
                                               value={this.state.mobile} />
                                </View>
                            </View>

                            <View style={styles.container_btn}>
                                <View style={{flex: 0.3}}>
                                    <Text>  Bank</Text>
                                </View>
                                <View style={{flex: 0.7}}>
                                    <TextInput style = {styles.input}
                                               underlineColorAndroid = "transparent"
                                               placeholderTextColor = "#000000"
                                               autoCapitalize = "none"
                                               returnKeyType="go"
                                               onChangeText={(bankAccount) => this.setState({bankAccount: bankAccount})}
                                               value={this.state.bankAccount} />
                                </View>
                            </View>

                            <View style={styles.container_btn}>
                                <View style={{flex: 0.3}}>
                                    <Text >  Customer Type</Text>
                                </View>
                                <View style={{flex: 0.7}}>
                                    <TextInput style = {styles.input}
                                               underlineColorAndroid = "transparent"
                                               placeholderTextColor = "#000000"
                                               autoCapitalize = "none"
                                               returnKeyType="go"
                                               onChangeText={(customerType) => this.setState({customerType: customerType})}
                                               value={this.state.customerType} />
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
                            <RaisedTextButton    color="#37474f" onPress={() => this.saveCustomer(this.state.name, this.state.nic ,
                                this.state.email,this.state.mobile,this.state.bankAccount, this.state.customerType)}
                                                 rippleDuration={600} rippleOpacity={0.54} title='Save' titleColor='#ffffff' />
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}
export default CustomersNew

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
        marginLeft: 60,
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