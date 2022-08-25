import {useFocusEffect, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import RNOtpVerify from 'react-native-otp-verify';
const ValidateOTP = ({
  otp_flag,
  otp_reset,
  OtpValidate,
  mobile,
  generateOtp,
}: ValidateOtp) => {
  const [otp, setOtp] = useState<string>();
  const [otpAuto, setAutoOtp] = useState<string>();
  // const theme: ThemeItem = Object(useTheme());
  let id: any;
  const [timer, setTimer] = useState<number>(0);
  useFocusEffect(
    React.useCallback(() => {
      if (otp_flag) {
        SendOtp();
        startTimer();
        // StartTimer()
      } else {
        console.log('Clear Interval');
        RNOtpVerify.removeListener();
        if (!!id) {
          clearInterval(id);
        }
        // clearInterval(Timer)
      }
    }, [otp_flag]),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (timer > 0) {
        deductTimer();
      }
    }, [timer]),
  );

  const deductTimer = async () => {
    if (timer <= 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTimer(0);
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTimer(timer - 1);
    }
  };

  const startTimer = async () => {
    setTimer(10);
    // id = setInterval(() => {
    //   console.log('Inside Interval');
    //   if (timer - 1 <= 0) {
    //     setTimer(0);
    //     clearInterval(id);
    //   } else {
    //     setTimer(timer - 1);
    //   }
    // }, 1000);
  };

  const SendOtp = () => {
    if (otp_flag) {
      RNOtpVerify.getOtp()
        .then(p => RNOtpVerify.addListener(otpHandler))
        .catch(p => console.log(p));
    }
  };
  const OtpSend = () => {
    OtpValidate({
      otp: otp,
    });
  };

  const otpHandler = (message: string) => {
    var otp = /(\d{6})/g.exec(message);
    if (!!otp && !!otp[0]) {
      setAutoOtp(otp[0]);
      OtpValidate({
        otp: otp[0],
      });
      setAutoOtp(undefined);
      RNOtpVerify.removeListener();
      // clearInterval(Timer)
    }
  };

  const changeInput = (data: string) => {
    setOtp(data);
  };
  const styles = StyleSheet.create({
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    underlineStyleBase: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderBottomWidth: 1,
      color: '#18191B',
      fontSize: 18,
      fontWeight: 'bold',
      borderColor: '#C5C5C5',
    },

    underlineStyleHighLighted: {
      borderColor: '#4261E6',
      color: '#4261E6',
    },
    buttonContainer: {
      width: '100%',
    },
    rounded: {
      borderRadius: 15,
    },
    buttonColor: {
      backgroundColor: '#22C2F4',
    },
    disabledButtonColor: {
      backgroundColor: '#C5C5C5',
    },
    button: {
      height: 42,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
  });
  return (
    <Modal
      isVisible={otp_flag}
      backdropOpacity={0.3}
      animationInTiming={1000}
      animationOutTiming={1000}
      collapsable={true}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1000}
      style={styles.bottomModal}
      onBackdropPress={() => otp_reset()}>
      <View
        style={{
          height: 400,
          backgroundColor: '#D7D7D7',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}>
        <View
          style={[
            {
              height: 8,
              width: 100,
              borderRadius: 15,
              // backgroundColor: theme.colors.cardalt,
              alignSelf: 'center',
              marginTop: 10,
            },
          ]}></View>
        <View style={{alignSelf: 'flex-end', marginRight: 20}}>
          <Ionicons
            onPress={() => otp_reset()}
            color="#4261E6"
            name={'close-outline'}
            size={30}
          />
        </View>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Text
            style={[
              {
                color: '#4261E6',
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: -30,
              },
            ]}>
            OTP Verification
          </Text>
        </View>
        <View style={{margin: 10}}>
          <OTPInputView
            style={{height: 100}}
            pinCount={6}
            onCodeChanged={code => {
              changeInput(code);
            }}
            code={otpAuto}
            autoFocusOnLoad={false}
            keyboardType={'number-pad'}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
          />
        </View>
        <View
          style={{
            marginHorizontal: 20,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={[
              {
                fontSize: 16,
              },
            ]}>
            Verification code has been sent to {mobile}.
          </Text>
        </View>
        <View
          style={{
            margin: 5,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginHorizontal: 20,
          }}>
          <Text
            style={[
              {
                fontSize: 16,
              },
            ]}>
            Not received OTP yet?
          </Text>
          <TouchableOpacity
            style={{paddingLeft: 10, flexDirection: 'row'}}
            onPress={() => {
              if (timer <= 0) {
                setTimer(10);
                startTimer();
                RNOtpVerify.getHash()
                  .then(key => {
                    generateOtp({
                      key: key[0],
                      contact_no: mobile,
                    });
                  })
                  .catch(console.log);
              }
            }}>
            <Text
              style={[
                {
                  color: timer > 0 ? '#777777' : '#4261E6',
                  fontWeight: 'bold',
                  fontSize: 16,
                  textAlign: 'center',
                },
              ]}>
              Resend {timer > 0 ? 'in ' : ''}
            </Text>
            {timer > 0 && (
              <Text
                style={[
                  {
                    // color: theme.colors.darkTint,
                    fontSize: 16,
                    textAlign: 'center',
                  },
                ]}>
                {timer == 10 ? '00:' + timer : '00:0' + timer}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 10, marginVertical: 20}}>
          <View
            style={[
              styles.buttonContainer,
              !(!otp || otp?.toString().length != 6) && styles.rounded,
            ]}>
            <TouchableOpacity onPress={() => OtpSend()} style={styles.rounded}>
              <View
                style={[
                  styles.button,
                  styles.rounded,
                  !(!otp || otp?.length != 6)
                    ? styles.buttonColor
                    : styles.disabledButtonColor,
                ]}>
                <Text
                  style={[
                    !(!otp || otp?.length != 6)
                      ? styles.buttonText
                      : {color: '#777777', fontSize: 18},
                  ]}>
                  Continue
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface ValidateOtp {
  otp_flag?: boolean;
  otp_reset?: any;
  OtpValidate?: any;
  mobile?: any;
  generateOtp?: any;
}

export default ValidateOTP;
