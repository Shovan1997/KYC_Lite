import {RecordResponse, TakePictureResponse} from 'react-native-camera';
import InitialState from './initialState';
import {VideoActionTypes} from '../actions/videoCameraActions';
import {UserActionTypes} from '../actions/userAction';

const initialState: RecordResponse | null = InitialState.video_camera;

export default function VideoCameraReducer(
  state: RecordResponse | null = initialState,
  action: any,
) {
  switch (action.type) {
    case VideoActionTypes.Take_Video_Success:
      console.log('Picture Success');
      return {...state, ...action.payload};
    case VideoActionTypes.Clear_Video_Data:
      console.log('Clear Pictures');
      return null;
    case UserActionTypes.All_Clear_Action:
      return {...initialState};
    default:
      return state;
  }
}
