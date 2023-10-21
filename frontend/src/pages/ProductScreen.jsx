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
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import {
  useCreateReviewMutation,
  useGetProductsDetailsQuery,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import Titles from "../components/Titles";
import { PRODUCTS_URL } from "../store/constants";

export const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // items quantity
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: product,
    error,
    refetch,
    isLoading,
  } = useGetProductsDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductRev, error: reviewError }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  console.log(product);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || comment === "") {
      return;
    }
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap()
      refetch();
      toast.success("Review is submitted");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Container className="my-5 min-h-screen">
      {isLoading ? (
        <Loader />
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

          <Row className="py-3 grid grid-flow-row ">
            <div className="lg:w-2/3">
              <h1 className="text-2xl mb-2 font-bold">Reviews</h1>
              {product.reviews.length === 0 && (
                <Message className="alert alert-info text-black">
                  No Reviews
                </Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="space-y-1">
                  <h3 className="text-xl font-semibold border-gray-500 border-b">
                    Leave A Review
                  </h3>
                  {loadingProductRev && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="rating">
                        <Form.Label className="text-lg">Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                          className="rounded-none ring-1 w-2/6 border-black shadow-none mb-5"
                        >
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <button className="p-2 px-2 bg-blue-500 mt-2 rounded-md hover:shadow-xl hover:shadow-slate-900/10 text-white hover:scale-95">
                        Submit
                      </button>
                    </Form>
                  ) : (
                    <Message className="alert alert-warning text-black rounded-none">
                      Please 
                      <Link to="/login" className="underline">
                        sign in
                      </Link> 
                      to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Row>
        </>
      )}
    </Container>
  );
};
