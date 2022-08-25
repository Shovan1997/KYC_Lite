import {UserState} from '../../models/userModels';
import {UserActionTypes} from '../actions/userAction';
import InitialState from './initialState';

const initialState: UserState = InitialState.user;

export default function UserReducer(
  state: UserState = initialState,
  action: any,
) {
  switch (action.type) {
    case UserActionTypes.Begin_Api_Call:
      return {...state, loading: action.payload};
    case UserActionTypes.Api_Call_Error:
      return {...state, error: action.payload, loading: false};
    case UserActionTypes.Generate_Otp_Success:
      return {...state, Otp_generated: true, loading: false};
    case UserActionTypes.Otp_Flag_Reset:
      return {...state, Otp_generated: false, loading: false};
    case UserActionTypes.Otp_Verification_Success:
      return {
        ...state,
        Otp_generated: false,
        userdetail: action.payload,
        loading: false,
      };
    case UserActionTypes.Institute_Load_Success_Action:
      return {...state, institutelist: action.payload, loading: false};
    case UserActionTypes.Branch_Load_Success_Action:
      return {...state, branch_list: action.payload, loading: false};
    case UserActionTypes.Application_Submit_Success_Action:
      return {
        ...state,
        applicationResponse: action.payload,
        loading: false,
        userdetail: {
          ...state.userdetail,
          application_id: action.payload.applicationId,
          application_status: action.payload.applicationStatus,
        },
      };
    case UserActionTypes.All_Clear_Action:
      return {...state, applicationResponse: undefined};
    case UserActionTypes.WhiteList_Success_Update:
      return{...state, loading: false, userdetail: {...state.userdetail, ekyc_whitelist: action.payload}}
    default:
      return state;
  }
}
