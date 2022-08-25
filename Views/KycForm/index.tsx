import {View, Text, PermissionsAndroid, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import KycFormView, {formadata} from './KycFormView';
import {connect} from 'react-redux';
import {Camera, StoreState} from '../../models/reduxModels';
import {useFocusEffect} from '@react-navigation/native';
import {TakePictureResponse} from 'react-native-camera';
import DocumentPicker, {types} from 'react-native-document-picker';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  ApplicationData,
  ApplicationResponse,
  BranchList,
  InstituteList,
} from '../../models/userModels';
import {
  AllClearAction,
  ApplicationSubmit,
  GetBranchs,
  GetInstitutes,
} from '../../redux/actions/userAction';
import {
  ClearPictureData,
  TakePictureSuccess,
  ZipUpload,
} from '../../redux/actions/cameraActions';
import {ClearVideoData} from '../../redux/actions/videoCameraActions';
import Alart from './Alart';
var RNFS = require('react-native-fs');
const KycForm = ({
  navigation,
  user,
  camera,
  GetInstitutes,
  institute,
  GetBranchs,
  branch,
  ClearPictureData,
  router,
  selfie,
  ClearVideoData,
  TakePictureSuccess,
  ApplicationSubmit,
  response,
  AllClearAction,
  ZipUpload,
  zip,
  zipname,
}: KycFrmProps) => {
  const [submitData, SetSubmitData] = useState<ApplicationData | undefined>();
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [intData, SetintData] = useState<formadata>();
  const [alertVisible1, setAlertVisible1] = useState<boolean>(false);
  const [text, SetText] = useState<string>('');
  const cameraPermission = async () => {
    if (Platform.OS == 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'KYC',
            message: 'KYC needs to access your camera',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
          cameraPermission();
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  useEffect(() => {
    if (!!response) {
      SetText('Your application number is :' + response.applicationId);
      setAlertVisible(true);
    }
  }, [response]);

  useFocusEffect(
    React.useCallback(() => {
      GetInstitutes();
      cameraPermission();
    }, []),
  );
  const GotoCamera = () => {
    navigation.navigate('camera-blink');
  };
  const OpenCamera = (data: number) => {
    navigation.navigate('camera', {key: data});
  };
  const OpenFile = async (data: number) => {
    if (data == 7) {
      try {
        const response = await DocumentPicker.pick({
          presentationStyle: 'fullScreen',
          type: [DocumentPicker.types.zip],
          copyTo: 'documentDirectory',
        });
        RNFS.readFile(response[0].fileCopyUri, 'base64').then((data: any) => {
          ZipUpload({
            zip: data,
            zipname: response[0].name,
          });
        });
      } catch (err) {
        console.warn(err);
      }
    } else {
      const options: ImageLibraryOptions = {
        includeBase64: true,
        quality: 0.3,
        mediaType: 'photo',
      };
      launchImageLibrary(options, response => {
        if (!response.errorCode && !!response.uri) {
          let payload: any = {
            uri: response.uri,
            base64: response.base64,
          };
          TakePictureSuccess({
            key: data,
            data: payload,
          });
        } else {
          console.error(response.errorCode);
        }
      });
    }
  };
  const Submitdata = (data: formadata) => {
    let payload: ApplicationData = {
      applicationMode: 'ONLINE',
      associatedAccounts: [],
      contactNo: data.contactNo,
      email: data.email,
      firstName: data.firstName,
      instituteBranch: {
        branchId: data.branchId,
        instituteParentId: data.instituteParentId,
      },
      lastName: data.lastName,
      photo: 'image/png;base64,' + selfie?.base64,
      applicationDate: null,
      dob: new Date(data.dob).toISOString(),
      gender: data.gender,
      middleName: !!data.middleName ? data.middleName : null,
      permanentAddress: {
        addressLine1: data.p_addressLine1,
        city: data.p_city,
        country: data.p_country,
        pin: data.p_pin,
        state: data.p_state,
        addressLine2: !!data.p_addressLine2 ? data.p_addressLine2 : null,
      },
      presentAddress: {
        addressLine1: data.c_addressLine1,
        city: data.c_city,
        country: data.c_country,
        pin: data.c_pin,
        state: data.c_state,
        addressLine2: !!data.c_addressLine2 ? data.c_addressLine2 : null,
      },
      kycDocuments: [],
      shareCode: !!data.shareCode ? data.shareCode : null,
      uidaiFileName: !!zipname ? zipname : null,
      uidaiZipFile: !!zip ? zip : null,
    };
    if (!!camera?.camera1) {
      payload.kycDocuments.push({
        documentIdentificationNo: data.documentIdentificationNo1,
        documentType: 'AADHAAR_FRONT',
        document: 'image/png;base64,' + camera.camera1.base64,
      });
    }
    if (!!camera?.camera6) {
      payload.kycDocuments.push({
        documentIdentificationNo: data.documentIdentificationNo1,
        documentType: 'AADHAAR_BACK',
        document: 'image/png;base64,' + camera.camera6.base64,
      });
    }
    if (!!camera?.camera2) {
      payload.kycDocuments.push({
        documentIdentificationNo: data.documentIdentificationNo2,
        documentType: 'PAN',
        document: 'image/png;base64,' + camera.camera2.base64,
      });
    }
    if (!!camera?.camera3 && !!data.documentIdentificationNo3) {
      payload.kycDocuments.push({
        documentIdentificationNo: data.documentIdentificationNo3,
        documentType: 'PASSPORT',
        document: 'image/png;base64,' + camera.camera3.base64,
      });
    }
    if (!!camera?.camera4 && !!data.documentIdentificationNo4) {
      payload.kycDocuments.push({
        documentIdentificationNo: data.documentIdentificationNo4,
        documentType: 'VOTER',
        document: 'image/png;base64,' + camera.camera4.base64,
      });
    }
    if (!!camera?.camera5 && !!data.documentIdentificationNo5) {
      payload.kycDocuments.push({
        documentIdentificationNo: data.documentIdentificationNo5,
        documentType: 'DRIVING_LICENSE',
        document: 'image/png;base64,' + camera.camera5.base64,
      });
    }

    ApplicationSubmit(payload);
  };
  return (
    <>
      <KycFormView
        GotoCamera={GotoCamera}
        camera={camera}
        OpenCamera={OpenCamera}
        OpenFile={OpenFile}
        institute={institute}
        GetBranch={(data: number) => {
          GetBranchs(+data);
        }}
        branch={branch}
        ClearPictureData={(data: number) => ClearPictureData(data)}
        selfie={selfie}
        ClearVideoData={() => ClearVideoData()}
        Submitdata={(data: any) => (SetintData(data), setAlertVisible1(true))}
        zipname={zipname}
      />
      <Alart
        isVisible={alertVisible}
        setIsVisible={setAlertVisible}
        okText="ok"
        title="Application successfully created."
        subTitle={text}
        okPress={() => {
          setAlertVisible(false);
          AllClearAction();
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        }}></Alart>
      <Alart
        isVisible={alertVisible1}
        setIsVisible={setAlertVisible1}
        okText="Yes"
        cancelText="No"
        title="Confirm"
        subTitle="Are you sure you want to submit this application."
        okPress={() => {
          Submitdata(intData);
          setAlertVisible1(false);
        }}
        cancelPress={() => {
          setAlertVisible1(false);
        }}></Alart>
    </>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    user: state.video_camera,
    camera: state.camera,
    institute: state.user.institutelist,
    branch: state.user.branch_list,
    selfie: state.video_camera,
    response: state.user.applicationResponse,
    zip: state.camera?.zip,
    zipname: state.camera?.zipname,
  };
};
const mapDispatchToProps = {
  GetInstitutes,
  GetBranchs,
  ClearPictureData,
  ClearVideoData,
  TakePictureSuccess,
  ApplicationSubmit,
  AllClearAction,
  ZipUpload,
};
export default connect(mapStateToProps, mapDispatchToProps)(KycForm);
interface KycFrmProps {
  router?: any;
  navigation?: any;
  user?: any;
  camera?: Camera;
  GetInstitutes?: any;
  institute?: InstituteList[];
  GetBranchs?: any;
  branch?: BranchList[];
  ClearPictureData?: any;
  selfie?: TakePictureResponse | null;
  ClearVideoData?: any;
  TakePictureSuccess?: any;
  ApplicationSubmit?: any;
  response?: ApplicationResponse;
  AllClearAction?: any;
  ZipUpload?: any;
  zip: string;
  zipname: string;
}
