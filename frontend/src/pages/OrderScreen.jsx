import { useEffect } from "react";
import { Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import Loader from "../components/Loader";

export default function OrderScreen() {
  const { id: orderId } = useParams();
  const {
    data: order,
    error,
    isLoading,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  //paypal
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!error && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        payPalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        payPalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, payPalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, action) {
    return action.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success(`Payment Successful`);
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalAmount,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const deliveredHandler = async () => {
    try {
        await deliverOrder(orderId);
        refetch()
        toast.success("Order Delivered");
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred.");
    }
  };

  return (
    <Container className="min-h-screen py-5">
      {isLoading ? (
        <Loader />
      ) : error?.data?.message ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <>
          <h1 className="mb-2 text-xl">Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush" className="rounded space-y-3">
                <ListGroup.Item className="space-y-2">
                  <h1 className="text-xl text-black font-semibold mb-2">
                    Shipping
                  </h1>
                  <p className="text-gray-500 text-base font-semibold">
                    <strong>Name: </strong>
                    {order.user.name}
                  </p>
                  <p className="text-gray-500 text-base font-semibold">
                    <strong>Email: </strong>
                    {order.user.email}
                  </p>
                  <p className="text-gray-500 text-base font-bold mb-2">
                    <strong>Address: </strong>
                    {order.shippingAddress.address}.{order.shippingAddress.city}
                    ,{order.shippingAddress.zipCode}.
                    {order.shippingAddress.country}.
                  </p>
                  {order.isDelivered ? (
                    <Message className="alart alert-success">
                      Delivered on {order.deliveredOn.substring(0,10)}
                    </Message>
                  ) : (
                    <Message className="alert alert-danger bg-red-400">
                      Not Delivered
                    </Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2 className="text-xl text-black font-semibold mb-2">
                    Payment Method
                  </h2>
                  <p className="text-gray-500 text-base font-bold">
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message className="alart alert-success">
                      Paid on {order.paidAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message className="alert alert-danger bg-red-400">
                      Not Paid
                    </Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2 className="text-xl text-black font-semibold mb-2">
                    Order Items
                  </h2>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="flex items-center">
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} />
                        </Col>
                        <Col md={4}>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={6} className="font-bold">
                          {item.qty} x {item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h1 className="text-lg font-semibold">Order Summary</h1>
                  </ListGroup.Item>
                  <ListGroup.Item className="space-y-2  ">
                    <Row className="text-gray-500">
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                    <Row className="text-gray-500">
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                    <Row className="text-gray-500">
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                    <hr />
                    <Row className="text-black font-bold">
                      <Col>Total</Col>
                      <Col>${order.totalAmount}</Col>
                    </Row>
                  </ListGroup.Item>

                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {isPending ? (
                        <Loader />
                      ) : (
                        <div className=" space-y-2">
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        </div>
                      )}
                    </ListGroup.Item>
                  )}

                  {/* MARK AS DELIVERED PLACEHOLDER */}
                  {loadingDeliver && <Loader />}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <button
                          type="button"
                          className="px-2 p-2 bg-blue-500 text-white hover:scale-95 hover:shadow-md rounded"
                          onClick={deliveredHandler}
                        >
                          Mark As Delivered
                        </button>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
