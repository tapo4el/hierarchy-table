import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppState, ChildTable, RemoveRow } from '../../types';
import {
    getUsers,
    getPhones,
    getRelatives,
    getChildren,
} from '../../selectors';
import { OwnProps, TableProps, selectorType } from './types';
import tableConfigs from '../../configs/tableConfigs';
import { removeRecord } from '../../actions';

const selectorsMap: {[key: string]: selectorType} = {
    users: getUsers,
    relatives: getRelatives,
    phones: getPhones,
};

const childrenName = (tableName: string): ChildTable | undefined => tableConfigs[tableName].childTableName;

const mapStateToProps = (state: AppState, ownProps: OwnProps): TableProps => ({
    data: selectorsMap[ownProps.tableName](state, ownProps.id),
    tableName: ownProps.tableName,
    childList: childrenName(ownProps.tableName) ? getChildren(state, childrenName(ownProps.tableName)) : [],
    parentId: ownProps.id,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    removeRecord: (payload: RemoveRow) => dispatch(removeRecord(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps);

export type MyProps = TableProps & ReturnType<typeof mapDispatchToProps>
