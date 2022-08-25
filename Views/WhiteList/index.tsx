import { View, Text } from 'react-native'
import React from 'react'
import { StoreState } from '../../models/reduxModels';
import { connect } from 'react-redux';
import { EkycWhitelist, User } from '../../models/userModels';
import WhiteListView from './WhiteListView';
import { UpdateWhite } from '../../redux/actions/userAction';

const WhiteList = ({user,UpdateWhite}: WhiteListProps) => { 
    const Update=(data: any)=>{
        UpdateWhite(data)
    }
  return (
    <WhiteListView Update={Update} ekyc_whitelist={user?.ekyc_whitelist}></WhiteListView>
  )
}

const mapStateToProps = (state: StoreState) => {
    return {
      user: state.user.userdetail,
    };
  };
  const mapDispatchToProps = {
    UpdateWhite
  };
  export default connect(mapStateToProps, mapDispatchToProps)(WhiteList);
  interface WhiteListProps {
    router?: any;
    navigation?: any;
    user?: User;
    UpdateWhite?: any;

  }
  