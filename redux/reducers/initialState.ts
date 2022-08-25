import {StoreState} from '../../models/reduxModels';

const InitialState: StoreState = {
  user: {
    loading: false,
    branch_list: [],
    institutelist: [],
    userdetail: undefined,
    Otp_generated: false,
    error: undefined,
    applicationResponse: undefined,
  },
  video_camera: null,
  camera: {
    camera1: null,
    camera2: null,
    camera3: null,
    camera4: null,
    camera5: null,
    zip: undefined,
    zip_code: undefined,
    zipname: undefined
  },
};

export default InitialState;
