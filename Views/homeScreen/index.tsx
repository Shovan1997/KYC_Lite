import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeScreenView from './HomeScreenView';
import {connect} from 'react-redux';
import {StoreState} from '../../models/reduxModels';
import {AllClearAction} from '../../redux/actions/userAction';
import {User} from '../../models/userModels';
import Alart from '../KycForm/Alart';
import Alarts from '../KycForm/Alarts';

const HomeScreen = ({
  navigation,
  router,
  user,
  AllClearAction,
}: HomeScreenProps) => {
  const [alertVisible2, setAlertVisible2] = useState<boolean>(false);
  const [id, SetId] = useState<string>('');
  const [id2, SetId2] = useState<string>('');
  const VideoCall = () => {
    navigation.navigate('branch-choose');
  };
  useEffect(() => {
    if (!!user?.application_id) {
      SetId('Application ID: ' + user?.application_id);
    }
    if (!!user?.application_status) {
      SetId2('Application Status: ' + user?.application_status);
    }
  }, [user]);
  return (
    <>
      <HomeScreenView
        KycForm={() => (navigation.navigate('KycForm'), AllClearAction())}
        VideoCall={VideoCall}
        user={user}
        Status={() => setAlertVisible2(true)}
        WhiteList={()=>  (navigation.navigate('whitelist-request'))}
      />
      <Alarts
        isVisible={alertVisible2}
        setIsVisible={setAlertVisible2}
        okText="Ok"
        title={id}
        subTitle={id2}
        okPress={() => {
          setAlertVisible2(false);
        }}></Alarts>
    </>
  );
};
const mapStateToProps = (state: StoreState) => {
  return {
    user: state.user.userdetail,
  };
};
const mapDispatchToProps = {
  AllClearAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
interface HomeScreenProps {
  router?: any;
  navigation?: any;
  user?: User;
  AllClearAction?: any;
}
