import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {Controller, useForm} from 'react-hook-form';
import {useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';
import {GetBranchs, GetInstitutes} from '../../redux/actions/userAction';
import {StoreState} from '../../models/reduxModels';
import {BranchList, InstituteList, User} from '../../models/userModels';

const BankChoose = ({
  user,
  GetBranchs,
  GetInstitutes,
  branch,
  institute,
  navigation,
  router,
}: BankChooseProps) => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    resetField,

    formState: {errors},
  } = useForm<formadata>();
  useFocusEffect(
    React.useCallback(() => {
      GetInstitutes();
    }, []),
  );
  const onSubmit = (data: formadata) => {
    let branchId = data.branchId;
    let bankId = data.instituteParentId;
    let storeId = '';
    navigation.navigate('videocall', {
      call: {partner_id: branchId, first_name: data.first_name, last_name: data.last_name},

    });
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
      <View style={{padding: 15, backgroundColor: '#ffff'}}>
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
          name="first_name"
          rules={{required: true}}
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
          name="last_name"
          rules={{required: true}}
        />
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
                  onChange(itemValue), GetBranchs(itemValue)
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
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 50, paddingHorizontal: 5}}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}>
              <Text style={{color: '#fff', fontSize: 18}}>
                Request Video Call
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    user: state.video_camera,
    institute: state.user.institutelist,
    branch: state.user.branch_list,
  };
};
const mapDispatchToProps = {
  GetInstitutes,
  GetBranchs,
};
interface BankChooseProps {
  GetInstitutes?: any;
  institute?: InstituteList[];
  GetBranchs?: any;
  branch?: BranchList[];
  user?: User;
  router?: any;
  navigation?: any;
}
export default connect(mapStateToProps, mapDispatchToProps)(BankChoose);
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
    backgroundColor: '#ffff',
    margin: 20,
    borderRadius: 10,
    marginBottom: 20,
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

export interface formadata {
  branchId: number; //
  instituteParentId: number; //
  first_name: string;
  last_name: string;
}
