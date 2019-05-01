import { handleActions } from 'redux-actions';

import dataReceived from '../actions';
import { TableData, UserResponse } from '../types';
import normalizeData from '../utils/tableData';

const initialState: TableData = { users: [], relatives: {}, phones: {} };

export default handleActions<TableData, UserResponse[]>({
    [dataReceived.toString()]: (state, { payload }): TableData => normalizeData(payload),
}, initialState);
