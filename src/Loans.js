import React, { Component } from 'react'
import {
    View,Image,
    Text,TouchableOpacity,ScrollView, Picker,FlatList,
    StyleSheet,
} from 'react-native'
import Firebase from "./Firebase";
import Images from "../img/images.js";

class Loans extends Component {

    constructor(props){
        super(props);
        this.state = {
            data:[],
        };
    }

    componentWillMount(){

        var that = this;
        var finished = [];

        Firebase.database().ref('loans/').once('value').then((snapshot) =>{

            snapshot.forEach((data) => {
                let result = data.val();
                let userID = data.val().userID
                let userName = ''
                Firebase.database().ref('customers/').child(userID)
                    .once('value').then( (snapshotLoan) =>{
                    userName  = snapshotLoan.val().name ;
                    result["userName"] = userName;
                    finished.push( result);
                    that.setState({data: finished})
                })
            })
        }).then(function() {
        })

    }



    render () {
        const active =    <Image  style={{width: 20, height: 20,marginLeft:5}} source={Images.planned} /> ;
        const notActive =      <Image style={{width: 20, height: 20, marginLeft:5}}  source={Images.notPlanned} /> ;

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style = {styles.button}
                    onPress ={() => this.props.navigation.navigate('DrawerOpen')} >
                    <Image style = {styles.drawer} source={require('../img/drawer_icon.png')} />
                </TouchableOpacity>
                <View style={{flex: 0.9}}>

                    <Text style={styles.text}> Loans - All </Text>

                    <View style={styles.container_tbl}>
                        <ScrollView style={styles.container}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({item})=>
                                <TouchableOpacity
                                    onPress={(data) =>  this.openCustomerScreen(item.customerName,item.customerMobile )}>
                                    <View style={styles.container_btn}>

                                        <View style={{flex:0.3 }} >
                                            <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}>{item.date}</Text>
                                        </View>
                                        <View style={{flex:0.3 }} >
                                            <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}>{item.userName}</Text>
                                        </View>
                                        <View style={{flex:0.25 }} >
                                            <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}>{item.loanAmount}</Text>
                                        </View>
                                        <View style={{flex:0.15 }} >
                                            {item.active == 1 ? active : notActive }
                                        </View>
                                    </View>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }}/>
                                </TouchableOpacity>
                            }
                            keyExtractor={(item, index) => index.toString()}  />
                        </ScrollView>
                    </View>
                </View>

            </View>
        )
    }
}

export default Loans

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 10,
    },
    text: {
        marginLeft: 60,
        color: 'black',
        fontSize: 20,
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
    },
    container_tbl: { flex: 1,  backgroundColor: '#fff', padding:2 , paddingTop:5},
    container_btn: {
        marginTop:5,
        marginBottom: 3,
        marginLeft:3,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})
