import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TakePictureResponse} from 'react-native-camera';

const OtherDetail = ({
  SetStep,
  control,
  getValues,
  handleSubmit,
  onSubmit,
  GotoCamera,
  selfie,
  ClearVideoData,
}: OthersProps) => {
  const CheckState = (event: any) => {
    if (!!selfie) {
      handleSubmit(onSubmit)(event);
    } else {
      ToastAndroid.show('Invalid Data', 2000);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#22C2F4',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: 5,
        }}>
        <Text style={{color: '#fff', fontSize: 20}}>Selfie</Text>
      </View>
      <View style={{padding: 15}}>
        {!!selfie?.uri && (
          <View
            style={{
              margin: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Image
              source={{uri: selfie?.uri}}
              style={{
                height: 150,
                width: 200,
                borderRadius: 10,
              }}></Image>
            <TouchableOpacity onPress={() => ClearVideoData()}>
              <Ionicons
                color={'red'}
                name={'close-circle'}
                size={35}
                style={{
                  marginLeft: -60,
                  marginTop: -25,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        {!selfie?.uri && (
          <View
            style={{
              margin: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View>
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderColor: '#D7D7D7',
                  borderWidth: 0.5,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  onPress={() => GotoCamera()}
                  color={'#C1C1C1'}
                  name={'camera-outline'}
                  size={30}
                />
              </View>
            </View>
          </View>
        )}
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 50, paddingHorizontal: 5}}>
            <TouchableOpacity
              style={{
                marginTop: 40,
                height: 40,
                backgroundColor: '#A4A4A4',
                borderRadius: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => SetStep(3)}>
              <Text style={{color: '#fff', fontSize: 18}}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 50, paddingHorizontal: 5}}>
            <TouchableOpacity
              style={styles.button}
              onPress={event => CheckState(event)}>
              <Text style={{color: '#fff', fontSize: 18}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OtherDetail;
const styles = StyleSheet.create({
  label: {
    color: '#575759',
    margin: 15,
    marginLeft: 0,
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#22C2F4',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffff',
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#D7D7D7',
    height: 50,
    padding: 15,
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 16,
  },
});

interface OthersProps {
  control?: any;
  SetStep?: any;
  getValues?: any;
  handleSubmit?: any;
  onSubmit?: any;
  GotoCamera?: any;
  selfie?: TakePictureResponse | null;
  ClearVideoData?: any;
}
