import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useGetTopRatedProductsQuery } from "../slices/productsApiSlice";
import Message from "./Message";
import { Carousel, Image } from "react-bootstrap";

export default function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopRatedProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message className="alert alert-danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className=" mb-4 ">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} className="w-full h-[300px]  md:h-[600px] aspect-square" />
            <Carousel.Caption className="bg-slate-500/90 text-white font-bold">
              <h2>
                {product.name}(${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
