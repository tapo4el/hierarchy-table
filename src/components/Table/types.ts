import { OutputParametricSelector } from 'reselect';

import { AppState, Record } from '../../types';

export interface OwnProps {
    tableName: 'users' | 'relatives' | 'phones';
    id?: string;
    parentId?: string;
}
export interface TableProps {
    tableName: 'users' | 'relatives' | 'phones';
    data: Record[];
    childList: string[];
    parentId?: string;
}
export interface TableState {
    showChildrenFor: string[];
}

export type selectorType = OutputParametricSelector<AppState, string, Record[], (res: [AppState, string]) => Record[]>
