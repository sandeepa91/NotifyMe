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
import Firebase from './Firebase' ;

//disable the warning masages on bottom of the UI
// YellowBox.ignoreWarnings(['Warning: Failed']);

//Calendars localized
LocaleConfig.locales['Ca'] = {
    monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    monthNamesShort: ['Janu.','Febr.','Mar.','Apri.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'],
    dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    dayNamesShort: ['Su','Mo','TU.','We','Th','Fr','Sa']
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

    /** START - Create new Loan*/
    _createNewLoan({date}){
        this.setState({ visibleModal: null });
       // alert(date);
        this.props.navigation.navigate('LoansNew', {date: date});
    }
    /** END - Create new Loan*/


    /** START - Create new Note*/
    _saveDateRelatedNote(){
        Firebase.database().ref('notes/' + this.state.currentdate).set({
            date: this.state.currentdate,
            note: this.state.note
        });
        this.setState({ visibleModal: null });
    }
    /** END - Create new Note*/


    /** START - View note view model*/
    _renderNoteModalContent = (noteObj ) => (
        <View style={stylesModel.modalContent} >
            <Text> Note </Text>
            <TextInput style = {stylesModel.inputModel}
                       underlineColorAndroid = "transparent"
                       placeholderTextColor = "#000000"
                       autoCapitalize = "none"
                       placeholder={noteObj[1]}
                // value={noteObj[1]}

                       returnKeyType="go"
                //onChangeText={this.handleNotes}
                       onChangeText={(note) => this.setState({note})}
                       value={this.state.note}
                // onChangeText={(text) => this.setState({text})}
                // onChangeText={(text) => this.setState({text})}
            />
            <View style={stylesModel.modelContainer_btn_bottom}>
                <View style={stylesModel.modelButton}>
                    <RaisedTextButton  color="#ff1744" onPress={() => this.setState({ visibleModal: null })}
                                       rippleDuration={600} rippleOpacity={0.54} title='Cancel'  titleColor='#ffffff' />
                </View>
                <View style={stylesModel.modelButton} >
                    <RaisedTextButton    color="#37474f"  onPress={() => this._saveDateRelatedNote() }
                                         rippleDuration={600} rippleOpacity={0.54} title='Update Note'     titleColor='#ffffff' />
                </View>
            </View>
        </View>
    );
    /** END - View note view model*/


    /** START - View note view model*/
    _renderDateRelatedCustomers = (date ) => (
        <View style={stylesModel.modalContent} >
            <Text style={{marginBottom:20}}> Date : {date} </Text>

            <FlatList
                data={this.state.selectedDateCustomers}
                renderItem={({item}) =>
                    <View style={{flex: 1,
                        flexDirection: 'row'}}  >
                        <View style={{width: '35%'}}>
                            <Text style={{ padding: 2,fontWeight: 'bold',fontSize: 14,}}>{item.name}</Text>
                        </View>
                        <View style={{width: '30%'}}>
                            <Text style={{  padding: 2,fontWeight: 'bold',fontSize: 14,}}> {item.loanAmount}</Text>
                        </View>
                        <View style={{width: '35%'}}>
                            <Text style={{ padding: 2,fontWeight: 'bold',fontSize: 14,}}>{item.mobile}</Text>
                        </View>
                    </View>
                }
                keyExtractor={(item, index) => index.toString()}  />

            <View style={stylesModel.modelContainer_btn_bottom}>
                <View style={stylesModel.modelButton}>
                    <RaisedTextButton  color="#ff1744" onPress={() => this.setState({ visibleModal: null })}
                                       rippleDuration={600} rippleOpacity={0.54} title='Cancel'  titleColor='#ffffff' />
                </View>
                <View style={stylesModel.modelButton} >
                    <RaisedTextButton    color="#37474f"  onPress={() => this._createNewLoan({date}) }
                                         rippleDuration={600} rippleOpacity={0.54} title='New Loan'     titleColor='#ffffff' />
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
            currentdate:'',
            nextDates:[],
            selectedDate: '',
            dateRelatedCustomers:[],
            selectedDateCustomers:[],
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

                <TouchableOpacity style = {styles.button}
                    onPress ={() => this.props.navigation.navigate('DrawerOpen')} >
                    <Image style = {styles.drawer} source={require('../img/drawer_icon.png')} />
                </TouchableOpacity>




        )
    }

    getSelectedDateLoans(selectedDate){
        var selectedDateLoanData = [];
        Firebase.database().ref('loans/').orderByChild('nextPayment')
            .startAt(selectedDate).endAt(selectedDate)
            .once('value').then( (snapshot) =>{
            snapshot.forEach((data) => {
                let result = data.val().userID.replace("\"","");
                let loanAmount = data.val().loanAmount.replace("\"","");

                if(result != null){
                    console.log("result_"+result);
                    Firebase.database().ref('customers/').orderByChild('nic')
                        .startAt(result).endAt(result)
                        .once('value').then( (snapshotLoan) =>{
                        snapshotLoan.forEach((dataLoan) => {
                            let resultData = dataLoan.val();
                            resultData["loanAmount"] = loanAmount;
                            resultData["key"] = dataLoan.key;
                            selectedDateLoanData.push( resultData);
                            this.setState({selectedDateCustomers:selectedDateLoanData})
                        })
                    })
                }
            })
        }).then(function () {
            console.log("result"+result);
        })
    }

    getCurrentDateLoans(){
        var loanData = [];
        Firebase.database().ref('loans/').orderByChild('nextPayment')
            .startAt(this.state.currentdate).endAt(this.state.currentdate)
            .once('value').then( (snapshot) =>{
            snapshot.forEach((data) => {
                let result = data.val().userID.replace("\"","");
                let loanAmount = data.val().loanAmount.replace("\"","");
                if(result != null){
                    console.log("result_"+result);
                    Firebase.database().ref('customers/').orderByChild('nic')
                        .startAt(result).endAt(result)
                        .once('value').then( (snapshotLoan) =>{
                        snapshotLoan.forEach((dataLoan) => {
                            let resultData = dataLoan.val();
                            resultData["loanAmount"] = loanAmount;
                            resultData["key"] = dataLoan.key;
                            loanData.push( resultData);
                            this.setState({dateRelatedCustomers: loanData})
                        })
                    })
                }
            })
        }).then(function () {
            console.log("result"+result);
        })
    }

    getCurrentDateNotes(){
        var loanData = [];
        Firebase.database().ref('notes/').orderByChild('date')
            .startAt(this.state.currentdate).endAt(this.state.currentdate)
            .once('value').then( (snapshot) =>{
            snapshot.forEach((data) => {
                let result = data.val().note.replace("\"","");
                console.log(result);
                this.setState({note: result})

            })
        }).then(function () {
            console.log("result"+result);
        })
    }

    getNextDates(){
        var that = this;
        var dates = [];

        Firebase.database().ref('loans/').once('value').then( (snapshot) =>{

            snapshot.forEach((data) => {
                let result = data.val();
                result["key"] = data.key;
                console.log(result.nextPayment);
                dates.push( result.nextPayment.replace("\"",""));
                that.setState({nextDates: dates})
                this.markDates(this.state.nextDates);
            })
        }).then(function () {
            that.setState({nextDates: dates})
        })

    }

    componentDidMount() {
        var currentdate = new Date();
        var dd = currentdate.getDate();
        var mm = currentdate.getMonth()+1;
        var yyyy = currentdate.getFullYear();

        if(dd<10){
            dd = '0'+dd
        }
        if(mm<10) {
            mm = '0'+mm
        }

        currentdate = yyyy+ '-' + mm  + '-' + dd;
        this.state.currentdate = currentdate;
        // this.state.currentdate = "2018-09-05";
        this.getCurrentDateLoans();
        this.getCurrentDateNotes();
        this.getNextDates();


        
        this.state.note = [{"note" : "Test note "}]

    }

    // call markDates function after get value in nextDay array
    markDates = (nextDay) => {
        var obj = nextDay.reduce((c, v) => Object.assign(c, {[v]: {selected: true,marked: true}}), {});
        this.setState({ marked : obj});
    }

  render () {



    return (

            <View style={styles.container}>

                <View>
                    <Modal isVisible={this.state.visibleModal === 1}>
                        {this._renderNoteModalContent(this.state.note)}
                    </Modal>
                </View>

                <View>
                    <Modal isVisible={this.state.visibleModal === 2}>
                        {/*{this._renderDateRelatedCustomers(this.state.selectedDate, this.state.selectedDateCustomers)}*/}
                        {this._renderDateRelatedCustomers(this.state.selectedDate)}
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
                            current={this.state.currentdate}
                            minDate={'2018-03-10'}
                            maxDate={'2028-08-29'}
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

                            <Text style={{marginLeft: 40}}>{this.state.currentdate}</Text>

                        <FlatList
                            data={this.state.dateRelatedCustomers}
                            renderItem={({item})=>
                                <TouchableOpacity  onPress={(data) =>  this.openCustomerScreen(item.customerName,item.customerMobile )}>

                                    <View style={styles.container_btn}>

                                        <View style={{flex:0.4 }}  >
                                            <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}>{item.name}</Text>
                                        </View>
                                        <View style={{flex:0.25 }} >
                                            <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}> {item.loanAmount}</Text>
                                        </View>
                                        <View style={{flex:0.35 }} >
                                            <Text style={{flex: 1, padding: 2,marginLeft: 10,fontWeight: 'bold',fontSize: 14,}}> {item.mobile} </Text>
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
        //this.props.navigation.navigate('CustomerEdit',{customerName,customerMobile})
    }

    openDateRelatedScreen(day){
        this.setState({selectedDateCustomers:null});
        var d = new Date(day.dateString);
        var weekday = ['Diumenge','Dilluns','Mimarts','Dimecres','Dijous','Divendres','Dissabte'];
        var monthNames = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];
        var dateString = weekday[d.getDay()]+' '+day.day + ' ' + monthNames[day.month-1].toString() ;
        this.setState({selectedDate:day.dateString});

        this.getSelectedDateLoans(day.dateString);
        var selectedDateCustomers = [];
            // {"customerID" : "01","customerName" : "Sandeepa Dilshan", "customerLoanAmount" : "25000", "customerMobile" : "0712127275"},
            // {"customerID" : "02","customerName" : "Yasindu Eranga  ", "customerLoanAmount" : "35000", "customerMobile" : "0713147275"},
            // {"customerID" : "03","customerName" : "Nilantha Sampath", "customerLoanAmount" : "50000","customerMobile" : "0712424585"}];
        //this.setState({selectedDateCustomers:selectedDateCustomers});

        this.setState({ visibleModal: 2 });

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
        padding:10,
        flex: 1,
        backgroundColor: '#ffffff'
    },
    calendar: {
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: '#e9eec3',
        backgroundColor:'#e9eec3',
        height: 350
    },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
      paddingTop:10,
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
        borderRadius: 25,
        height: 60,

    },
})
