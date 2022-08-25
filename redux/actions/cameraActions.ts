import {TakePictureResponse} from 'react-native-camera';

export enum CameraActionTypes {
  Take_Picture_Success = '[CAMERA] Take Picture Success',
  Clear_Picture_Data = '[CAMERA] Clear Picture Data',
  Aadhar_Zip_take='[CAMERA] Aadhar Zip Take'
}

export const TakePictureSuccess = (payload: any) => {
  return {type: CameraActionTypes.Take_Picture_Success, payload: payload};
};

export const ClearPictureData = (payload: number) => {
  return {type: CameraActionTypes.Clear_Picture_Data, payload: payload};
};

export const ZipUpload = (payload: any) => {
  return {type: CameraActionTypes.Aadhar_Zip_take, payload: payload};
};