import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Image,
  Breadcrumb,
  Form,
} from "react-bootstrap";
import { Rating } from "../components/Rating";
import Message from "../components/Message";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { useGetProductsDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";

export const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // items quantity
  const [qty, setQty] = useState(1);
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductsDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <Container className="my-5 min-h-screen">
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : !product ? (
        <div>No product data available</div>
      ) : (
        <>
          <Row className="mt-3 flex  bg-gray-300  rounded p-3">
            <Breadcrumb className="text-black font-normal mb-1">
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/cart">Cart</Breadcrumb.Item>
            </Breadcrumb>

            <Col md={6} className="">
              {product && (
                <Image
                  src={product.image}
                  alt={product.name}
                  className="mb-3 rounded-lg hover:lg:scale-100 transition-all transform duration-300 ease-in-out backdrop-sepia"
                />
              )}
            </Col>

            <Col md={6} className="font-semibold">
              <ListGroup className="rounded-lg mb-3" variant="flush">
                <ListGroup.Item className="">
                  <h4 className="text-xl ">{product && product.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item className="">
                  <Rating
                    value={product && product.rating}
                    text={`${product && product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="">
                  price: ${product && product.price}
                </ListGroup.Item>
                <ListGroup.Item className="text-sm">
                  {product && product.description}
                </ListGroup.Item>
                <ListGroup.Item className="">
                  <h4 className="">{product && product.brand}</h4>
                </ListGroup.Item>
                <ListGroup.Item className="flex space-x-2">
                  <h4 className="line-through text-red-500">
                    ${product && product.formerPrice}
                  </h4>
                  <h4 className="">${product && product.price}</h4>
                </ListGroup.Item>
              </ListGroup>

              <Col>
                <Card className=" overflow-hidden">
                  <ListGroup variant="flush" className="">
                    <ListGroup.Item>
                      <Row className="">
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product && product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Category:</Col>
                        <Col>
                          <strong className="text-ellipsis overflow-hidden whitespace-nowrap">
                            {product && product.category}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <strong className="text-ellipsis overflow-hidden whitespace-nowrap">
                            {product && product.countInStock > 0
                              ? "in stock"
                              : "out of stock"}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item className="">
                        <Row className="">
                          <Col className="flex">
                            <h4 className="flex items-center">Qty:</h4>
                          </Col>
                          <Col>
                            <Form.Control
                              as="select"
                              id="selectQty"
                              value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                              className="w-20 sm:w-20 h-9 my-1 text-black border-black focus:border-none rounded focus:ring-1 focus:ring-black"
                              required
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option
                                    value={x + 1}
                                    key={x + 1}
                                    className=""
                                  >
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item className="flex justify-center ">
                      {product.countInStock > 0 ? (
                        <button
                          className="cart-btn disabled"
                          type="button"
                          role="button"
                          onClick={addToCartHandler}
                        >
                          Add To Cart
                        </button>
                      ) : null}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
