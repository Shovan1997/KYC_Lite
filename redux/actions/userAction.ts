import {ErrorModel} from '../../models/errorModels';
import {
  ApplicationData,
  InstituteList,
  User,
  ValidateOtps,
} from '../../models/userModels';
import {
  ApplicationSubmmit,
  GenerateOtp,
  GetBranch,
  GetInstitute,
  UpWHL,
  ValidateOtp,
} from '../../services/mainServices';

export enum UserActionTypes {
  Begin_Api_Call = '[API_STATUS] Begin Api Call Action',
  Api_Call_Error = '[API_STATUS] Api Call Error Action',
  Generate_Otp_Success = '[USER] Generate Otp Success',
  Otp_Flag_Reset = '[USER] Otp Flag Reset',
  Otp_Verification_Success = '[USER] Otp Verification Success',
  Institute_Load_Success_Action = '[USER] Institute Load Success Action',
  Branch_Load_Success_Action = '[USER] Branch Load Success Action',
  Application_Submit_Success_Action = '[USER] Application Submit Success Action',
  All_Clear_Action = '[USER] All Clear Action',

  WhiteList_Success_Update='[USER] WhiteList Update Success Action'
}

export const OtpGenerate = (payload: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(BeginApiCallAction(true));
    return GenerateOtp(payload)
      .then(response => {
        if (!!(<ErrorModel>response.data.Errors)) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(OtpGenerateSuccess());
        }
      })
      .catch(error => {
        dispatch(
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [],
            System_Errors: [
              {
                Code: 'SE001',
                Message: 'Error',
                Payload: [],
              },
            ],
            Warnings: [],
          }),
        );
      });
  };
};

export const OtpGenerateSuccess = () => {
  return {type: UserActionTypes.Generate_Otp_Success};
};

export const BeginApiCallAction = (payload: boolean) => {
  return {type: UserActionTypes.Begin_Api_Call, payload: payload};
};

export const ApiCallErrorAction = (payload: ErrorModel) => {
  return {type: UserActionTypes.Api_Call_Error, payload: payload};
};

export const OtpFlagReset = () => {
  return {type: UserActionTypes.Otp_Flag_Reset};
};

export const OtpVerification = (payload: ValidateOtps) => {
  return (dispatch: any, getState: any) => {
    dispatch(BeginApiCallAction(true));
    return ValidateOtp(payload)
      .then(response => {
        console.log(payload);
        console.log(response.data);
        if (!!(<ErrorModel>response.data.Errors)) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(OtpVerificationSuccess(response.data));
        }
      })
      .catch(error => {
        dispatch(
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [],
            System_Errors: [
              {
                Code: 'SE001',
                Message: 'Error',
                Payload: [],
              },
            ],
            Warnings: [],
          }),
        );
      });
  };
};
export const OtpVerificationSuccess = (data: User) => {
  return {type: UserActionTypes.Otp_Verification_Success, payload: data};
};

export const GetInstitutes = () => {
  return (dispatch: any, getState: any) => {
    dispatch(BeginApiCallAction(true));
    return GetInstitute()
      .then(response => {
        if (!!(<ErrorModel>response.data.Errors)) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(GetInstituteSuccess(response.data));
        }
      })
      .catch(error => {
        console.log(error);

        dispatch(
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [],
            System_Errors: [
              {
                Code: 'SE001',
                Message: 'Error',
                Payload: [],
              },
            ],
            Warnings: [],
          }),
        );
      });
  };
};

export const GetInstituteSuccess = (data: InstituteList[]) => {
  return {type: UserActionTypes.Institute_Load_Success_Action, payload: data};
};

export const GetBranchs = (data: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(BeginApiCallAction(true));
    return GetBranch(data)
      .then(response => {
        if (!!(<ErrorModel>response.data.Errors)) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(GetBranchSuccess(response.data));
        }
      })
      .catch(error => {
        console.log(error);

        dispatch(
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [],
            System_Errors: [
              {
                Code: 'SE001',
                Message: 'Error',
                Payload: [],
              },
            ],
            Warnings: [],
          }),
        );
      });
  };
};

export const GetBranchSuccess = (data: InstituteList[]) => {
  return {type: UserActionTypes.Branch_Load_Success_Action, payload: data};
};

export const ApplicationSubmit = (data: ApplicationData) => {
  return (dispatch: any, getState: any) => {
    dispatch(BeginApiCallAction(true));
    return ApplicationSubmmit(data)
      .then(response => {
        if (!!(<ErrorModel>response.data.Errors)) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(ApplicationSubmitSuccessAction(response.data));
        }
      })
      .catch(error => {
        console.log(error);

        dispatch(
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [],
            System_Errors: [
              {
                Code: 'SE001',
                Message: 'Error',
                Payload: [],
              },
            ],
            Warnings: [],
          }),
        );
      });
  };
};

export const ApplicationSubmitSuccessAction = (data: any) => {
  return {
    type: UserActionTypes.Application_Submit_Success_Action,
    payload: data,
  };
};

export const AllClearAction = (data: any) => {
  return {
    type: UserActionTypes.All_Clear_Action,
  };
};

export const UpdateWhite = (data: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(BeginApiCallAction(true));
    return UpWHL(data)
      .then(response => {
        if (!!(<ErrorModel>response.data.Errors)) {
          dispatch(ApiCallErrorAction(response.data.Errors));
        } else {
          dispatch(UpdateWhiteSuccess(response.data));
        }
      })
      .catch(error => {
        console.log(error);

        dispatch(
          ApiCallErrorAction({
            Business_Errors: [],
            Info: [],
            System_Errors: [
              {
                Code: 'SE001',
                Message: 'Error',
                Payload: [],
              },
            ],
            Warnings: [],
          }),
        );
      });
  };
};

export const UpdateWhiteSuccess = (data: any) => {
  return {type: UserActionTypes.WhiteList_Success_Update, payload: data};
};