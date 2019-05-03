import tableData from './tableData';
import { dataReceived, removeRecord } from '../actions';
import {
    response,
    finalAppState,
    initialState,
    removeRowPayload,
} from '../utils/testData';

describe('Reducers', () => {
    it('tableData should add user, relatives and phones', () => {
        expect(tableData(initialState, dataReceived(response))).toEqual(finalAppState.tableData);
    });

    it('removeRecord should remove record and all nested records', () => {
        expect(tableData(finalAppState.tableData, removeRecord(removeRowPayload))).toEqual(initialState);
    });
});
