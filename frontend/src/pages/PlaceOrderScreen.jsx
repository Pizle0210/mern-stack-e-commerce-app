import { useEffect } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import Message from "../components/Message";

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart?.cartItems,
        shippingAddress: cart?.shippingAddress,
        paymentMethod: cart?.paymentMethod,
        itemsPrice: cart?.itemsPrice,
        shippingPrice: cart?.shippingPrice,
        taxPrice: cart?.taxPrice,
        totalAmount: cart?.totalAmount,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Container className="h-screen py-5">
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1 className="text-lg font-bold text-green-700">Shipping</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                {cart.shippingAddress.address},{cart.shippingAddress.city};
                {cart.shippingAddress.zipCode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="">Payment Method</h2>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="mb-3 font-semibold text-base">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message className="alert alert-danger">
                  Your cart is empty
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item,index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <img src={item.image} alt={item.name} />
                        </Col>
                        <Col className="flex items-center">
                          <Link
                            className="underline hover:underline-offset-2"
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} className="flex items-center">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="shadow-2xl">
            <ListGroup variant="flush" className="space-y-2">
              <ListGroup.Item>
                <h2 className="text-2xl">Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{cart.cartItems.length > 0 && cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="font-bold">Total:</Col>
                  <Col className="font-bold">
                    {cart.cartItems.length > 0 && cart.totalAmount}
                  </Col>
                </Row>
              </ListGroup.Item>
              
              <ListGroup.Item>
                <button
                  className="px-2 p-2 bg-green-500 hover:bg-green-600 hover:shadow-inner shadow-lg transform transition-all ease-in-out duration-150 hover:scale-95 text-white font-bold"
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
