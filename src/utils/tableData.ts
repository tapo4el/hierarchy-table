import {
    TableData,
    RelativeResponse,
    UserResponse,
    PhoneResponse,
} from '../types';

function normalizePhone(acc: TableData, records: PhoneResponse[]): void {
    records.forEach((item: PhoneResponse): void => {
        acc.phones[item.data['ID of the relative']].push(item.data);
    });
}

function normalizeRelatives(acc: TableData, records: RelativeResponse[]): void {
    records.forEach((item: RelativeResponse): void => {
        acc.relatives[item.data['Patient ID']].push(item.data);
        if (Object.prototype.hasOwnProperty.call(item.kids, 'has_phone')) {
            acc.phones[item.data['Relative ID']] = [];
            normalizePhone(acc, item.kids.has_phone.records);
        }
    });
}

export default function normalizeData(data: UserResponse[]): TableData {
    return data.reduce((acc: TableData, item: UserResponse): TableData => {
        acc.users.push(item.data);
        if (Object.prototype.hasOwnProperty.call(item.kids, 'has_relatives')) {
            acc.relatives[item.data['Identification number']] = [];
            normalizeRelatives(acc, item.kids.has_relatives.records);
        }
        return acc;
    }, { users: [], relatives: {}, phones: {} });
}
