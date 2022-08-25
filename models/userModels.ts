import {ErrorModel} from './errorModels';

export interface UserState {
  loading?: boolean;
  institutelist?: InstituteList[];
  branch_list?: BranchList[];
  userdetail?: User;
  error?: ErrorModel;
  Otp_generated?: boolean;
  applicationResponse?: ApplicationResponse;
}
export interface User {
  customer_id: number;
  contact_no: string;
  created_on: Date;
  application_id?: any;
  application_status?: string;
  ekyc_whitelist: EkycWhitelist[];
}
export interface InstituteList {
  institute_id: string;
  institute_name: string;
}
export interface BranchList {
  branch_id: number;
  branch_name: string;
  address: string;
}

export interface AssociatedAccount {
  accountNumber: string;
  accountType: string;
}

export interface InstituteBranch {
  branchId: number;
  instituteParentId: number;
}

export interface KycDocument {
  document?: any;
  documentIdentificationNo: string;
  documentType: string;
}

export interface PermanentAddress {
  addressLine1: string;
  addressLine2?: any;
  city: string;
  country: string;
  pin: string;
  state: string;
}

export interface PresentAddress {
  addressLine1: string;
  addressLine2?: any;
  city: string;
  country: string;
  pin: string;
  state: string;
}

export interface ApplicationData {
  applicationDate?: any;
  applicationMode?: string | null;
  associatedAccounts?: AssociatedAccount[] | null;
  contactNo: string;
  email: string;
  firstName: string;
  instituteBranch: InstituteBranch;
  kycDocuments: KycDocument[];
  lastName: string;
  middleName?: any;
  permanentAddress: PermanentAddress;
  presentAddress: PresentAddress;
  photo: any;
  gender?: string;
  dob?: any;
  shareCode?: string | null;
  uidaiFileName?: string | null;
  uidaiZipFile?: string | null;
}

export interface GenerateOtpP {
  contact_no?: string;
  key?: string;
}

export interface ValidateOtps {
  username: string;
  otp: string;
}
//
export interface InstituteBranch1 {
  address: string;
  branchId: number;
  branchLegalEntity?: any;
  brancheName: string;
  instituteParentId: number;
}

export interface KycDocument1 {
  document?: any;
  documentFilePath?: any;
  documentId: number;
  documentIdentificationNo: string;
  documentType: string;
  status: string;
}

export interface ApplicationResponse {
  applicantId?: any;
  applicationDate: Date;
  applicationId: string;
  applicationMode: string;
  applicationStatus: string;
  associatedAccounts?: any;
  contactNo: string;
  createdBy: string;
  createdOn: Date;
  dob: Date;
  email: string;
  firstName: string;
  gender: string;
  hashCode?: any;
  instituteAuditStatus: string;
  instituteBranch: InstituteBranch1;
  instituteRejectionComment?: any;
  kycDocuments: KycDocument1[];
  lastName: string;
  middleName: string;
  ocrRejComment?: any;
  ocrVerificationStatus: string;
  permanentAddress?: any;
  photo?: any;
  photoPath?: any;
  presentAddress?: any;
  smartContractId?: any;
  thirdPartyAuditStatus: string;
  thirdPartyRejComment?: any;
  updatedBy: string;
  updatedOn: Date;
}
export interface EkycWhitelist {
  ekyc_number: string;
  institute_name: string;
  institution_id: number;
  updated_by: string;
  updated_on: Date;
  whitelisting_status: string;
}
