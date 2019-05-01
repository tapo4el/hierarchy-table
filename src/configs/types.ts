import { childTable } from '../types';

export interface TableConfigs {
    [key: string]: TableConfig;
}
export interface TableConfig {
    columns: CellConfig[];
    idField: string;
    childTableName?: childTable;
}
export interface CellConfig {
    title: string;
    key: number;
}
