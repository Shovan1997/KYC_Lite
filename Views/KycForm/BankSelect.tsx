import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import {BranchList, InstituteList} from '../../models/userModels';

const BankSelect = ({
  control,
  SetStep,
  institute,
  GetBranch,
  branch,
  getValues,
}: BankProps) => {
  const CheckState = () => {
    if (!!getValues('instituteParentId') && !!getValues('branchId')) {
      SetStep(1);
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
        <Text style={{color: '#fff', fontSize: 20}}>Institute Details</Text>
      </View>
      <View style={{padding: 15}}>
        <Text style={styles.label}>
          Select Institute <Text style={{color: 'red'}}>*</Text>
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
                placeholder="Select Institute"
                itemStyle={{fontSize: 16, padding: 0, margin: 0}}
                onValueChange={(itemValue, itemIndex) => (
                  onChange(itemValue), GetBranch(itemValue)
                )}>
                <Picker.Item
                  label="Select Institute"
                  color="rgb(141, 160, 166)"
                  value="null"
                />
                {institute?.map(m => (
                  <Picker.Item
                    label={m.institute_name}
                    value={m.institute_id}
                    key={m.institute_id}
                  />
                ))}
              </Picker>
            </View>
          )}
          name="instituteParentId"
          rules={{required: true}}
        />
        <Text style={styles.label}>
          Select Branch <Text style={{color: 'red'}}>*</Text>
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
                placeholder="Select Branch"
                itemStyle={{fontSize: 16, padding: 0, margin: 0}}
                onValueChange={(itemValue, itemIndex) => onChange(itemValue)}>
                <Picker.Item
                  label="Select Branch"
                  color="rgb(141, 160, 166)"
                  value="null"
                />
                {branch?.map(m => (
                  <Picker.Item
                    label={m.branch_name}
                    value={m.branch_id}
                    key={m.branch_id}
                  />
                ))}
              </Picker>
            </View>
          )}
          name="branchId"
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
              onPress={() => {}}>
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

interface BankProps {
  control?: any;
  SetStep?: any;
  institute?: InstituteList[];
  GetBranch?: any;
  branch?: BranchList[];
  getValues?: any;
}

export default BankSelect;
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
