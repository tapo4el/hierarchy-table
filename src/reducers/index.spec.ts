import tableData from './tableData';
import dataReceived from '../actions';
import { response, finalAppState, initialState } from '../utils/testData';

describe('Reducers', () => {
    it('tableData should add user, relatives and phones', () => {
        expect(tableData(initialState, dataReceived(response))).toEqual(finalAppState.tableData);
    });
});
