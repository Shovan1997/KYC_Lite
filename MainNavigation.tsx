import {View, Text, TouchableOpacity, ToastAndroid, Image} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QubeCameraBlink from './Views/QubeCameraBlink';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Login from './Views/Login';
import QubeCamera from './Views/QubeCamera';
import HomeScreen from './Views/homeScreen';
import KycForm from './Views/KycForm';
import {connect} from 'react-redux';
import {StoreState} from './models/reduxModels';
import VideoCall from './Views/VideoCall';
import BankChoose from './Views/BankChoose';
import {ErrorModel} from './models/errorModels';
import WhiteList from './Views/WhiteList';
const Stack = createNativeStackNavigator();
const MainNavigation = (props: any) => {
  useEffect(() => {
    if (!!props.error) {
      ShowError(props.error);
    }
  }, [props.error]);
  const ShowError = (error: ErrorModel) => {
    if (!!error.Business_Errors && error.Business_Errors.length >= 1) {
      let err = error.Business_Errors[0];
      if (!!err.Message) {
        ToastAndroid.show(err.Message, 5000);
      }
    } else if (!!error.Info && error.Info.length >= 1) {
      let err = error.Info[0];
      if (!!err.Message) {
        ToastAndroid.show(err.Message, 5000);
      }
    } else if (!!error.System_Errors && error.System_Errors.length >= 1) {
      let err = error.System_Errors[0];
      if (!!err.Message) {
        ToastAndroid.show(err.Message, 5000);
      }
    } else if (!!error.Warnings && error.Warnings.length >= 1) {
      let err = error.Warnings[0];
      if (!!err.Message) {
        ToastAndroid.show(err.Message, 5000);
      }
    }
  };
  return (
    <>
      <Stack.Navigator
        // initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        {!!props.user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: true,
                headerTitle: 'User ID: ' + props.user.contact_no,
                headerRight: () => (
                  <TouchableOpacity
                    style={{
                      height: 60,
                      width: 60,
                      paddingTop: 2,
                      backgroundColor: '#fff',
                    }}>
                    <Image
                      style={{height: '60%', width: '100%', marginTop: 10}}
                      source={require('./assets/icon.jpeg')}
                    />
                  </TouchableOpacity>
                ),
              }}
            />

            <Stack.Screen
              name="KycForm"
              component={KycForm}
              options={{
                headerShown: true,
                headerTitle: 'Upload KYC',
                headerRight: () => (
                  <TouchableOpacity
                    style={{
                      height: 60,
                      width: 60,
                      paddingTop: 2,
                      backgroundColor: '#fff',
                    }}>
                    <Image
                      style={{height: '60%', width: '100%', marginTop: 10}}
                      source={require('./assets/icon.jpeg')}
                    />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen name="camera-blink" component={QubeCameraBlink} />
            <Stack.Screen name="camera" component={QubeCamera} />
            <Stack.Screen name="videocall" component={VideoCall} />
            <Stack.Screen
              name="branch-choose"
              component={BankChoose}
              options={{
                headerShown: true,
                headerTitle: 'Upload KYC',
                headerRight: () => (
                  <TouchableOpacity
                    style={{
                      height: 60,
                      width: 60,
                      paddingTop: 2,
                      backgroundColor: '#fff',
                    }}>
                    <Image
                      style={{height: '60%', width: '100%', marginTop: 10}}
                      source={require('./assets/icon.jpeg')}
                    />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name="whitelist-request"
              component={WhiteList}
              options={{
                headerShown: true,
                headerTitle: 'Whitelist Request',
                headerRight: () => (
                  <TouchableOpacity
                    style={{
                      height: 60,
                      width: 60,
                      paddingTop: 2,
                      backgroundColor: '#fff',
                    }}>
                    <Image
                      style={{height: '60%', width: '100%', marginTop: 10}}
                      source={require('./assets/icon.jpeg')}
                    />
                  </TouchableOpacity>
                ),
              }}
            />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    user: state.user.userdetail,
    error: state.user.error,
  };
};
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);
