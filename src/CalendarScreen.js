import React, { Component } from 'react'
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';

import {
  View,Image,
  Text,YellowBox,
  StyleSheet,TextInput,
  TouchableOpacity,ScrollView, Picker,FlatList
} from 'react-native'
import Modal from "react-native-modal";
import stylesModel from '../CSS/model.js';
import {Calendar, LocaleConfig} from 'react-native-calendars';

//disable the warning masages on bottom of the UI
// YellowBox.ignoreWarnings(['Warning: Failed']);

//Calendars localized
LocaleConfig.locales['Ca'] = {
    monthNames: ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'],
    monthNamesShort: ['Gene.','Febr.','Març','Abril','Mai','Juny','Juli.','Agos.','Sete.','Oct.','Nov.','Des.'],
    dayNames: ['Diumenge','Dilluns','Mimarts','Dimecres','Dijous','Divendres','Dissabte'],
    dayNamesShort: ['Diu.','Dil.','Mim.','Dime.','Dijo.','Diven.','Diss.']
};

LocaleConfig.defaultLocale = 'Ca';

class CalendarScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return{
            title: 'Notify Me',
            fontSize:20,
            headerTintColor: '#000000',
        }
    };

    /** START - View note view model*/
    _renderNoteModalContent = (noteObj ) => (
        <View style={stylesModel.modalContent} >
            <Text> Note </Text>
            <TextInput style = {stylesModel.inputModel}
                       underlineColorAndroid = "transparent"
                       placeholderTextColor = "#000000"
                       autoCapitalize = "none"
                       placeholder={noteObj['note']}
                // value={noteObj[1]}

                       returnKeyType="go"
                //onChangeText={this.handleNotes}
                       onChangeText={(note) => this.setState({note})}
                       value={this.state.notes}
                // onChangeText={(text) => this.setState({text})}
                // onChangeText={(text) => this.setState({text})}
            />
            <View style={stylesModel.modelContainer_btn_bottom}>
                <View style={stylesModel.modelButton}>
                    <RaisedTextButton  color="#ff1744" onPress={() => this.setState({ visibleModal: null })}
                                       rippleDuration={600} rippleOpacity={0.54} title='Cancel'  titleColor='#ffffff' />
                </View>
                <View style={stylesModel.modelButton} >
                    <RaisedTextButton    color="#37474f"  onPress={() => this._saveWorkandDateRelatedNote() }
                                         rippleDuration={600} rippleOpacity={0.54} title='Update Note'     titleColor='#ffffff' />
                </View>
            </View>
        </View>
    );
    /** END - View note view model*/


    /** START - View note view model*/
    _renderDateRelatedCustomers = (noteObj ) => (
        <View style={stylesModel.modalContent} >
            <Text> Note </Text>
            <TextInput style = {stylesModel.inputModel}
                       underlineColorAndroid = "transparent"
                       placeholderTextColor = "#000000"
                       autoCapitalize = "none"
                       placeholder={noteObj}
                // value={noteObj[1]}

                       returnKeyType="go"
                //onChangeText={this.handleNotes}
                       onChangeText={(note) => this.setState({note})}
                       value={this.state.notes}
                // onChangeText={(text) => this.setState({text})}
                // onChangeText={(text) => this.setState({text})}
            />
            <View style={stylesModel.modelContainer_btn_bottom}>
                <View style={stylesModel.modelButton}>
                    <RaisedTextButton  color="#ff1744" onPress={() => this.setState({ visibleModal: null })}
                                       rippleDuration={600} rippleOpacity={0.54} title='Cancel'  titleColor='#ffffff' />
                </View>
                <View style={stylesModel.modelButton} >
                    <RaisedTextButton    color="#37474f"  onPress={() => this._saveWorkandDateRelatedNote() }
                                         rippleDuration={600} rippleOpacity={0.54} title='Update Note'     titleColor='#ffffff' />
                </View>
            </View>
        </View>
    );
    /** END - View note view model*/


    constructor(props)
    {
        super(props);
        this.state = {
            IsUser: 1,
            marked: false,
            dateRelatedCustomers:[],
            visibleModal: null,
            note:[]
        };
    }

    renderLogin = () => {
        return ( <Text style={styles.itemText}>Login</Text> );
        this.onDayPress = this.onDayPress.bind(this);
    }

    renderCalendar = () => {
        return (
                <TouchableOpacity
                    style = {styles.button}
                    onPress ={() => this.props.navigation.navigate('DrawerOpen')} >
                    <Image style = {styles.drawer} source={require('../img/drawer_icon.png')} />
                </TouchableOpacity>
        )
    }




    componentDidMount() {
        // this.props.navigation.setParams({ handleLogout: this.handleLogout })
        // const dateData = this.props.navigation.state.params.dateData;
        // var nextDay = dateData;

        var nextDay =[
            '2018-07-01',
            '2018-07-05',
            '2018-07-08',
            '2018-07-07',
            '2018-07-18',
            '2018-07-17',
            '2018-08-28',
            '2018-08-29'];
        this.markDates(nextDay);

        var dateRelatedCustomers = [
            {"customerID" : "01","customerName" : "Sandeepa Dilshan", "customerLoanAmount" : "25000", "customerMobile" : "0712127275",},
            {"customerID" : "02","customerName" : "Yasindu Eranga  ", "customerLoanAmount" : "35000", "customerMobile" : "0713147275"},
            {"customerID" : "03","customerName" : "Nilantha Sampath", "customerLoanAmount" : "50000","customerMobile" : "0712424585"}];
        this.state.dateRelatedCustomers = dateRelatedCustomers;
        this.state.note = [{"note" : "Test note "}]
        this.markDates(nextDay);
    }

    // call markDates function after get value in nextDay array
    markDates = (nextDay) => {
        var obj = nextDay.reduce((c, v) => Object.assign(c, {[v]: {selected: true,marked: true}}), {});
        this.setState({ marked : obj});
    }

  render () {

      var currentdate = new Date();
      var dd = currentdate.getDate();
      var mm = currentdate.getMonth()+1;
      var yyyy = currentdate.getFullYear();
      if(dd<10) {
          dd = '0'+dd
      }if(mm<10) {
          mm = '0'+mm
      }
      currentdate = yyyy+ '/' + mm  + '/' + dd;

    return (

            <View style={styles.container}>

                <View>
                    <Modal isVisible={this.state.visibleModal === 1}>
                        {this._renderNoteModalContent(this.state.note)}
                    </Modal>
                </View>

                <View>
                    <Modal isVisible={this.state.visibleModal === 2}>
                        {this._renderDateRelatedCustomers("date")}
                    </Modal>
                </View>
                <View style={{flex: 0.1}}>
                    <Text style={styles.text}>I'm a Login!</Text>
                    {this.state.IsUser != '1' ? this.renderLogin() : this.renderCalendar()}
                </View>
                <View style={{flex: 0.7}}>
                    <ScrollView style={styles.container}>

                        <Calendar
                            style={styles.calendar}
                            current={currentdate}
                            minDate={'2018-03-10'}
                            maxDate={'2018-08-29'}
                            firstDay={1}
                            markingType={'custom'}
                            markedDates={ this.state.marked}
                            hideArrows={false}
                            onDayPress={(day) =>  this.openDateRelatedScreen(day) }
                        />

                    </ScrollView>
                </View>

                <View style={{flex: 0.2}}>
                    <View style={styles.container_tbl}>
                        <ScrollView style={styles.container}>

                            <Text style={{marginLeft: 40}}>{currentdate}</Text>

                        <FlatList
                            data={this.state.dateRelatedCustomers}
                            renderItem={({item})=>
                                <TouchableOpacity
                                    onPress={(data) =>  this.openCustomerScreen(item.customerName,item.customerMobile )}>

                                    <View style={styles.container_btn}>

                                        <View style={{flex:0.4 }}  >
                                            <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}>{item.customerName}</Text>
                                        </View>
                                        <View style={{flex:0.25 }} >
                                            <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}>Rs. {item.customerLoanAmount}</Text>
                                        </View>
                                        <View style={{flex:0.35 }} >
                                            <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}> {item.customerMobile} </Text>
                                        </View>

                                    </View>

                                    <View style={{ borderBottomColor: 'black',borderBottomWidth: 1, }}/>
                                </TouchableOpacity>


                            }
                            keyExtractor={(item, index) => index.toString()}  />
                        </ScrollView>
                    </View>

                </View>
                <View style={{flex: 0.1}}>
                    <View style={styles.container_btn}>

                        <View style={{flex:0.6 }}  >
                            <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}>Note : </Text>
                        </View>
                        <View style={{flex:0.05 }}  >
                        </View>
                        <View style={{flex:0.3 }} >
                            <TouchableOpacity style = {styles.noteViewButton} onPress={ ( ) => this.setState({ visibleModal: 1 })}>
                                <Text style = {styles.noteButtonText}> View </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:0.05 }}  >
                        </View>

                    </View>
                </View>
            </View>


      )
  }

    openCustomerScreen( customerName,customerMobile ){
        alert(customerName + customerMobile);
        //this.props.navigation.navigate('CustomerNew',{customerName,customerMobile})
    }

    openDateRelatedScreen(day){

        var d = new Date(day.dateString);
        var weekday = ['Diumenge','Dilluns','Mimarts','Dimecres','Dijous','Divendres','Dissabte'];
        var monthNames = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];
        var dateString = weekday[d.getDay()]+' '+day.day + ' ' + monthNames[day.month-1].toString() ;
        this.setState({ visibleModal: 2}, {dateString} );
        //alert('day: ' + day.dateString)
        //this.props.navigation.navigate('ShowDateDataScreen', {day: day, dateString: dateString,url:this.state.base_url})
    }

    _onShow(value: boolean): void {
        this.setState({
            isShowingOptions: value,
        });
    }

    _onSelect(item: Object, isShow: boolean): void {
        this.setState({
            isShowingOptions: isShow,
            selectedOption: item,
        });
    }

    onDayPress(day) {
        this.setState({
            selected: day.dateString
        });
    }
}

export default CalendarScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    calendar: {
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 350
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
    noteButtonText:{
        color: '#ffffff',
        fontWeight: '800',
        textAlign: 'center',
        fontSize: 15,
    },
    noteViewButton: {
        borderColor: '#e53935',
        backgroundColor: '#37474f',
        alignItems: 'stretch',
        borderRadius: 30
    },
})
