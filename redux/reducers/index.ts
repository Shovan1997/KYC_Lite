import {combineReducers} from 'redux';
import CameraReducer from './cameraReducer';
import UserReducer from './userReducer';
import VideoCameraReducer from './videoCameraReducers';

const rootReducer = combineReducers({
  user: UserReducer,
  video_camera: VideoCameraReducer,
  camera: CameraReducer,
});

export default rootReducer;
