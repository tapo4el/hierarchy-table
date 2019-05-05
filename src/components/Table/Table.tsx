import * as React from 'react';

import './styles.less';

import { TableState } from './types';
import { MyProps } from './enhancer';
import tableConfigs from '../../configs/tableConfigs';
import { Record } from '../../types';
import ChildTable from './index';

class Table extends React.PureComponent<MyProps, TableState> {
    state: TableState = {
        showChildrenFor: [],
    };

    onClickHandler(id: string): void {
        const { showChildrenFor } = this.state;
        if (showChildrenFor.includes(id)) {
            this.setState({ showChildrenFor: showChildrenFor.filter(Id => Id !== id) });
        } else {
            this.setState({ showChildrenFor: showChildrenFor.concat(id) });
        }
    }

    renderRow(elem: Record): React.ReactNode {
        const {
            tableName,
            childList,
            removeRecord,
            parentId,
        } = this.props;
        const { showChildrenFor } = this.state;
        const { idField, childTableName, columns } = tableConfigs[tableName];
        const id = elem[idField];
        const hasChildTable = childList.includes(id);
        const isChildTableVisible = showChildrenFor.includes(id) && hasChildTable;

        return (
            <React.Fragment key={id}>
                <tr>
                    { childTableName && (
                        <td className="arrow" onClick={() => this.onClickHandler(id)} key="arrow" role="presentation">
                            { hasChildTable && <div className={isChildTableVisible ? 'arrowDown' : 'arrowRight'} /> }
                        </td>
                    )}
                    { Object.keys(elem).map(item => <td key={item}>{elem[item]}</td>) }
                    <td key="remove">
                        <button
                            type="button"
                            className="removeButton"
                            onClick={() => removeRecord({ parentId, tableName, id })}
                        >
                            Remove
                        </button>
                    </td>
                </tr>
                { isChildTableVisible && (
                    <tr>
                        <td colSpan={columns.length} className="tableWrapper">
                            <div>{`has_${childTableName}`}</div>
                            <ChildTable tableName={childTableName} id={id} />
                        </td>
                    </tr>
                ) }
            </React.Fragment>
        );
    }

    render(): React.ReactNode {
        const { data, tableName } = this.props;
        const { columns } = tableConfigs[tableName];

        return (
            <table className="dataTable">
                <thead>
                    <tr>
                        { columns.map(elem => <th key={elem.key}>{elem.title}</th>)}
                    </tr>
                </thead>
                <tbody>
                    { data.map(elem => this.renderRow(elem))}
                </tbody>
            </table>
        );
    }
}

export default Table;
