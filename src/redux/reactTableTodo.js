import React, {useCallback} from "react";

import {useTable} from "react-table";
import {useDispatch, useSelector} from "react-redux";


export function ReactTableTodo(params) {

    const todos = useSelector( state => state.todos );
    const dispatch = useDispatch();

    const onCellClicked = useCallback( cell => {
        if (cell.column.id==='complete') {
            const data = cell.row.original;
            dispatch({type: 'setComplete', payload: {id: data.id, value: !data.complete}});
        }
    } );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Complete',
                accessor: 'complete',
                Cell: props => <>{props.value ? '\u2714' : '\u2716'}</>
            },
            {
                Header: 'Description',
                accessor: 'description', // accessor is the "key" in the data
            }
        ],
        []
    );

    const tableInstance = useTable({ columns, data: todos });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        // apply the table props
        <table {...getTableProps()}>
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
            <tbody {...getTableBodyProps()}>
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
                                        <td {...cell.getCellProps()} onClick={()=>onCellClicked(cell)}>
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