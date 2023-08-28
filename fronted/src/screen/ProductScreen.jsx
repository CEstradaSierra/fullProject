import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Col, ListGroup, Row, Badge, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';
//creo la funcion recducer para manejar el estado de solicitud de datos
const reducer = (state, action) => {
  //defino el switch y los casos para el manejo del estado
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const ProductScreen = () => {
  const navigate = useNavigate();
  //llamo al hook use reducer
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  const params = useParams();
  const { slug } = params;
  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(
          `http://localhost:5000/api/products/slug/${slug}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(error) });
      }
      //setProducts(result.data);
    };
    fetchData();
  }, [slug]);

  //duncion add context
  const { state, dispatch: ctxDispatch } = useContext(Store);
  //descostruye el objeto state
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItems = cart.cartItems.find((item) => item._id === product._id);
    //verificar si existe, si existe sumo 1, sino sdumo el primero
    const quantity = existItems ? existItems.quantity + 1 : 1;
    //hago una peticion axios
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${product._id}`
    );
    //console.log(existItems, cart.cartItems);
    //verifico el count in stock con la cantidad añadida
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="img-large" src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        onClick={addToCartHandler}
                        variant="primary"
                        style={{
                          backgroundColor: '#f0c040',
                          color: 'black',
                          fontWeight: 'bold',
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
