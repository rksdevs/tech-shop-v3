import './App.css';
import Container from './components/Container';
import Footer from './components/Footer';
import { NavbarBottom } from './components/NavbarBottom';
import { NavbarMiddle } from './components/NavbarMiddle';
import { NavbarTop } from './components/NavbarTop';
import { Outlet } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="App overflow-hidden">
      <NavbarTop />
      <NavbarMiddle />
      <NavbarBottom />
      <Container>
        <Outlet />
      </Container>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
