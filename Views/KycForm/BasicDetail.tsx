import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const BasicDetail = ({control, SetStep, getValues, setValue}: BasicProps) => {
  const [dateC, SetDateC] = useState<boolean>(false);
  const [dob, SetDob] = useState<any>(new Date());
  const CheckState = () => {
    if (
      !!getValues('firstName') &&
      !!getValues('lastName') &&
      !!getValues('dob') &&
      !!getValues('gender') &&
      !!getValues('contactNo') &&
      !!getValues('email')
    ) {
      if (getValues('contactNo').length != 10) {
        ToastAndroid.show('Invalid Phone Number', 2000);
      } else if (
        !String(getValues('email'))
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
      ) {
        ToastAndroid.show('Invalid Email', 2000);
      } else {
        SetStep(2);
      }
    } else {
      ToastAndroid.show('Invalid Data', 2000);
    }
  };
  const changeSelectedDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    SetDob(new Date(currentDate));
    SetDateC(false);
    setValue('dob', new Date(currentDate));
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
        <Text style={{color: '#fff', fontSize: 20}}>Primary Details</Text>
      </View>
      <View style={{padding: 15}}>
        <Text style={styles.label}>
          First Name <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'First Name'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="firstName"
          rules={{required: true}}
        />
        <Text style={styles.label}>Middle Name</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'Middle Name'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="middleName"
          // rules={{required: true}}
        />
        <Text style={styles.label}>
          Last Name <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'Last Name'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="lastName"
          rules={{required: true}}
        />
        <Text style={styles.label}>
          Date Of Birth <Text style={{color: 'red'}}>*</Text>
        </Text>
        {!!dateC && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dob}
            mode={'date'}
            is24Hour={true}
            display="calendar"
            onChange={changeSelectedDate}
          />
        )}
        <TouchableOpacity style={styles.input} onPress={() => SetDateC(true)}>
          {!!dob && (
            <Text style={{fontSize: 14}}>
              {new Date(dob).getDate().toString()}/
              {(new Date(dob).getMonth() + 1).toString()}/
              {new Date(dob).getFullYear().toString()}
            </Text>
          )}
        </TouchableOpacity>
        <Text style={styles.label}>
          Gender <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <View
              style={{
                borderColor: '#D7D7D7',
                height: 50,
                borderRadius: 4,
                borderWidth: 1,
              }}>
              <Picker
                selectedValue={value}
                mode="dropdown"
                placeholder="Select Gender"
                itemStyle={{fontSize: 16, padding: 0, margin: 0}}
                onValueChange={(itemValue, itemIndex) => onChange(itemValue)}>
                <Picker.Item
                  label="Select Gender"
                  color="rgb(141, 160, 166)"
                  value="null"
                />
                <Picker.Item label="Male" value="MALE" />
                <Picker.Item label="Female" value="FEMALE" />
                <Picker.Item label="Other" value="OTHER" />
              </Picker>
            </View>
          )}
          name="gender"
          rules={{required: true}}
        />
        <Text style={styles.label}>
          Contact Number <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'Contact Number'}
              onChangeText={value => onChange(value)}
              value={value}
              keyboardType={'number-pad'}
              maxLength={10}
            />
          )}
          name="contactNo"
          rules={{required: true}}
        />
        <Text style={styles.label}>
          Email Address <Text style={{color: 'red'}}>*</Text>
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder={'Email Address'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="email"
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
              onPress={() => SetStep(0)}>
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

export default BasicDetail;
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

interface BasicProps {
  control?: any;
  SetStep?: any;
  getValues?: any;
  setValue?: any;
}
