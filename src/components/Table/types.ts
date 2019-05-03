import { OutputParametricSelector } from 'reselect';

import { AppState, Record, Table } from '../../types';

export interface OwnProps {
    tableName: Table;
    id?: string;
    parentId?: string;
}
export interface TableProps {
    tableName: Table;
    data: Record[];
    childList: string[];
    parentId?: string;
}
export interface TableState {
    showChildrenFor: string[];
}

export type selectorType = OutputParametricSelector<AppState, string, Record[], (res: [AppState, string]) => Record[]>
