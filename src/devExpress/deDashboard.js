import React, {useMemo} from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import {ROW_COUNT} from "../tetris/useBoard";

export function DeDashboard(props) {

    const columns = useMemo(()=> {
        return Array(ROW_COUNT).fill(0).map( (ignore, index) => ({
            name: 'row' + index,
            title: '' + index,
            getCellValue: data => {
                const row = data['row' + index];
                const res = row.reduce( ((a ,b) => a + b), 0)
                return res.toString();
            }
        }));
    }, []);

    const tableColumnExtensions = useMemo(()=> {
        return Array(ROW_COUNT).fill(0).map( (ignore, index) => ({
            columnName: 'row' + index,
            width: 50
        }));
    }, []);

    return (
        <Grid className="t-de-grid"
            rows={props.rowData}
            columns={columns}
        >
            <Table cellComponent={MyCell} columnExtensions={tableColumnExtensions}/>
            <TableHeaderRow />
        </Grid>
    );
}

function MyCell(props) {
    return (
        <Table.Cell>{props.value}</Table.Cell>
    );
}