import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useContext } from 'react';
import { Store } from '../Store';
import axios from 'axios';

const Product = ({ product }) => {
  //navigate
  const navigate = useNavigate();
  //uso el contexto
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  //creo la funcion para el boton
  const addCartHandler = async (item) => {
    const existItems = cart.cartItems.find((item) => item._id === product._id);
    //verificar si existe, si existe sumo 1, sino sdumo el primero
    const quantity = existItems ? existItems.quantity + 1 : 1;
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${item._id}`
    );
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="product d-flex flex-column">
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{ minHeight: '350px' }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variante="ligth " disabled>
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={() => addCartHandler(product)}
            className="mt-auto"
            style={{ backgroundColor: '#f0c040', color: 'black' }}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
