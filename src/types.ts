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
export interface UserResponse {
    data: Record;
    kids: {
        has_relatives?: {
            records: RelativeResponse[];
        };
    };
}
export interface RelativeResponse {
    data: Record;
    kids: {
        has_phone?: {
            records: PhoneResponse[];
        };
    };
}
export interface PhoneResponse {
    data: Record;
    kids: {
        has_phone?: {
            records: object[];
        };
    };
}

export type childTable = 'relatives' | 'phones';
