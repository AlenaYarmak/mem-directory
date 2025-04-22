import { HeroUIProvider } from '@heroui/system';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link
} from '@heroui/react';
import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import Table from './components/CustomTable';
import CardsList from './components/CardsList';
import TablePage from './views/Table';
import CardsPage from './views/Cards';

import './index.css';
import './style.css';

function App() {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <div className='App'>
          <h1>Mem directory</h1>
          <Navbar>
            <NavbarContent justify='center'>
              <NavbarItem>
                <Link as={RouterLink} to='/table'>Table</Link>
              </NavbarItem>
              <NavbarItem>
                <Link as={RouterLink} to='/cards'>Cards</Link>
              </NavbarItem>
            </NavbarContent>
          </Navbar>

          <Routes>
            <Route path='/table' element={<TablePage />} />
            <Route path='/cards' element={<CardsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </HeroUIProvider>
  );
}

export default App;