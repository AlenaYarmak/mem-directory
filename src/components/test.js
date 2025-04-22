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
  Input,
} from '@heroui/react';
import { Button } from '@heroui/button';
import defaultData from '../data/memesMockData.json';
import table from '../data/tableView.json';

// Use a more unique key to avoid conflicts
const STORAGE_KEY = 'custom_meme_data_v1';

const CustomTable = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const initialLoadCompleted = useRef(false);
  const debugInfoRef = useRef({
    loadAttempts: 0,
    saveAttempts: 0,
    errors: []
  });
  
  // Initialize state with default data first
  const [dataState, setDataState] = useState(defaultData);
  const [debugInfo, setDebugInfo] = useState({
    storageAvailable: false,
    lastStoredData: null,
    lastError: null
  });
  
  const [editingItem, setEditingItem] = useState(null);

  // Check if localStorage is available
  const isStorageAvailable = () => {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Load data from localStorage on mount only
  useEffect(() => {
    if (initialLoadCompleted.current) return;
    
    try {
      debugInfoRef.current.loadAttempts++;
      
      // Check if localStorage is available
      if (!isStorageAvailable()) {
        setDebugInfo(prev => ({ 
          ...prev, 
          storageAvailable: false,
          lastError: "localStorage is not available" 
        }));
        return;
      }
      
      setDebugInfo(prev => ({ ...prev, storageAvailable: true }));
      
      // Try to get data
      const storedData = localStorage.getItem(STORAGE_KEY);
      setDebugInfo(prev => ({ 
        ...prev, 
        lastStoredData: storedData ? storedData.substring(0, 50) + "..." : "No data found" 
      }));
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log("Loaded data:", parsedData);
        
        // Validate and use data
        if (parsedData && parsedData.memes && Array.isArray(parsedData.memes) && parsedData.memes.length > 0) {
          setDataState(parsedData);
          console.log("Successfully loaded data from localStorage");
        } else {
          console.warn("Invalid data structure in localStorage");
          setDebugInfo(prev => ({ 
            ...prev, 
            lastError: "Invalid data structure in localStorage" 
          }));
        }
      } else {
        console.log("No data in localStorage, using default data");
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      debugInfoRef.current.errors.push(`Load error: ${error.message}`);
      setDebugInfo(prev => ({ 
        ...prev, 
        lastError: `Error loading: ${error.message}` 
      }));
    } finally {
      initialLoadCompleted.current = true;
    }
  }, []);

  // Save to localStorage whenever dataState changes
  useEffect(() => {
    if (!initialLoadCompleted.current) return; // Skip initial render
    
    try {
      debugInfoRef.current.saveAttempts++;
      
      if (!isStorageAvailable()) {
        console.error("localStorage is not available for saving");
        return;
      }
      
      if (dataState && dataState.memes && dataState.memes.length > 0) {
        const dataToStore = JSON.stringify(dataState);
        localStorage.setItem(STORAGE_KEY, dataToStore);
        console.log('Saved data to localStorage:', dataState);
        setDebugInfo(prev => ({ 
          ...prev, 
          lastStoredData: dataToStore.substring(0, 50) + "..." 
        }));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      debugInfoRef.current.errors.push(`Save error: ${error.message}`);
      setDebugInfo(prev => ({ 
        ...prev, 
        lastError: `Error saving: ${error.message}` 
      }));
    }
  }, [dataState]);

  const handleEdit = useCallback(
    (item) => {
      setEditingItem({ ...item }); // Immutable copy
      onOpen();
    },
    [onOpen]
  );

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditingItem((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === 'likeCounter' ? Number(value) : value,
          }
        : null
    );
  }, []);

  const handleSave = useCallback(
    (onClose) => {
      if (!editingItem) return;

      // Create a new copy of the data state to ensure React detects the change
      setDataState((prev) => {
        const updatedMemes = prev.memes.map((item) =>
          item.id === editingItem.id ? { ...editingItem } : item
        );
        
        return {
          ...prev,
          memes: updatedMemes
        };
      });

      setEditingItem(null);
      onClose();
    },
    [editingItem]
  );

  const handleClose = useCallback(
    (onClose) => {
      setEditingItem(null);
      onClose();
    },
    []
  );

  const renderCell = useCallback(
    (item, columnKey) => {
      if (columnKey === 'action') {
        return (
          <Button size="sm" color="primary" onPress={() => handleEdit(item)}>
            Edit
          </Button>
        );
      }
      return getKeyValue(item, columnKey);
    },
    [handleEdit]
  );

  // Debugging functions
  const checkLocalStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      console.log('Current localStorage:', stored ? JSON.parse(stored) : 'No data');
      alert(stored ? 'Data found in localStorage! Check console.' : 'No data in localStorage');
    } catch (e) {
      console.error('Error checking localStorage:', e);
      alert(`Error checking localStorage: ${e.message}`);
    }
  };

  const forceReload = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setDataState(parsed);
        alert('Manually reloaded data from localStorage!');
      } else {
        alert('No data found in localStorage to reload');
      }
    } catch (e) {
      alert(`Error reloading: ${e.message}`);
    }
  };

  const clearStorageAndReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setDataState(defaultData);
      alert('Storage cleared and reset to default data');
    } catch (e) {
      alert(`Error clearing storage: ${e.message}`);
    }
  };

  const showDebuggingInfo = () => {
    const info = {
      storageAvailable: debugInfo.storageAvailable,
      lastStoredData: debugInfo.lastStoredData,
      lastError: debugInfo.lastError,
      loadAttempts: debugInfoRef.current.loadAttempts,
      saveAttempts: debugInfoRef.current.saveAttempts,
      errors: debugInfoRef.current.errors,
      dataStateSnapshot: {
        memeCount: dataState?.memes?.length || 0,
        firstMemeName: dataState?.memes?.[0]?.name || 'N/A'
      }
    };
    
    console.log('Debug Info:', info);
    alert(`Debug info logged to console. Meme count: ${info.dataStateSnapshot.memeCount}`);
  };

  return (
    <>
      <Table aria-label="table">
        <TableHeader columns={table.columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={dataState.memes}>
          {(item) => (
            <TableRow key={item.id || item.key}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* Debug panel */}
      <div className="mt-4 p-4 border border-gray-200 rounded">
        <h3 className="text-lg font-bold mb-2">Debug Tools</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" color="secondary" onClick={checkLocalStorage}>
            Check localStorage
          </Button>
          <Button size="sm" color="secondary" onClick={forceReload}>
            Force Reload from Storage
          </Button>
          <Button size="sm" color="warning" onClick={clearStorageAndReset}>
            Clear Storage & Reset
          </Button>
          <Button size="sm" color="info" onClick={showDebuggingInfo}>
            Show Debug Info
          </Button>
        </div>
      </div>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Meme</ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  name="name"
                  value={editingItem?.name || ''}
                  onChange={handleInputChange}
                  fullWidth
                  className="mb-4"
                />
                <Input
                  label="URL"
                  name="url"
                  value={editingItem?.url || ''}
                  onChange={handleInputChange}
                  fullWidth
                  className="mb-4"
                />
                <Input
                  label="Like Counter"
                  name="likeCounter"
                  type="number"
                  value={editingItem?.likeCounter || 0}
                  onChange={handleInputChange}
                  fullWidth
                  className="mb-4"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => handleClose(onClose)}>
                  Cancel
                </Button>
                <Button color="primary" onPress={() => handleSave(onClose)}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomTable;