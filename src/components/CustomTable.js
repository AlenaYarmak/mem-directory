import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue
} from '@heroui/react';
import data from '../data/memesMockData.json';
import table from '../data/tableView.json';

const CustomTable = () => {
    return (
        <Table aria-label='table'>
            <TableHeader columns={table.columns}>
                {(column) =>
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                }
            </TableHeader>
            <TableBody items={data.memes}>
                {(item) => (
                    <TableRow key={item.key}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default CustomTable;