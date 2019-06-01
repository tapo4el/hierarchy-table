import {
    TableData,
    RelativeResponse,
    UserResponse,
    PhoneResponse,
    RemoveRow,
    Record,
} from '../types';
import tableConfigs from '../configs/tableConfigs';

const normalizePhone = (records: PhoneResponse[]): Record[] => (
    records.map((item: PhoneResponse): Record => item.data)
);

const normalizeRelatives = (acc: TableData, records: RelativeResponse[]): Record[] => (
    records.map((item: RelativeResponse): Record => {
        if (Object.prototype.hasOwnProperty.call(item.kids, 'has_phone')) {
            acc.phones[item.data['Relative ID']] = normalizePhone(item.kids.has_phone.records);
        }
        return item.data;
    })
);

export function normalizeData(data: UserResponse[]): TableData {
    return data.reduce((acc: TableData, item: UserResponse): TableData => {
        if (Object.prototype.hasOwnProperty.call(item.kids, 'has_relatives')) {
            acc.relatives[item.data['Identification number']] = normalizeRelatives(acc, item.kids.has_relatives.records);
        }
        return {
            ...acc,
            users: [...acc.users, item.data],
        };
    }, { users: [], relatives: {}, phones: {} });
}

function removeChildren(state: TableData, tableName: string, id: string): TableData {
    const { childTableName } = tableConfigs[tableName];
    if (state[childTableName] && state[childTableName][id]) {
        const { idField } = tableConfigs[childTableName];
        const newState = state[childTableName][id]
            .map(el => el[idField])
            .reduce((acc, childId) => removeChildren(acc, childTableName, childId), state);

        return {
            ...newState,
            [childTableName]: {
                // @ts-ignore
                ...Object.fromEntries(Object.entries(state[childTableName]).filter(([nId]) => nId !== id)),
            },
        };
    }
    return state;
}

export function removeRecords(state: TableData, payload: RemoveRow): TableData {
    let filtered: Record[];
    const { tableName, id, parentId } = payload;
    const { idField } = tableConfigs[tableName];

    if (tableName === 'users') {
        filtered = state[tableName].filter(el => el[idField] !== id);
    } else {
        filtered = state[tableName][parentId].filter(el => el[idField] !== id);
    }
    const newState = {
        ...state,
        [tableName]: parentId ? {
            ...Object.entries(state[tableName]).reduce((acc, [key, value]) => {
                if (key === parentId) {
                    return filtered.length > 0 ? {
                        ...acc,
                        [key]: filtered,
                    } : acc;
                }
                return {
                    ...acc,
                    [key]: value,
                };
            }, {}),
        } : filtered,
    };

    return removeChildren(newState, tableName, id);
}
