import {
    TableData,
    RelativesResponse,
    DataResponse,
    PhoneResponse,
} from '../types';

function normalizePhone(acc: TableData, records: PhoneResponse[]): void {
    records.forEach((item: PhoneResponse): void => {
        acc.phone[item.data['ID of the relative']].push(item.data);
    });
}

function normalizeRelatives(acc: TableData, records: RelativesResponse[]): void {
    records.forEach((item: RelativesResponse): void => {
        acc.relatives[item.data['Patient ID']].push(item.data);
        if (Object.prototype.hasOwnProperty.call(item.kids, 'has_phone')) {
            acc.phone[item.data['Relative ID']] = [];
            normalizePhone(acc, item.kids.has_phone.records);
        }
    });
}

export default function normalizeData(data: DataResponse[]): TableData {
    return data.reduce((acc: TableData, item: DataResponse): TableData => {
        acc.parents.push(item.data);
        if (Object.prototype.hasOwnProperty.call(item.kids, 'has_relatives')) {
            acc.relatives[item.data['Identification number']] = [];
            normalizeRelatives(acc, item.kids.has_relatives.records);
        }
        return acc;
    }, { parents: [], relatives: {}, phone: {} });
}
