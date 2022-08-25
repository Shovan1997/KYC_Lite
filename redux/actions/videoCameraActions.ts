import {RecordResponse} from 'react-native-camera';

export enum VideoActionTypes {
  Take_Video_Success = '[VIDEO_CAMERA] Take Video Success',
  Clear_Video_Data = '[VIDEO_CAMERA] Clear Video Data',
}

export const TakeVideoSuccess = (payload: RecordResponse) => {
  return {type: VideoActionTypes.Take_Video_Success, payload: payload};
};

export const ClearVideoData = () => {
  return {type: VideoActionTypes.Clear_Video_Data};
};
