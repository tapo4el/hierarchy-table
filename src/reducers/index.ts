import { combineReducers } from 'redux';

import tableData from './tableData';
import { AppState } from '../types';

export default combineReducers<AppState>({
    tableData,
});
