import { Record } from '../../types';

export interface OwnProps {
    tableName: string;
    id?: string;
}
export interface TableProps {
    tableName: string;
    data: Record[];
    childList: string[];
}
export interface TableState {
    showChildrenFor: string[];
}
