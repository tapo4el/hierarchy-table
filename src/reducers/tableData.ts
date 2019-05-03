import { handleActions } from 'redux-actions';

import { dataReceived, removeRecord } from '../actions';
import { TableData, DataReceivedAction, RemoveAction } from '../types';
import { normalizeData, removeRecords } from '../utils/tableData';

const initialState: TableData = { users: [], relatives: {}, phones: {} };

export default handleActions<TableData, any>({
    [dataReceived.toString()]: (state, { payload }: DataReceivedAction): TableData => normalizeData(payload),
    [removeRecord.toString()]: (state, { payload }: RemoveAction): TableData => removeRecords(state, payload),
}, initialState);
