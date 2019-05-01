import { TableConfigs } from './types';

const tableConfigs: TableConfigs = {
    users: {
        columns: [
            {
                title: '',
                key: 0,
            },
            {
                title: 'Identification number',
                key: 1,
            },
            {
                title: 'Name',
                key: 2,
            },
            {
                title: 'Gender',
                key: 3,
            },
            {
                title: 'Risk',
                key: 4,
            },
            {
                title: 'Hair length',
                key: 5,
            },
            {
                title: 'IQ',
                key: 6,
            },
            {
                title: 'Admission date',
                key: 7,
            },
            {
                title: 'Last breakdown',
                key: 8,
            },
            {
                title: 'Yearly fee',
                key: 9,
            },
            {
                title: 'Knows the Joker?',
                key: 10,
            },
        ],
        idField: 'Identification number',
        childTableName: 'relatives',
    },
    relatives: {
        columns: [
            {
                title: '',
                key: 0,
            },
            {
                title: 'Relative ID',
                key: 1,
            },
            {
                title: 'Patient ID',
                key: 2,
            },
            {
                title: 'Is alive?',
                key: 3,
            },
            {
                title: 'Frequency of visits',
                key: 4,
            },
        ],
        idField: 'Relative ID',
        childTableName: 'phones',
    },
    phones: {
        columns: [
            {
                title: 'Phone ID',
                key: 1,
            },
            {
                title: 'ID of the relative',
                key: 2,
            },
            {
                title: 'Phone',
                key: 3,
            },
        ],
        idField: 'Phone ID',
    },
};

export default tableConfigs;
