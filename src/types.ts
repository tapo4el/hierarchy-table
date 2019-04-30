export interface AppState {
    tableData: TableData;
}
export interface TableData {
    users: Record[];
    relatives: {
        [key: string]: Record[];
    };
    phones: {
        [key: string]: Record[];
    };
}
export interface Record {
    [key: string]: string;
}
// export interface User {
//     'Identification number': string;
//     'Name': string;
//     'Gender': string;
//     'Risk': string;
//     'Hair length': string;
//     'IQ': string;
//     'Admission date': string;
//     'Last breakdown': string;
//     'Yearly fee': string;
//     'Knows the Joker?': string;
// }
export interface DataResponse {
    data: Record;
    kids: {
        has_relatives?: {
            records: RelativesResponse[];
        };
    };
}
// export interface Relative {
//     'Relative ID': string;
//     'Patient ID': string;
//     'Is alive?': string;
//     'Frequency of visits': string;
// }
export interface RelativesResponse {
    data: Record;
    kids: {
        has_phone?: {
            records: PhoneResponse[];
        };
    };
}
// export interface Phone {
//     'Phone ID': string;
//     'ID of the relative': string;
//     'Phone': string;
// }
export interface PhoneResponse {
    data: Record;
    kids: {
        has_phone?: {
            records: object[];
        };
    };
}

export type childTable = 'relatives' | 'phones';
