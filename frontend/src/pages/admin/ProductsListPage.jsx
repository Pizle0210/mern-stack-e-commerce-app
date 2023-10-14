import { Container, Row, Col, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function ProductsListPage() {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const { userInfo } = useSelector((state) => state.auth);
  const [createProduct, { isLoading: loadingNewProduct }] =
    useCreateProductMutation();
  const deleteHandler = (id) => {
    console.log(id, "delete");
  };

  const createProductHandler = async () => {
    if (
      window.confirm(`${userInfo.name},A new product will be created. Do you want to proceed?`)
    ) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };
  return (
    <Container className="min-h-screen py-5 space-y-5">
      <Row className="flex items-center">
        <Col>
          <h1 className="text-xl">Products</h1>
        </Col>
        <Col className="flex justify-end">
          <button
            className="flex items-center px-2 p-1 gap-1 bg-blue-500 text-white rounded-sm hover:bg-blue-600 ease-in duration-150"
            onClick={createProductHandler}
          >
            <FaEdit />
            Create Products
          </button>
        </Col>
      </Row>
      {loadingNewProduct && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message className="alert alert-danger">{error}</Message>
      ) : (
        <Table striped hover borderless responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>PRICE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>#{product._id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>${product.price}</td>
                <td className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                  <LinkContainer to={`/admin/product/${product._id}`}>
                    <button className="px-2 p-1 shadow-md hover:scale-95 duration-150 transform transition-all rounded bg-yellow-300">
                      <FaEdit />
                    </button>
                  </LinkContainer>
                  <button
                    className="px-2 p-1 shadow-md hover:scale-95 duration-150 transform transition-all rounded bg-red-500"
                    onClick={() => {
                      deleteHandler(product._id);
                    }}
                  >
                    <FaTrash color="white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
