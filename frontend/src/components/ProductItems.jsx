import { Col, Row } from "react-bootstrap";
import Product from "./Product";
import Message from "./Message";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";

// Example after code:

export default function ProductItems() {
  const { data: products, error, isLoading } = useGetProductsQuery();

  return (
    <div className="">
      {isLoading ? (
        <Loader style={{height:70,width:70}}/>
      ) : error?.data?.message ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <>
          <div>
            <h1 className="product__name">Latest Products</h1>
          </div>
          <Row className="overflow-hidden">
            {products.length > 0 &&
              products.map((product, index) => (
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
        </>
      )}
    </div>
  );
}
