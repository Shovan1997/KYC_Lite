import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { EkycWhitelist } from '../../models/userModels';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WhiteListView = ({ekyc_whitelist,Update}: WhiteListProps) => {
  return (
    <ScrollView>
        <View style={{flexDirection: 'column', justifyContent: 'center', padding: 10}}>
{   !!ekyc_whitelist && ekyc_whitelist.map((m, index)=>(
        <View key={index} style={{backgroundColor: '#fff', elevation: 6, padding: 10, borderRadius: 5}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 40}}>
                    <Text style={{fontSize: 18, fontWeight: '400'}}> ekyc Number</Text>
                </View>
                <View style={{flex: 10}}>
                    <Text style={{fontSize: 18, fontWeight: '600'}}> : </Text> 
                    </View>
                <View style={{flex: 40}}>
                    <Text style={{fontSize: 20, fontWeight: '500'}}>{m.ekyc_number}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 40}}>
                    <Text style={{fontSize: 18, fontWeight: '400'}}> Institute Name</Text>
                </View>
                <View style={{flex: 10}}>
                    <Text style={{fontSize: 18, fontWeight: '600'}}> : </Text> 
                    </View>
                <View style={{flex: 40}}>
                    <Text style={{fontSize: 20, fontWeight: '500'}}>{m.institute_name}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{flex: 40}}>
                    <Text style={{fontSize: 18, fontWeight: '400'}}> Status</Text>
                </View>
                <View style={{flex: 10}}>
                    <Text style={{fontSize: 18, fontWeight: '600'}}> : </Text> 
                    </View>
                <View style={{flex: 40}}>
                    <Text style={{fontSize: 20, fontWeight: '500'}}>{m.whitelisting_status }</Text>
                </View>
            </View>
            {
                !m.whitelisting_status || (!!m.whitelisting_status && !( m.whitelisting_status == 'ACCEPTED' || m.whitelisting_status == 'REJECTED')) &&
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginTop: 20}}>
                <View style={{flex: 40, justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 20}}>
                <TouchableOpacity onPress={() =>Update({
                    ekyc_number : m.ekyc_number,
                    institution_id : m.institution_id,
                    whitelisting_status : "REJECTED"
                })}>
              <Ionicons
                color={'red'}
                name={'close-circle'}
                size={40}
              />
            </TouchableOpacity>
                </View>
                <View style={{flex: 40}}>
                <TouchableOpacity onPress={() =>Update({
                    ekyc_number : m.ekyc_number,
                    institution_id : m.institution_id,
                    whitelisting_status : "ACCEPTED"
                })}
                >
              <Ionicons
                color={'green'}
                name={'checkmark-circle-outline'}
                size={40}
              />
            </TouchableOpacity>
                </View>
            </View>
            }
      
        </View>
))       
}
        </View>
    </ScrollView>
  )
}

export default WhiteListView;
interface WhiteListProps{
    ekyc_whitelist?: EkycWhitelist[];
    Update?: any;
}