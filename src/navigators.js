
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

// Navigators
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation'

// StackNavigator screens
import ItemList from './ItemList'
import Item from './Item'

// TabNavigator screens
import CustomersAll from './CustomersAll'
import CustomerNew from './CustomerNew'
import TabC from './TabC'

// CalendarScreen old component
import CalendarScreen from './CalendarScreen'

import Home from './Home'
import Search from './Search'
import Loans from './Loans'
import LoansActive from './LoansActive'
import LoansInactive from './LoansInactive'
import Investment from './Investment'

export const Login = StackNavigator({
    Login : { screen: Home},
})


export const SearchScreen = StackNavigator({
    Search : { screen: Search,
        navigationOptions: {
            headerStyle: {display:"none"},
            headerLeft: null
        },
    },
})

export const LoanScreen = StackNavigator({
    Loan : { screen: Loans,
        navigationOptions: {
            headerStyle: {display:"none"},
            headerLeft: null
        },
    },
})

export const InvestmentScreen = StackNavigator({
    Investment : { screen: Investment,
        navigationOptions: {
            headerStyle: {display:"none"},
            headerLeft: null
        },
    },
})


export const Stack = StackNavigator({
    Plain: { screen: CalendarScreen },
    ItemList: { screen: ItemList },
    Item: { screen: Item },
},{
    initialRouteName: 'ItemList',
})

export const Tabs = TabNavigator({
    CustomersAll: { screen: CustomersAll  },
    CustomerNew: { screen: CustomerNew  },
  // TabC: { screen: TabC },
}, {
    tabBarPosition : 'bottom',
  order: ['CustomersAll', 'CustomerNew']
})

export const TabsLoans = TabNavigator({
    All : { screen: LoanScreen  },
    Active: { screen: LoansActive  },
    Inactive: { screen: LoansInactive },
}, {
    tabBarPosition : 'bottom',
    order: ['All', 'Active', 'Inactive']
})

export const Drawer = DrawerNavigator({

    Calendar: { screen: CalendarScreen },
    Tabs: { screen: Tabs, navigationOptions: {
            headerStyle: {display:"none"},
            headerLeft: null
        }},

    Loan: { screen: TabsLoans },
    Investment: { screen: InvestmentScreen },
    Stack: { screen: Stack },
    Search: { screen: SearchScreen },

})
