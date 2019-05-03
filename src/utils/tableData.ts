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

function removeChildren(state: TableData, tableName: string, id: string): void {
    const { childTableName } = tableConfigs[tableName];
    if (state[childTableName] && state[childTableName][id]) {
        const { idField } = tableConfigs[childTableName];
        state[childTableName][id]
            .map(el => el[idField])
            .map(childId => removeChildren(state, childTableName, childId));
        // eslint-disable-next-line no-param-reassign
        delete state[childTableName][id];
    }
}

export function removeRecords(state: TableData, payload: RemoveRow): TableData {
    const newState = { ...state };
    const { tableName, id, parentId } = payload;
    const { idField } = tableConfigs[tableName];
    if (tableName === 'users') {
        newState[tableName] = newState[tableName].filter(el => el[idField] !== id);
    } else {
        const newList = newState[tableName][parentId].filter(el => el[idField] !== id);
        if (newList.length > 0) {
            newState[tableName][parentId] = newList;
        } else {
            delete newState[tableName][parentId];
        }
    }
    removeChildren(newState, tableName, id);

    return newState;
}
