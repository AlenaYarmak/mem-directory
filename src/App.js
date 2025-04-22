import { HeroUIProvider } from "@heroui/system";
import Table from './components/CustomTable';
import CardsList from "./components/CardsList";
import './index.css';
import './style.css';

function App() {
  return (
    <HeroUIProvider>
      <div className='App'>
        <h1>Mem directory</h1>
        <Table />
        <CardsList />
      </div>
    </HeroUIProvider>
  );
}

export default App;