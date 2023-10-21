import { Container, Row, Col, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import {
  useCreateProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";

export default function ProductsListPage() {
  const {pageNumber} = useParams()
  const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber});

  const { userInfo } = useSelector((state) => state.auth);
  const [createProduct, { isLoading: loadingNewProduct }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (
      window.confirm(`This product will be deleted.Click "ok" to proceed`)
    ) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted')
        refetch();
      } catch (error) {
        toast.error("could not delete file");
      }
    }
  };

  const createProductHandler = async () => {
    if (
      window.confirm(
        `${userInfo.name},A new product will be created. Do you want to proceed?`
      )
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
      {loadingDelete && <Loader />}
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
            {data.products.map((product) => (
              <tr key={product._id}>
                <td>#{product._id.substring(0, 15)}</td>
                <td>{product.name.substring(0, 20)}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>${product.price}</td>
                <td className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
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
      {/* <Paginate pages={data.pages} page={data.page} isAdmin={true} /> */}
    </Container>
  );
}
