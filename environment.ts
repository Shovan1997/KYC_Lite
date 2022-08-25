const baseUrl = 'http://3.6.163.115:8018/';
export const environment = {
  GenerateOtp: baseUrl + 'ekyctest/customer/generateotp/',
  LoginUrl: baseUrl + 'ekyctest/customer/login/',
  getInstituteUrl: baseUrl + 'ekyctest/shared/institutelist/',
  GetBranchByInsurl: baseUrl + 'ekyctest/shared/branchbyinstitute/',
  ApplicationSubmitUrl: baseUrl + 'ekyctest/customer/application/',
  OFFER_CALL_URL: baseUrl + 'ekyctest/webrtc/offercall/',
  ANSWER_CALL_URL: baseUrl + 'ekyctest/webrtc/answercall/',
  SEND_ICE_URL: baseUrl + 'ekyctest/webrtc/sendice/',
  HANGUP_CALL_URL: baseUrl + 'ekyctest/webrtc/hangupcall/',
  GET_OFFERS_URL: baseUrl + 'ekyctest/webrtc/getoffers/',
  POLL_OFFER_URL: baseUrl + 'ekyctest/webrtc/polloffer/',
  POLL_ANSWER_URL: baseUrl + 'ekyctest/webrtc/pollanswer/',
  UpdateWhUrl: baseUrl + 'ekyctest/customer/changewhiteliststatus/',
};
