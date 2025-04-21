import { useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input
} from "@heroui/react";
import { Button } from "@heroui/button";
import data from "../data/memesMockData.json";
import table from "../data/tableView.json";

const CustomTable = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = useCallback((item) => {
    setEditingItem({ ...item });
    onOpen();
  }, [onOpen]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditingItem((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : null
    );
    
    console.log(name);
    console.log(value);
  }, []);

  const handleClose = useCallback(() => {
    setEditingItem(null);
  }, [])

  const renderCell = useCallback((item, columnKey) => {
    if (columnKey === "action") {
      return (
        <Button size="sm" color="primary" onPress={() => handleEdit(item)}>
          Edit
        </Button>
      );
    }
    return getKeyValue(item, columnKey);
  });

  return (
    <>
      <Table aria-label="table">
        <TableHeader columns={table.columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data.memes}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader>Edit</ModalHeader>
                    <ModalBody></ModalBody>
                    <Input
            label="Name"
            name="name"
            value={editingItem?.name || ''}
            onChange={handleInputChange}
            fullWidth
            className="mb-4"
          />
                </>
            )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomTable;
