import { useTable } from 'react-table'
import {useMemo, useEffect, useState, useGroupBy, useExpanded} from 'react';

const COLUMN_NAMES = ["athlete","age","country","sport","year","date","gold","silver","bronze","total",];

export function RtOlympicWinners() {

    const columns = useMemo( ()=>
            COLUMN_NAMES.map( columnName => ({
                id: columnName,
                Header: columnName,
                accessor: columnName
            })),
    []
    );

    const [data, setData] = useState([]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            initialState: { groupBy: ['country'] },
        }, useGroupBy, useExpanded);

    useEffect( ()=> {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => setData(data.slice(0,100)));
    }, []);

    return (
        <>
            <div>Olympic Winners</div>
            { /*apply the table props*/ }
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
        </>
    );
}