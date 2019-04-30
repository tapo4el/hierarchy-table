import { handleActions } from 'redux-actions';

import dataReceived from '../actions';
import { TableData, DataResponse } from '../types';
import normalizeData from '../utils/tableData';

const initialState: TableData = { users: [], relatives: {}, phones: {} };

export default handleActions<TableData, DataResponse[]>({
    [dataReceived.toString()]: (state, { payload }): TableData => normalizeData(payload),
}, initialState);
