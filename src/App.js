import { HeroUIProvider } from "@heroui/system";
import Table from './components/CustomTable';
import './index.css';

function App() {
  return (
    <HeroUIProvider>
      <div className='App'>
        <h1>Mem directory</h1>
        <Table />
      </div>
    </HeroUIProvider>
  );
}

export default App;