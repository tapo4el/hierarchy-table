import {UserResponse, TableData, AppState, RemoveRow} from '../types';

export const response: UserResponse[] = [{
    data: {
        'Identification number': '34',
        Name: 'Jason',
        Gender: 'm',
        Risk: 'BITES',
        'Hair length': '1.6000000000',
        IQ: '91',
        'Admission date': 'Mon Feb 17 00:00:00 CET 1997',
        'Last breakdown': 'Wed Dec 03 03:09:55 CET 2014',
        'Yearly fee': '67932',
        'Knows the Joker?': 'false',
    },
    kids: {
        has_relatives: {// eslint-disable-line
            records: [
                {
                    data: {
                        'Relative ID': '1007',
                        'Patient ID': '34',
                        'Is alive?': 'true',
                        'Frequency of visits': '29',
                    },
                    kids: {
                        has_phone: {// eslint-disable-line
                            records: [
                                {
                                    data: {
                                        'Phone ID': '2008',
                                        'ID of the relative': '1007',
                                        Phone: '+(179)-982-0570',
                                    },
                                    kids: {

                                    },
                                },
                            ],
                        },
                    },
                },
            ],
        },
    },
}];

export const usersList = [{
    'Identification number': '34',
    Name: 'Jason',
    Gender: 'm',
    Risk: 'BITES',
    'Hair length': '1.6000000000',
    IQ: '91',
    'Admission date': 'Mon Feb 17 00:00:00 CET 1997',
    'Last breakdown': 'Wed Dec 03 03:09:55 CET 2014',
    'Yearly fee': '67932',
    'Knows the Joker?': 'false',
}];
export const relativesList = [{
    'Relative ID': '1007',
    'Patient ID': '34',
    'Is alive?': 'true',
    'Frequency of visits': '29',
}];
export const phonesList = [{
    'Phone ID': '2008',
    'ID of the relative': '1007',
    Phone: '+(179)-982-0570',
}];
export const finalAppState = {
    tableData: {
        users: usersList,
        relatives: {
            34: relativesList,
        },
        phones: {
            1007: phonesList,
        },
    },
};

export const initialAppState: AppState = {
    tableData: { users: [], relatives: {}, phones: {} },
};

export const initialState: TableData = { users: [], relatives: {}, phones: {} };

export const removeRowPayload: RemoveRow = {
    tableName: 'users',
    id: '34',
};
export const getCopy = (obj: any) => JSON.parse(JSON.stringify(obj));
