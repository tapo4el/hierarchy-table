import { connect } from 'react-redux';

import { AppState, childTable } from '../../types';
import {
    getUsers,
    getPhones,
    getRelatives,
    getChildren,
} from '../../selectors';
import { OwnProps, TableProps } from './types';
import tableConfigs from '../../configs/tableConfigs';

const selectorsMap: any = {
    users: getUsers,
    relatives: getRelatives,
    phones: getPhones,
};

const childrenName = (tableName: string): childTable | undefined => tableConfigs[tableName].childTableName;

const mapStateToProps = (state: AppState, ownProps: OwnProps): TableProps => ({
    data: selectorsMap[ownProps.tableName](state, ownProps.id),
    tableName: ownProps.tableName,
    childList: childrenName(ownProps.tableName) ? getChildren(state, childrenName(ownProps.tableName)) : [],
});

export default connect(mapStateToProps, null);
