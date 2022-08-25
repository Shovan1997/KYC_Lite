import Axios from 'axios';
import {environment} from '../environment';
import {
  ApplicationData,
  GenerateOtpP,
  ValidateOtps,
} from '../models/userModels';

export const GenerateOtp = (data: GenerateOtpP) => {
  return Axios.post(environment.GenerateOtp, data);
};
export const ValidateOtp = (data: ValidateOtps) => {
  return Axios.post(environment.LoginUrl, data);
};

export const GetInstitute = () => {
  return Axios.get(environment.getInstituteUrl);
};
export const GetBranch = (data: number) => {
  return Axios.post(environment.GetBranchByInsurl, {institute_id: data});
};
export const ApplicationSubmmit = (data: ApplicationData) => {
  return Axios.post(environment.ApplicationSubmitUrl, data);
};
export const UpWHL = (data: any) => {
  return Axios.post(environment.UpdateWhUrl, data);
};

