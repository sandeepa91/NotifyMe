import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,TouchableOpacity , Image,ScrollView,FlatList
} from 'react-native'

class CustomersAll extends Component {

    constructor(props){
        super(props);
        this.state = {
            data:[{"customerName": "Sandeepa Dilshan", "customerMobile":"0712127275"},
                {"customerName":"Nilantha Sampath", "customerMobile":"0712424585"}],
        };
    }

    componentWillMount(){
        // const date =  this.props.navigation.state.params.date;
        // const contractorId =  this.props.navigation.state.params.contractorId;
        // const workId = this.props.navigation.state.params.workId;
        // this.fetchData(contractorId,workId,date);
        this.fetchData();
    }

    // fetchData = async (contractorId,workId,date) => {
    fetchData = async () => {
        // const  url_string  = "http://185.58.193.10:555/api/home/GetWorkersForSiteAndCompanies?contractorid="+contractorId+"&workid=" +workId+"&d="+date ;
        // const  url_string  = "http://185.58.193.10:555/api/home/GetWorkersForSiteAndCompanies?contractorid=2&workid=2&d=06/29/2018" ;
        // const response = await fetch(url_string );
        // const json = await response.json();
        // this.setState({ data: json.data });
    };

  static navigationOptions = ({ navigation }) => ({
    title: 'All Customer',
  })

  // openWorkerScreen( workerId, dayworkplanId,date,contractorName,dateString){
  // this.props.navigation.navigate('viewUsersScreen', {workerId,dayworkplanId,date,contractorName,url:this.props.navigation.state.params.url,dateString:dateString})
  // }

    openCustomerScreen( customerName,customerMobile ){
       alert(customerName,customerMobile);
       this.props.navigation.navigate('CustomerNew',{customerName: customerName,customerMobile:customerMobile})
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

              <Text style={styles.text}>All Customer</Text>

          <View style={styles.container_tbl}>
              <FlatList
                  data={this.state.data}
                  renderItem={({item})=>
                      <TouchableOpacity
                          onPress={(data) =>  this.openCustomerScreen(item.customerName,item.customerMobile )}>
                          <View style={styles.container_btn}>

                              <View style={{flex:0.55 }}  >
                                  <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}>{item.customerName}</Text>
                              </View>

                              <View style={{flex:0.05 }}  >

                              </View>
                              <View style={{flex:0.35 }} >
                                  <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}>{item.customerMobile}</Text>
                              </View>
                              <View style={{flex:0.05 }} >

                              </View>

                          </View>
                          <View style={{ borderBottomColor: 'black',borderBottomWidth: 1, }}/>
                      </TouchableOpacity>


                  }
                  keyExtractor={(item, index) => index.toString()}  />
          </View>
          </View>

      </View>
      )
  }
}

export default CustomersAll

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
     },
     container_btn: {
        marginTop:5,
        marginBottom: 3,
        marginLeft:3,
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
    },
    drawer:{
        marginTop:4,
        width:  35,
        height: 27,
    },
    container_tbl: { flex: 1,  backgroundColor: '#fff', padding:2 , paddingTop:5},
})
