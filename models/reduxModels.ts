import {TakePictureResponse} from 'react-native-camera';
import {UserState} from './userModels';

export interface StoreState {
  user: UserState;
  video_camera: TakePictureResponse | null;
  camera?: Camera;
}

export interface Camera {
  camera1: TakePictureResponse | null;
  camera2: TakePictureResponse | null;
  camera3: TakePictureResponse | null;
  camera4: TakePictureResponse | null;
  camera5: TakePictureResponse | null;
  camera6: TakePictureResponse | null;
  zip?: string;
  zip_code?: string;
  zipname?: string;
}
