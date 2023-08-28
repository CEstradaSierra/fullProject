//import './App.css';
import './style.css';
import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import { Badge } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screen/CartScreen';
function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <NavBar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <NavBar.Brand>Camilo Store</NavBar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </NavBar>
          {/* <Link to="/">Camilo Store</Link> */}
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
