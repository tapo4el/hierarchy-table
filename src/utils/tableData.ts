import {
    TableData,
    RelativeResponse,
    UserResponse,
    PhoneResponse,
    RemoveRow,
} from '../types';
import tableConfigs from '../configs/tableConfigs';

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

export function normalizeData(data: UserResponse[]): TableData {
    return data.reduce((acc: TableData, item: UserResponse): TableData => {
        acc.users.push(item.data);
        if (Object.prototype.hasOwnProperty.call(item.kids, 'has_relatives')) {
            acc.relatives[item.data['Identification number']] = [];
            normalizeRelatives(acc, item.kids.has_relatives.records);
        }
        return acc;
    }, { users: [], relatives: {}, phones: {} });
}

export function removeRecords(state: TableData, payload: RemoveRow): TableData {
    const newState = { ...state };
    const { tableName, id, parentId } = payload;
    let { childTableName, idField } = tableConfigs[tableName];
    if (parentId) {
        // @ts-ignore
        newState[tableName][parentId] = newState[tableName][parentId].filter(el => el[idField] !== id);
    } else {
        // @ts-ignore
        newState[tableName] = newState[tableName].filter(el => el[idField] !== id);
    }
    let readyToRemove = [id];
    let childrenId: string[];
    console.log(newState);

    while (childTableName && childrenId) {
        ({ idField } = tableConfigs[childTableName]);
        childrenId = newState[childTableName][id] && newState[childTableName][id].map(el => el[idField]);
        // eslint-disable-next-line no-loop-func
        readyToRemove.forEach(i => delete newState[childTableName][i]);
        ({ childTableName } = tableConfigs[childTableName]);
        readyToRemove = childrenId;
    }

    return newState;
}
