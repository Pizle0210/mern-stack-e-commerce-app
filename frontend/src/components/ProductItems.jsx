import { Col, Container, Row } from "react-bootstrap";
import Product from "./Product";
import Message from "./Message";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import { Link, useParams } from "react-router-dom";
import Paginate from "./Paginate";
import ProductCarousel from "./ProductCarousel";
import Titles from "./Titles";

// Example after code:

export default function ProductItems() {
  const { pageNumber, keyword } = useParams();
  const { data, error, isLoading } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <Container className="">
      {isLoading ? (
        <Loader style={{ height: 70, width: 70 }} />
      ) : error?.data?.message ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <>
          <div>
            <h1 className="product__name">Latest Products</h1>
          </div>
          {!keyword ? (
            <ProductCarousel />
          ) : (
            <Link to="/" className="px-2 p-1 bg-blue-500 text-white rounded-sm">
              Back
            </Link>
          )}

          <Row className="overflow-hidden mt-3">
            {data.products.length > 0 &&
              data.products.map((product, index) => (
                <Col
                  key={`${product._id}-${index}`}
                  xs={12}
                  md={6}
                  lg={6}
                  xl={4}
                >
                  <Product product={product} className="text-red-500" />
                </Col>
              ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </Container>
  );
}
