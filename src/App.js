import { HeroUIProvider } from '@heroui/system';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link
} from '@heroui/react';
import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import TablePage from './views/Table';
import CardsPage from './views/Cards';

import './index.css';
import './style.css';

function App() {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <div className='container'>
          <h1 className='text-center text-2xl py-4'>Mem directory</h1>
          <Navbar>
            <NavbarContent className='center-navbar'>
              <NavbarItem>
                <Link as={RouterLink} to='/'>Table</Link>
              </NavbarItem>
              <NavbarItem>
                <Link as={RouterLink} to='/cards'>Cards</Link>
              </NavbarItem>
            </NavbarContent>
          </Navbar>

          <Routes>
            <Route path='/' element={<TablePage />} />
            <Route path='/cards' element={<CardsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </HeroUIProvider>
  );
}

export default App;