import { createAction } from 'redux-actions';

import { UserResponse, RemoveRow } from '../types';

export const dataReceived = createAction<UserResponse[]>('DATA_RECEIVED');

export const removeRecord = createAction<RemoveRow>('REMOVE_RECORD');
