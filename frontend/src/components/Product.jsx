import { Card } from "react-bootstrap";
import { twMerge } from "tailwind-merge";
import { Rating } from "./Rating";
import { Link } from "react-router-dom";

export default function Product({ product, className }) {
  return (
    <Card className="my-2 p-2 overflow-hidden rounded hover:shadow-md hover:shadow-[#837c7c] hover:-translate-y-2 transform transition-all ease-in duration-150">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image || "default-image.jpg"}
          alt={product.name}
          variant="top" 
          className="lg:w-full sm:h-[300px]  hover:shadow-2xl hover:scale-105 transition-all transform duration-100 ease-in-out backdrop-sepia"
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title
            as="div"
            className="h-[2.5rem] whitespace-nowrap overflow-hidden text-ellipsis"
          >
            <strong className="underline ">{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" className="">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            
          />
        </Card.Text>

        <div className="flex gap-1">
          <Card.Text as="h3" className="line-through font-medium">
            ${product.formerPrice}
          </Card.Text>
          <Card.Text as="h3" className={twMerge(` font-extrabold`, className)}>
            ${product.price}
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}
