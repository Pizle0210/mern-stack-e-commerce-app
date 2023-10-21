import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingProfile }] = useProfileMutation();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(`Password do not match`);
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success(`Profile updated successfully`);
      } catch (error) {
        if (error?.data?.message) {
          toast.error(error.data.message);
        } else {
          toast.error(error.error);
        }
      }
    }
  };

  return (
    <Container className="min-h-screen py-5">
      <Row>
        <Col md={3} className="space-y-2">
          <h1 className="text-2xl font-bold">User Profile</h1>
          <Form className="space-y-2" onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label className="mb-1">Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter name"
                className="w-full border-gray-300 rounded-md shadow-md focus:border-none ring-1 ring-orange-300 focus:ring-orange-600"
                onChange={(e) => setName(e.target.value)}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-1">Email</Form.Label>
              <Form.Control
                value={email}
                placeholder="Enter Email"
                className="w-full border-gray-300 rounded-md shadow-md focus:border-none ring-1 ring-orange-300 focus:ring-orange-600"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-1">Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                className="w-full border-gray-300 rounded-md shadow-md focus:border-none ring-1 ring-orange-300 focus:ring-orange-600"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mb-1">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                className="w-full border-gray-300 rounded-md shadow-md focus:border-none ring-1 ring-orange-300 focus:ring-orange-600"
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>
            <button
              className="px-2 p-2 rounded-sm mt-3 shadow  bg-orange-500 text-white font-medium transform transition-all hover:bg-orange-600 duration-150 ease-out hover:scale-95"
              type="submit"
            >
              Update
            </button>
            {loadingProfile && <Loader />}
          </Form>
        </Col>
        <Col md={9}>
          <h2 className="mb-2 text-2xl md:text-center font-bold">My Orders</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message className="alert alert-danger bg-red-300"></Message>
          ) : (
            <Table striped hover responsive borderless className="table-sm">
              <thead>
                <tr className="">
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="">{order._id.substring(0, 20)}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalAmount}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes color="red" />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredOn.substring(0, 10)
                      ) : (
                        <FaTimes color="red" />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <button className="px-2 p-1 shadow-md hover:scale-95 duration-150 transform transition-all rounded bg-blue-500 font-thin text-white">
                          check
                        </button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}
