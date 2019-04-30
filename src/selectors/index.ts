import { createSelector } from 'reselect';

import { AppState, Record, childTable } from '../types';

const stateAndId = (state: AppState, id: string): [AppState, string] => [state, id];
const stateAndChildTableName = (state: AppState, childName: childTable): [AppState, childTable] => [state, childName];

export const getUsers = createSelector(
    stateAndId,
    ([{ tableData: { users } }]): Record[] => users,
);

export const getRelatives = createSelector(
    stateAndId,
    ([{ tableData: { relatives } }, id]): Record[] => relatives[id],
);

export const getPhones = createSelector(
    stateAndId,
    ([{ tableData: { phones } }, id]): Record[] => phones[id],
);

export const getChildren = createSelector(
    stateAndChildTableName,
    ([{ tableData }, childName]): string[] => Object.keys(tableData[childName]),
);
