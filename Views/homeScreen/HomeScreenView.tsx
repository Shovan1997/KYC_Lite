import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {User} from '../../models/userModels';

const HomeScreenView = ({KycForm, VideoCall, user, Status,WhiteList}: SCVProps) => {
  return (
    <ScrollView style={{backgroundColor: '#ffff'}}>
      <View
        style={{
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{height: 250, width: 250}}>
          <Image
            style={{height: '60%', width: '100%'}}
            source={require('../../assets/icon.jpeg')}
          />
        </View>
        {/* <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#18A3D7', fontSize: 40, fontWeight: '700'}}>
            Upload
          </Text>
          <Text style={{color: '#12324A', fontSize: 40, fontWeight: '700'}}>
            {' '}
            KYC
          </Text>
        </View> */}
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            minHeight: 250,
            width: '100%',
            padding: 50,
          }}>
          <TouchableOpacity
            onPress={() => KycForm()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#22C2F4',
              borderRadius: 50,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
              borderWidth: 1.5,
              borderColor: '#fff',
            }}>
            <Text
              style={{
                padding: 15,
                fontSize: 20,
                fontWeight: '600',
                color: '#fff',
              }}>
              Self eKYC
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => VideoCall()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#22C2F4',
              borderRadius: 50,
              marginTop: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              borderWidth: 1.5,
              borderColor: '#fff',
              elevation: 10,
            }}>
            <Text
              style={{
                padding: 15,
                fontSize: 20,
                fontWeight: '600',
                color: '#fff',
              }}>
              Video eKYC
            </Text>
          </TouchableOpacity>
          {!!user?.application_id && (
            <TouchableOpacity
              onPress={() => Status()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#22C2F4',
                borderRadius: 50,
                marginTop: 20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                borderWidth: 1.5,
                borderColor: '#fff',
                elevation: 10,
              }}>
              <Text
                style={{
                  padding: 15,
                  fontSize: 20,
                  fontWeight: '600',
                  color: '#fff',
                }}>
                eKYC Status
              </Text>
            </TouchableOpacity>
          )}
            <TouchableOpacity
            onPress={() => WhiteList()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#22C2F4',
              borderRadius: 50,
              shadowColor: '#000',
              marginTop: 20,
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
              borderWidth: 1.5,
              borderColor: '#fff',
            }}>
            <Text
              style={{
                padding: 15,
                fontSize: 20,
                fontWeight: '600',
                color: '#fff',
              }}>
              Whitelist Request
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreenView;

interface SCVProps {
  KycForm?: any;
  VideoCall?: any;
  user?: User;
  Status?: any;
  WhiteList?: any;
}
