import { createAction } from 'redux-actions';

import { UserResponse } from '../types';

const dataReceived = createAction<UserResponse[]>('DATA_RECEIVED');

export default dataReceived;
