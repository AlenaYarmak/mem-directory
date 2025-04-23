import { useCallback, useState, useEffect, useRef } from 'react';
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
} from '@heroui/react';
import { Button } from '@heroui/button';
import data from '../data/memesMockData.json';
import table from '../data/tableView.json';
import isUrl from 'is-url';

const STORAGE_KEY = 'meme_data';

const CustomTable = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isInitialMount = useRef(true);
  const [editingItem, setEditingItem] = useState(null);

  const [dataState, setDataState] = useState(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData && parsedData.memes && Array.isArray(parsedData.memes)) {
          return parsedData;
        }
      }
    } catch (error) {
      console.error("Failed to load initial data from localStorage:", error);
    }
    return data;
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataState));
  }, [dataState]);

  const handleEdit = useCallback((item) => {
    setEditingItem({ ...item });
    onOpen();
  }, [onOpen]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name === 'url') {
      const validUrl = isUrl(value);
      if (!validUrl) {
        return;
      }
    }

    setEditingItem((prev) =>
      prev
        ? {
          ...prev,
          [name]: value,
        }
        : null
    );

  }, []);

  const handleClose = useCallback((onClose) => {
    setEditingItem(null);
    onClose();
  }, []);

  const handleSave = useCallback((onClose) => {
      if (!editingItem) return;

      setDataState((prev) => ({
        ...prev,
        memes: prev.memes.map((item) =>
          item.id === editingItem.id ? { ...editingItem } : item
        ),
      }));

      setEditingItem(null);
      onClose();
    },
    [editingItem]
  );

  const renderCell = useCallback((item, columnKey) => {
    if (columnKey === 'action') {
      return (
        <Button size='sm' color='primary' onPress={() => handleEdit(item)}>
          Edit
        </Button>
      );
    }
    return getKeyValue(item, columnKey);
  },[handleEdit]);

  return (
    <div className='max-w-5xl py-4 mx-auto'>
      <Table aria-label='table'>
        <TableHeader columns={table.columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={dataState.memes}>
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
              <ModalHeader className='flex flex-col gap-1'>Edit Meme</ModalHeader>
              <ModalBody>
                <Input
                  label='Name'
                  name='name'
                  value={editingItem?.name || ''}
                  onChange={handleInputChange}
                  fullWidth
                  className='mb-4'
                />
                <Input
                  label='URL'
                  name='url'
                  value={editingItem?.url}
                  onChange={handleInputChange}
                  fullWidth
                  className='mb-4'
                />
                <Input
                  label='Like Counter'
                  name='likeCounter'
                  type='number'
                  value={editingItem?.likeCounter}
                  onChange={handleInputChange}
                  fullWidth
                  className='mb-4'
                />
                <Input
                  isDisabled
                  label='ID'
                  name='id'
                  type='number'
                  value={editingItem?.id}
                  onChange={handleInputChange}
                  fullWidth
                  className='mb-4'
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={() => handleClose(onClose)}>
                  Cancel
                </Button>
                <Button color='primary' onPress={() => handleSave(onClose)}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CustomTable;
