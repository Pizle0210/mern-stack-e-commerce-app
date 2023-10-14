import { Container, Table } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

export default function OrderListScreen() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders);
  return (
    <Container className="min-h-screen py-5">
      <h1 className="text-lg mb-3">Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table striped responsive hover borderless className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>$ {order.totalAmount}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes color="red" />
                  )}
                </td>
                <td>
                  {order.deliveredOn ? (
                    order.deliveredOn.substring(0, 10)
                  ) : (
                    <FaTimes color="red"/>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <button className="px-2 p-1 shadow-md hover:scale-95 duration-150 transform transition-all rounded bg-blue-500 font-thin text-white">check</button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
