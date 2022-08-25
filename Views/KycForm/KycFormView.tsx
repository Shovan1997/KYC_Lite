import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TakePictureResponse} from 'react-native-camera';
import BasicDetail from './BasicDetail';
import Address from './Address';
import BankSelect from './BankSelect';
import FileUpload from './FileUpload';
import OtherDetail from './OtherDetail';
import {BranchList, InstituteList} from '../../models/userModels';
import {Camera} from '../../models/reduxModels';

const KycFormView = ({
  GotoCamera,
  camera,
  OpenCamera,
  OpenFile,
  institute,
  GetBranch,
  branch,
  ClearPictureData,
  selfie,
  ClearVideoData,
  Submitdata,
  zipname
}: KycViewProps) => {
  const [Step, SetStep] = useState<number>(0);
  const [Same, SetSame] = useState<boolean>(false);
  const scrollRef = useRef<any>();
  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, [Step]);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    resetField,

    formState: {errors},
  } = useForm<formadata>();
  const onSubmit = (data: any) => Submitdata(data);

  return (
    <ScrollView ref={scrollRef}>
      {Step == 0 ? (
        <BankSelect
          control={control}
          SetStep={SetStep}
          institute={institute}
          GetBranch={GetBranch}
          branch={branch}
          getValues={getValues}
        />
      ) : Step == 1 ? (
        <BasicDetail
          control={control}
          SetStep={SetStep}
          getValues={getValues}
          setValue={setValue}
        />
      ) : Step == 2 ? (
        <Address
          control={control}
          SetStep={SetStep}
          getValues={getValues}
          setValue={setValue}
          resetField={resetField}
          SetSame={SetSame}
          Same={Same}
        />
      ) : Step == 3 ? (
        <FileUpload
          control={control}
          SetStep={SetStep}
          OpenCamera={OpenCamera}
          OpenFile={OpenFile}
          getValues={getValues}
          camera={camera}
          ClearPictureData={ClearPictureData}
          zipname={zipname}
        />
      ) : (
        <OtherDetail
          control={control}
          SetStep={SetStep}
          getValues={getValues}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          GotoCamera={GotoCamera}
          selfie={selfie}
          ClearVideoData={ClearVideoData}
        />
      )}
    </ScrollView>
  );
};

export default KycFormView;
interface KycViewProps {
  GotoCamera?: any;
  camera?: Camera;
  OpenFile?: any;
  OpenCamera?: any;
  institute?: InstituteList[];
  GetBranch?: any;
  branch?: BranchList[];
  ClearPictureData?: any;
  selfie?: TakePictureResponse | null;
  ClearVideoData?: any;
  Submitdata?: any;
  zipname?: string
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
    backgroundColor: '#4261E6',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
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

export interface formadata {
  contactNo: string; //
  email: string; //
  firstName: string; //
  lastName: string; //
  middleName?: any; //
  dob?: any; //
  gender?: string; //
  c_addressLine1: string; //
  c_addressLine2?: any; //
  c_city: string; //
  c_country: string; //
  c_pin: string; //
  c_state: string; //
  p_addressLine1: string; //
  p_addressLine2?: any; //
  p_city: string; //
  p_country: string; //
  p_pin: string; //
  p_state: string; //
  documentIdentificationNo1: string; //
  documentIdentificationNo2: string; //
  documentIdentificationNo3?: string; //
  documentIdentificationNo4?: string; //
  documentIdentificationNo5?: string; //
  branchId: number; //
  instituteParentId: number; //
  shareCode?: string
}
