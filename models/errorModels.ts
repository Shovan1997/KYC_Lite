export interface ErrorState {
    error_repo: error_repo[];
}

export interface ErrorModel {
    System_Errors: Error[];
    Business_Errors: Error[];
    Warnings: Error[];
    Info: Error[];
}

export interface Error {
    Code?: string;
    Message?: string;
    Payload?: string[];
}

export interface error_repo {
    error_id?: number;
    error_code?: string;
    error_message?: string;
    level_of_severity?: number;
}