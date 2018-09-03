import React, { Component } from 'react'
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
// import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import {Constants, storeLoanID,getLoanID} from './Constants.js';

import {
    View,
    Text,Picker,
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

    saveLoan = (date,userID, loanAmount ) => {
        if(date != '' && userID != '' && loanAmount != ''){
            // this.saveNewCustomer(name,nic,email,tp_mobile,bankAccount,userType)
            this.saveNewCustomerFirebase(date,userID,loanAmount)

        }else{
            alert("Please fill the fields");
        }
    }

    saveNewCustomerFirebase = async (date,userID,loanAmount) => {
        var dt = new Date(date);
        function add_months(dt, n)
        {
            return new Date(dt.setMonth(dt.getMonth() + n));
        }
        var nextPayment = new Date(add_months(dt,1));

        var yyyy = nextPayment.getFullYear();
        var dd = nextPayment.getDate();
        var mm = nextPayment.getMonth(); //January is 0!
        if(mm<10){
            mm='0'+mm;
        }
        var loanID = "Loan_"+dt+"_"+userID;

        Firebase.database().ref('loans/'+loanID).set(
            {
                date: date,
                userID: userID,
                loanAmount: loanAmount,
                payment_1: yyyy+"-"+mm+"-"+dd ,
                nextPayment: yyyy+"-"+mm+"-"+dd ,
                active:1,
            }
        ).then(() => {
            console.log('Inserted');
        }).catch((error) =>{
            console.log(error);
        });


        Firebase.database().ref('notes/' +date).set({
            date: date,
            note: this.state.note
        });





    }




    constructor(props) {
        super(props);
        const { navigation } = this.props;

        const date  = navigation.getParam('date');
        const userID  = navigation.getParam('userID');
        const loanAmount  = navigation.getParam('loanAmount');
        const note  = navigation.getParam('note');

        // alert(name + mobile );
        this.state = {
            date: date,
            userID: '',
            loanAmount: loanAmount,
            note: note,
            // userData:[ 'one', 'two', 'three', 'four', 'five' ],
            userData:[],
        };

    }

    componentWillMount(){
        this.spinnerUserSelect();
    }

    spinnerUserSelect(){
        var that = this;
        var finished = [];

        Firebase.database().ref('customers/').once('value').then( (snapshot) =>{
            console.log(snapshot.val());
            snapshot.forEach((data) => {
                let result = data.val();
                result["key"] = data.key;
                console.log(result.name);
                finished.push( result);
            })
        }).then(function () {
            that.setState({userData: finished})
            console.log(this.state.userData)
        })
    }
    render () {
        // let serviceItems = this.state.userData.map( (name, nic) => {
        //     console.log({nic})
        //     return <Picker.Item key={nic} value={name} label={name} />
        // });

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
                            <Text style={styles.text}>New Loans</Text>
                        </View>
                            <View style={{flex: 0.2}}>
                            </View>
                            </View>
                    </View>




                        <View style={{flex: 0.1}}>
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
                            </View>

                            <View style={{flex: 0.1}}>

                                <View style={styles.container_btn}>
                                    <View style={{flex: 0.3}}>
                                        <Text>  Loan Amount</Text>
                                    </View>
                                    <View style={{flex: 0.7}}>
                                        <TextInput style = {styles.input}
                                                   underlineColorAndroid = "transparent"
                                                   placeholderTextColor = "#000000"
                                                   autoCapitalize = "none"
                                                   returnKeyType="go"
                                                   onChangeText={(loanAmount) => this.setState({loanAmount: loanAmount})}
                                                   value={this.state.loanAmount}  />
                                    </View>
                                </View>

                            </View>

                <View style={{flex: 0.1}}>
                    <View style={styles.container_btn}>
                        <View style={{flex: 0.3}}>
                            <Text>  Notes</Text>
                        </View>
                        <View style={{flex: 0.7}}>
                            <TextInput style = {styles.input}
                                       underlineColorAndroid = "transparent"
                                       placeholderTextColor = "#000000"
                                       autoCapitalize = "none"
                                       returnKeyType="go"
                                       onChangeText={(note) => this.setState({note: note})}
                                       value={this.state.note}  />
                        </View>
                    </View>
                </View>

                <View style={{flex: 0.1}}>
                    <View style={styles.container_btn}>
                        <View style={{flex: 0.3}}>
                            <Text>  Customer</Text>
                        </View>
                        <View style={{flex: 0.7}}>
                            <Picker
                                selectedValue={this.state.userID}
                                style={{ height: 40, width: 300 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({userID: itemValue})}>
                                { this.state.userData.map(user => (
                                    <Picker.Item label={user.name} value={user.nic} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>




                <View style={{flex: 0.3}}>
                </View>




                <View style={{flex: 0.1, marginBottom: 20}}>
                    <View style={styles.container_btn}>
                        <View style={styles.button} >
                            <RaisedTextButton  color="#37474f" rippleDuration={600} rippleOpacity={0.54} title='Back'
                                               onPress={() => this.props.navigation.goBack(null)} titleColor='#ffffff' />
                        </View>
                        <View style={styles.button}>
                            <RaisedTextButton    color="#37474f" onPress={() => this.saveLoan(this.state.date, this.state.userID,this.state.loanAmount)}
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
        marginLeft: 150,
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