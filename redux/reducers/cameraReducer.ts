import {TakePictureResponse} from 'react-native-camera';
import InitialState from './initialState';
import {CameraActionTypes} from '../actions/cameraActions';
import {Camera} from '../../models/reduxModels';
import {UserActionTypes} from '../actions/userAction';

const initialState: Camera | undefined = InitialState.camera;

export default function CameraReducer(
  state: Camera | undefined = initialState,
  action: any,
) {
  switch (action.type) {
    case CameraActionTypes.Take_Picture_Success:
      console.log('calle3');
      return {
        ...state,
        camera1: action.payload.key == 1 ? action.payload.data : state?.camera1,
        camera2: action.payload.key == 2 ? action.payload.data : state?.camera2,
        camera3: action.payload.key == 3 ? action.payload.data : state?.camera3,
        camera4: action.payload.key == 4 ? action.payload.data : state?.camera4,
        camera5: action.payload.key == 5 ? action.payload.data : state?.camera5,
        camera6: action.payload.key == 6 ? action.payload.data : state?.camera6,
      };
    case CameraActionTypes.Clear_Picture_Data:
      console.log('called', action.payload);
      return {
        ...state,
        camera1: action.payload == 1 ? null : state?.camera1,
        camera2: action.payload == 2 ? null : state?.camera2,
        camera3: action.payload == 3 ? null : state?.camera3,
        camera4: action.payload == 4 ? null : state?.camera4,
        camera5: action.payload == 5 ? null : state?.camera5,
        camera6: action.payload == 6 ? null : state?.camera6,
        //all clear
        ...(action.payload == 0 && {
          camera1: null,
          camera2: null,
          camera3: null,
          camera4: null,
          camera5: null,
          camera6: null,
          zip: undefined,
          zip_code: undefined,
          zipname: undefined,
        }),
      };
    case UserActionTypes.All_Clear_Action:
      return {...initialState};
    case CameraActionTypes.Aadhar_Zip_take:
      return {
        ...state,
        zip: action.payload.zip,
        zip_code: action.payload.zip_code,
        zipname: action.payload.zipname,
      };
    default:
      return state;
  }
}
