import { useCallback, useState } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue
} from '@heroui/react';
import { Button } from "@heroui/button";
import data from '../data/memesMockData.json';
import table from '../data/tableView.json';

const CustomTable = () => {

    const [editingItem, setEditingItem] = useState(null);

    const handleEdit = useCallback((item) => {
        setEditingItem({ ...item });
      }, []);

    const renderCell = useCallback((item, columnKey) => {
        if (columnKey === 'action') {
            return (
              <Button
                size="sm"
                color="primary"
                onClick={() => handleEdit(item)}
              >
                Edit
              </Button>
            );
          }
          return getKeyValue(item, columnKey);
    })

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
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default CustomTable;