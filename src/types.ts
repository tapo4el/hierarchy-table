export interface AppState {
    tableData: TableData;
}
export interface TableData {
    parents: User[];
    relatives: {
        [key: string]: Relative[];
    };
    phone: {
        [key: string]: Phone[];
    };
}
export interface User {
    'Identification number': string;
    'Name': string;
    'Gender': string;
    'Risk': string;
    'Hair length': string;
    'IQ': string;
    'Admission date': string;
    'Last breakdown': string;
    'Yearly fee': string;
    'Knows the Joker?': string;
}
export interface DataResponse {
    data: User;
    kids: {
        has_relatives?: {
            records: RelativesResponse[];
        };
    };
}
export interface Relative {
    'Relative ID': string;
    'Patient ID': string;
    'Is alive?': string;
    'Frequency of visits': string;
}
export interface RelativesResponse {
    data: Relative;
    kids: {
        has_phone?: {
            records: PhoneResponse[];
        };
    };
}
export interface Phone {
    'Phone ID': string;
    'ID of the relative': string;
    'Phone': string;
}
export interface PhoneResponse {
    data: Phone;
    kids: {
        has_phone?: {
            records: object[];
        };
    };
}
