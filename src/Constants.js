
import { AsyncStorage} from 'react-native';

export const Constants = {
    REMEMBER_ME: false,


};

export const storeLoanID = async (loanID) => {
    try {
        await AsyncStorage.setItem('loanID',loanID);
    }catch (error) {
        console.log(error);
    }
};

export const storeEmail = async (username) => {
    try {
        await AsyncStorage.setItem('username',username);
    }catch (error) {
        console.log(error);
    }
};


export const storePassword = async (pw) => {
    try {

        await AsyncStorage.setItem('password',pw);
    } catch (error) {
        console.log(error);
    }
};

export const storeIsLogged = async (logged) => {
    try {
        await AsyncStorage.setItem('isLogged',logged);
       // alert(logged);
    } catch (error) {
        console.log(error);
    }
};


export const getLoanID = async (key) => {
    try {
        const tokenValue = await AsyncStorage.getItem(key);
        return tokenValue;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getEmail = async (key) => {
    try {
        const tokenValue = await AsyncStorage.getItem(key);
        return tokenValue;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export  const getPassword = async (key) => {
    try {
        const tokenValue = await AsyncStorage.getItem(key);
        return tokenValue;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export  const getIsLogged = async (key) => {
    try {
        const tokenValue = await AsyncStorage.getItem(key);
        return tokenValue;
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const removeToken = async (tokenKey) => {
    try {
        await AsyncStorage.removeItem(tokenKey);
    } catch (error) {
        console.log(error);
// Error delete data
    }
};