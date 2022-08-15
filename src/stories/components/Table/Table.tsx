import type { ReactElement } from 'react'
import { useTable } from 'react-table'

/**
 * There's some boilter plate here
 * Important part is useTable function
 * we add the useGlobalFilter hook
 * then we also add an input which has
 * onChange={handleFilterInputChange}
 * */

/*interface TableProps<T extends object> {
	columns: Column<T>[];
	data: T[];
}*/

// @ts-ignore
export function Table({ columns, data }): ReactElement {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
