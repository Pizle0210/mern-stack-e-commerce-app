import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Form,
  Button,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";

export const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {cartItems} = useSelector((state) => state.cart);
  
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // const checkoutHandler=()=>{
  //   navigate('/login?redirect=/shipping')
  // }


  return (
    <Container className="min-h-[100dvh] py-5">
      <h1 className="bg-gradient-to-tl from-blue-500 to-slate-500 min-w-max p-2 ps-3 font-serif text-white mb-4 text-4xl font-medium">
        Your Carts
      </h1>
      {cartItems.length > 0 && (
        <Link to="/">
          <button className="bg-slate-500 px-2 p-1 text-white mb-3 rounded-sm hover:bg-slate-900 hover:scale-95 shadow-inner hover:shadow-slate-100 duration-200">
            back
          </button>
        </Link>
      )}
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message className="bg-red-400 w-[500px] border-none text-white p-1 rounded-none px-3">
              Cart is empty. please
              <Link
                to="/"
                className="mx-2 underline underline-offset-auto text-gray-900 hover:text-gray-600"
              >
                go back
              </Link>
              to select items
            </Message>
          ) : (
            <ListGroup variant="flush" className="space-y-2">
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item._id}
                  className="bg-[hsl(0,0%,0%,.09)] "
                >
                  <Row className="space-y-1">
                    <Col md={3}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded-md"
                      />
                    </Col>
                    <Col md={3} className="flex items-center">
                      <Link to={`/product/${item._id}`} className="underline">
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2} className="flex items-center">
                      ${item.price}
                    </Col>
                    <Col md={2} className="flex items-center">
                      <Form.Control
                        as="select"
                        id="selectQty"
                        value={item.qty}
                        onChange={(e) => {
                          addToCartHandler(item, Number(e.target.value));
                        }}
                        className="appearance-none w-16 h-9 mb-1 text-black focus:border-gray-500 rounded focus:ring-1 focus:ring-gray-500"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col className="flex items-center">
                      <Button
                        className="border-none rounded-sm p-1 bg-red-400 hover:bg-red-500 duration-100"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash className="text-white" size={18} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup variant="flush" className="space-y-0">
            <ListGroup.Item>
              <h3 className="font-semibold ">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h3>
              <small className="text-sm font-extralight">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </small>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="bg-blue-500 md:flex shadow-md rounded-none"
                disabled={cartItems.length === 0}
                onClick={() => navigate("/login?redirect=/shipping")}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
