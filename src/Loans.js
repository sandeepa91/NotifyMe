import React, { Component } from 'react'
import {
    View,Image,
    Text,TouchableOpacity,ScrollView, Picker,FlatList,
    StyleSheet,
} from 'react-native'
import Firebase from "./Firebase";

class Loans extends Component {

    constructor(props){
        super(props);
        this.state = {
            data:[{"loanStartedDate": "2018/08/11","customerName": "Sandeepa Dilshan", "loanAmount":"500000","customerMobile":"0712127275","loanStatus":"0"},
                {"loanStartedDate": "2018/07/01", "customerName":"Nilantha Sampath","loanAmount":"250000", "customerMobile":"0712424585","loanStatus":"1"}],
        };
    }

    componentWillMount(){
        var that = this;
        var finished = [];

        Firebase.database().ref('Loan/').once('value').then( (snapshot) =>{
            console.log(snapshot.val());
            snapshot.forEach((data) => {
                let result = data.val();
                result["key"] = data.key;
                console.log(result);
                finished.push( result);
            })
        }).then(function () {
            that.setState({data: finished})
            console.log(this.state.data)
        })
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

                    <Text style={styles.text}>All Loans</Text>

                    <View style={styles.container_tbl}>
                        <ScrollView style={styles.container}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({item})=>
                                <TouchableOpacity
                                    onPress={(data) =>  this.openCustomerScreen(item.customerName,item.customerMobile )}>
                                    <View style={styles.container_btn}>

                                        <View style={{flex:0.3 }}  >
                                            <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}>{item.loanStartedDate}</Text>
                                        </View>
                                        <View style={{flex:0.3 }} >
                                            <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}>{item.customerName}</Text>
                                        </View>
                                        <View style={{flex:0.25 }} >
                                            <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}>{item.loanAmount}</Text>
                                        </View>
                                        <View style={{flex:0.15 }} >
                                            <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}>{item.loanStatus}</Text>
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
