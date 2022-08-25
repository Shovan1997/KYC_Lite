import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Controller} from 'react-hook-form';
import CheckBox from '@react-native-community/checkbox';

const Address = ({
  control,
  SetStep,
  getValues,
  setValue,
  resetField,
  Same,
  SetSame,
}: AddresProps) => {
  useEffect(() => {
    if (Same) {
      setValue('c_addressLine1', getValues('p_addressLine1'));
      setValue('c_addressLine2', getValues('p_addressLine2'));
      setValue('c_city', getValues('p_city'));
      setValue('c_state', getValues('p_state'));
      setValue('c_country', getValues('p_country'));
      setValue('c_pin', getValues('p_pin'));
    } else {
      resetField('c_addressLine1');
      resetField('c_addressLine2');
      resetField('c_city');
      resetField('c_state');
      resetField('c_country');
      resetField('c_pin');
    }
  }, [Same]);
  const CheckState = () => {
    if (
      !!getValues('p_addressLine1') &&
      !!getValues('p_city') &&
      !!getValues('p_state') &&
      !!getValues('p_country') &&
      !!getValues('p_pin') &&
      !!getValues('c_addressLine1') &&
      !!getValues('c_city') &&
      !!getValues('c_state') &&
      !!getValues('c_country') &&
      !!getValues('c_pin')
    ) {
      SetStep(3);
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
        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
          Address Details
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#99DCF9',
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#fff', fontSize: 18}}>Permanent Address</Text>
      </View>
      <View style={{padding: 15}}>
        <Text style={styles.label}>
          Address Line 1 <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'Address Line 1'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="p_addressLine1"
          rules={{required: true}}
        />
        <Text style={styles.label}>Address Line 2</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'Address Line 2'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="p_addressLine2"
          rules={{required: true}}
        />
        <Text style={styles.label}>
          City <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'City'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="p_city"
          rules={{required: true}}
        />
        <Text style={styles.label}>
          State <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'State'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="p_state"
          rules={{required: true}}
        />
        <Text style={styles.label}>
          Country <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'Country'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="p_country"
          rules={{required: true}}
        />
        <Text style={styles.label}>
          Pin <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'Pin'}
              onChangeText={value => onChange(value)}
              value={value}
              maxLength={6}
              keyboardType={'number-pad'}
            />
          )}
          name="p_pin"
          rules={{required: true}}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          backgroundColor: '#99DCF9',
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#fff', fontSize: 18}}>Current Address</Text>
      </View>
      <View style={{padding: 15}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <CheckBox
            disabled={false}
            value={Same}
            // tintColor={theme.colors.darkTint}
            // onCheckColor={theme.colors.primaryConstrast}
            // onFillColor={theme.colors.primary}
            // onTintColor={theme.colors.primary}
            // tintColors={{
            //   true: theme.colors.primary,
            //   false: theme.colors.darkTint,
            // }}
            onValueChange={newValue => SetSame(newValue)}></CheckBox>
          <Text style={{fontSize: 16}}>Same As Permanent Address</Text>
        </View>
        <Text style={styles.label}>
          Address Line 1 <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'Address Line 1'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="c_addressLine1"
          rules={{required: true}}
        />
        <Text style={styles.label}>Address Line 2</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'Address Line 2'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="c_addressLine2"
          // rules={{required: true}}
        />
        <Text style={styles.label}>
          City <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'City'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="c_city"
          rules={{required: true}}
        />
        <Text style={styles.label}>
          State <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'State'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="c_state"
          rules={{required: true}}
        />
        <Text style={styles.label}>
          Country <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'Country'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="c_country"
          rules={{required: true}}
        />
        <Text style={styles.label}>
          Pin <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'Pin'}
              onChangeText={value => onChange(value)}
              value={value}
              maxLength={6}
              keyboardType={'number-pad'}
            />
          )}
          name="c_pin"
          rules={{required: true}}
        />
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
              onPress={() => SetStep(1)}>
              <Text style={{color: '#fff', fontSize: 18}}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 50, paddingHorizontal: 5}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => CheckState()}>
              <Text style={{color: '#fff', fontSize: 18}}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Address;
interface AddresProps {
  control?: any;
  SetStep?: any;
  getValues?: any;
  setValue?: any;
  resetField?: any;
  Same?: boolean;
  SetSame?: any;
}
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
    height: 48,
    padding: 15,
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 16,
  },
});
