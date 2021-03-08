import React, {useMemo} from 'react';
import {useTable, useBlockLayout, useResizeColumns} from 'react-table';
import {ROW_COUNT} from "./boardEffect";

export function RtDashboard(props) {

    // const data = useMemo(
    //     () => [
    //         {
    //             col1: 'Hello',
    //             col2: 'World',
    //         },
    //         {
    //             col1: 'react-table',
    //             col2: 'rocks',
    //         },
    //         {
    //             col1: 'whatever',
    //             col2: 'you want',
    //         },
    //     ],
    //     []
    // );

    // const columns = React.useMemo(
    //     () => [
    //         {
    //             Header: 'Column 1',
    //             accessor: 'col1', // accessor is the "key" in the data
    //         },
    //         {
    //             Header: 'Column 2',
    //             accessor: 'col2',
    //         },
    //     ],
    //     []
    // );

    const columns = React.useMemo( ()=> {
        return Array(ROW_COUNT).fill(0).map( (ignore, index) => ({
            Header: index,
            // accessor: 'row' + index
            id: '' + index,
            accessor: (data) => {
                const row = data['row' + index];
                const res = row.reduce( ((a ,b) => a + b), 0);
                return res;
            },
            width: 50,
            // resizable: true,
            // cellRenderer: 'myCellRenderer'
        }));
    }, []);

    const tableInstance = useTable(
        { columns, data: props.rowData },
        useBlockLayout,
        useResizeColumns
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        // apply the table props
        <table {...getTableProps()} className={'t-react-grid'}>
            <thead>
            {// Loop over the header rows
                headerGroups.map(headerGroup => (
                    // Apply the header row props
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {// Loop over the headers in each row
                            headerGroup.headers.map(column => (
                                // Apply the header cell props
                                <th {...column.getHeaderProps()}>
                                    {// Render the header
                                        column.render('Header')}
                                </th>
                            ))}
                    </tr>
                ))}
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()} className={'t-react-grid-body'}>
            {// Loop over the table rows
                rows.map(row => {
                    // Prepare the row for display
                    prepareRow(row)
                    return (
                        // Apply the row props
                        <tr {...row.getRowProps()}>
                            {// Loop over the rows cells
                                row.cells.map(cell => {
                                    // Apply the cell props
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {// Render the cell contents
                                                cell.render('Cell')}
                                        </td>
                                    )
                                })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}