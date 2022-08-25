import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import ValidateOTP from './validateOTP';
import {GenerateOtpP, ValidateOtps} from '../../models/userModels';
import RNOtpVerify from 'react-native-otp-verify';
const LoginView = ({
  OtpValidate,
  generateOtp,
  otp_flag,
  otp_reset,
  mobile,
}: LoginView) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const Submit = (data: any) => {
    if (data.contact_no1.length != 10) {
      ToastAndroid.show('Invalid Phone Number', 3000);
    } else {
      RNOtpVerify.getHash()
        .then(key => {
          var otp: GenerateOtpP = {
            key: key[0],
            contact_no: data.contact_no1,
          };
          generateOtp(otp);
        })
        .catch(console.log);
    }
  };
  return (
    <ImageBackground
      resizeMode="cover"
      style={{flex: 1}}
      source={require('../../assets/background.jpeg')}>
      <ValidateOTP
        otp_flag={otp_flag}
        otp_reset={otp_reset}
        OtpValidate={OtpValidate}
        mobile={mobile}
        generateOtp={generateOtp}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            margin: 10,
            padding: 10,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
            borderRadius: 10,
            width: '85%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 60, width: 100, marginTop: 10, marginBottom: 20}}
            source={require('../../assets/icon.jpeg')}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
            <Text style={{fontSize: 20, fontWeight: '600', color: '#452C8A'}}>
              Register / Login
            </Text>
          </View>
          <View style={{width: '90%'}}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  placeholder={'Phone Number'}
                  onChangeText={value => onChange(value)}
                  value={value}
                  keyboardType={'number-pad'}
                  maxLength={10}
                />
              )}
              name="contact_no1"
              rules={{required: true}}
            />
            <TouchableOpacity
              onPress={handleSubmit(Submit)}
              style={{
                marginVertical: 30,
                padding: 10,
                backgroundColor: '#22C2F4',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginView;
const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    backgroundColor: 'white',
    borderColor: '#D7D7D7',
    height: 50,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
  },
});
interface LoginView {
  generateOtp?: any;
  otp_flag?: boolean;
  otp_reset?: any;
  OtpValidate?: any;
  mobile?: any;
}
