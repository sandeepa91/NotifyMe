import React, { Component } from 'react'
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
// import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import {
  View,
  Text,
    StyleSheet,TouchableOpacity , Image,ScrollView,TextInput
} from 'react-native'

class CustomerEdit extends Component {

      static navigationOptions = ({ navigation }) => ({
        title: 'Edit Customer',
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

    saveCustomer = (name,nic, email, mobile, bankAccount, userType ) => {
        if(name != '' && nic != '' && mobile != '' && userType != ''){
            alert(name+ nic + email + mobile + bankAccount +userType)
           // this.fetchSaveCustomerData(name,nic, email, mobile, bankAccount, userType);
           // this.handlePostPress();
        }else{
            alert("Please fill the fields");
        }
    }



    constructor(props) {
        super(props);
        const { navigation } = this.props;
        // const name = this.props.navigation.state.params.customerName;
        // const name  = navigation.getParam('customerName');
        // const nic  = navigation.getParam('customerNIC');
        // const email = navigation.getParam('customerEmail');
        // const bankAccount = navigation.getParam('customerBankAccount');
        // // const mobile = this.props.navigation.state.params.customerMobile;
        // const mobile = navigation.getParam('customerMobile');
        // const customerType = navigation.getParam('customerType');
        // const customerID = navigation.getParam('customerID');
        // alert(name + mobile );
        this.state = {
            name:  '',
            nic: '',
            email: '',
            bankAccount: '',
            customerType: '',
            mobile: '',
            customerID: '',

            progress: 0,
            indeterminate: true,
            progress_status: 0,

        };

    }

    componentWillMount() {
        const { navigation } = this.props;
        // const name = this.props.navigation.state.params.customerName;
        const nic  = navigation.getParam('customerNIC');
        this.fetchData(nic);
      }


    async fetchData(nic) {

        try{
            const url_string = "http://notifyme.resortsunandmoon.com/Customers/read_one.php?nic=" +nic ;
            const response = await fetch(url_string);
            const json = await response.json();

            //this.setState({ data: json.data });
            if(json.data[0].nic != "null"){

                this.setState({ name: json.data[0].name });
                this.setState({ nic: json.data[0].nic });
                this.setState({ email: json.data[0].email });
                this.setState({ tp_mobile: json.data[0].tp_mobile });
                this.setState({ account_no: json.data[0].account_no });
                this.setState({ user_type: json.data[0].user_type });

                // this.props.navigation.navigate('ShowCalendarScreen', {dateData: json.data , url: this.state.base_url})
            }else{
                this.setState({progress_status : 0});
                Alert.alert("Alerta","L'inici de sessió no s'ha completat. Comprova el nom d'usuari i la contrasenya");
            }
        }catch(error){
            // this.setState({progress_status : 0});
        }

    };


        render () {
    return (
      <View style={styles.container}>
          <TouchableOpacity
              style = {styles.button}
              onPress ={() => this.props.navigation.navigate('DrawerOpen')} >
              <Image style = {styles.drawer} source={require('../img/drawer_icon.png')} />
          </TouchableOpacity>


          <View style={{flex: 0.1}}>
              <View style={styles.container_btn}>
                  <View style={{flex: 0.2}}>
                  </View>
                  <View style={{flex: 0.6}}>
                      <Text style={styles.text}>Edit Customer</Text>
                  </View>
                  <View style={{flex: 0.2}}>
                  </View>
              </View>
          </View>


          <View style={{flex: 0.9}}>


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

export default CustomerEdit

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
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
        paddingTop:10,
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
