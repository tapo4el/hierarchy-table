import { ChildTable } from '../types';

export interface TableConfigs {
    [key: string]: TableConfig;
}
export interface TableConfig {
    columns: CellConfig[];
    idField: string;
    childTableName?: ChildTable;
}
export interface CellConfig {
    title: string;
    key: number;
}
