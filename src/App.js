import { HeroUIProvider } from "@heroui/system";
import Table from './components/CustomTable';
import {Button} from '@heroui/button';
import './index.css';

function App() {
  return (
    <HeroUIProvider>
      <div className='App'>
        <h1>Mem directory</h1>
        <Table />
        <Button color='primary'>Button</Button>
      </div>
    </HeroUIProvider>
  );
}

export default App;