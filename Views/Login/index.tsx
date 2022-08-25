import {View, Text, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import LoginView from './LoginView';
import {
  OtpFlagReset,
  OtpGenerate,
  OtpVerification,
} from '../../redux/actions/userAction';
import {ValidateOtps} from '../../models/userModels';
import {connect} from 'react-redux';
import {StoreState} from '../../models/reduxModels';

const Login = ({
  OtpFlagReset,
  OtpGenerate,
  otp_flag,
  OtpVerification,
  navigation,
  route,
}: LoginProps) => {
  const [mobile, setmobile] = useState('');
  const generateOtp = (data: any) => {
    setmobile(data.contact_no);
    OtpGenerate(data);
  };
  const ResetOtp = () => {
    OtpFlagReset();
  };
  const OtpValidate = async (data: ValidateOtps) => {
    var payload: ValidateOtps = {
      otp: data.otp,
      username: mobile,
    };
    OtpVerification(payload);
  };
  return (
    <LoginView
      generateOtp={generateOtp}
      otp_flag={otp_flag}
      otp_reset={ResetOtp}
      OtpValidate={OtpValidate}
      mobile={mobile}
    />
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    otp_flag: state.user.Otp_generated,
  };
};
const mapDispatchToProps = {
  OtpGenerate,
  OtpFlagReset,
  OtpVerification,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

interface LoginProps {
  otp_flag?: boolean;
  OtpGenerate: any;
  OtpFlagReset: any;
  navigation?: any;
  route?: any;
  OtpVerification?: any;
}
