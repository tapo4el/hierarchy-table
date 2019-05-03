import { normalizeData, removeRecords } from './tableData';

import { response, finalAppState, removeRowPayload, initialState, getCopy, usersList } from './testData';
import { RemoveRow } from '../types';

describe('tableData utils', () => {
    it('normalizeData should add user, relatives and phones', () => {
        expect(normalizeData(response)).toEqual(finalAppState.tableData);
    });

    it('removeRecords should remove record and all nested records', () => {
        expect(removeRecords(getCopy(finalAppState.tableData), removeRowPayload)).toEqual(initialState);
    });

    it('removeRecords should remove only child record and all nested child records', () => {
        const removeChildRowPayload: RemoveRow = {
            tableName: 'relatives',
            id: '1007',
            parentId: '34',
        };
        const removeChildRowState = {
            users: usersList,
            relatives: {},
            phones: {},
        };
        expect(removeRecords(getCopy(finalAppState.tableData), removeChildRowPayload)).toEqual(removeChildRowState);
    });

    it('removeRecords should remove only single child record', () => {
        const removeChildRowPayload: RemoveRow = {
            tableName: 'relatives',
            id: '1008',
            parentId: '34',
        };
        const child = {
            'Relative ID': '1008',
            'Patient ID': '34',
            'Is alive?': 'true',
            'Frequency of visits': '29',
        };
        const stateWithTwoRelatives = getCopy(finalAppState.tableData);
        stateWithTwoRelatives.relatives['34'].push(child);
        expect(removeRecords(stateWithTwoRelatives, removeChildRowPayload)).toEqual(finalAppState.tableData);
    });
});
