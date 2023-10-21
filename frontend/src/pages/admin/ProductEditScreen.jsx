import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import {
  useUpdateProductMutation,
  useGetProductsDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

export default function ProductEditScreen() {
  const { id: productId } = useParams("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [formerPrice, setFormerPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [rating, setRating] = useState(0);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductsDetailsQuery(productId);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: imgUploadLoading }] =
    useUploadProductImageMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setFormerPrice(product.formerPrice);
      setPrice(product.price);
      setCategory(product.category);
      setImage(product.image);
      setCountInStock(product.countInStock);
      setNumReviews(product.numReviews);
      setBrand(product.brand);
      setRating(product.rating);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      formerPrice,
      category,
      description,
      brand,
      image,
      numReviews,
      countInStock,
      rating,
    };
    try {
      const result = await updateProduct(updatedProduct);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Product Updated");
        navigate("/admin/productlist");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image',e.target.files[0]);
      try {
        const response = await uploadProductImage(formData).unwrap()
        toast.success(response.message);
        setImage(response.image);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
  };


  return (
    <Container className="py-5 min-h-screen backdrop-blur-lg">
      <Link to="/admin/productlist" className="back-link">
        Back
      </Link>
      <div className="mt-4 flex justify-center">
        <div className="w-full md:w-[600px]">
          <h1 className="text-slate-500 font-semibold mb-3 text-2xl">
            Edit Product
          </h1>
          <div className="">
            {isUpdating || isLoading ? <Loader /> : null}
            {error ? (
              <Message className="alert alert-danger">{error}</Message>
            ) : (
              <form
                encType="multipart/form-data"
                className="space-y-3 "
                onSubmit={submitHandler}
              >
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="update-product__input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Description</label>
                  <input
                    type="text"
                    placeholder="Description"
                    className="update-product__input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label>Former Price</label>
                  <input
                    type="number"
                    placeholder="Former price"
                    className="update-product__input"
                    value={formerPrice}
                    onChange={(e) => setFormerPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    className="update-product__input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label>Brand</label>
                  <input
                    type="text"
                    placeholder="Brand"
                    className="update-product__input"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="Category"
                    className="update-product__input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div>
                  <label>Count in stock</label>
                  <input
                    type="number"
                    placeholder="Count in stock"
                    className="update-product__input"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </div>
                <div>
                  <label>Num. Review</label>
                  <input
                    type="number"
                    placeholder="Num of reviews"
                    className="update-product__input"
                    value={numReviews}
                    onChange={(e) => setNumReviews(e.target.value)}
                  />
                </div>
                <div>
                  <label>Rating</label>
                  <input
                    type="number"
                    placeholder="Rating"
                    className="update-product__input"
                    max={5}
                    min={0}
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
                <div>
                  {/* <input
                    type="text"
                    id="image"
                    placeholder="IMG URL"
                    className="update-product__input"
                    value={image}
                    onChange={(e) => setImage}
                  /> */}
                  <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter URL"
                      value={image||''}
                      onChange={(e) => setImage}
                    ></Form.Control>
                    <Form.Control
                      type="file"
                      label="Choose File"
                      onChange={uploadFileHandler}
                    ></Form.Control>
                  </Form.Group>
                  {/* <input
                    type="file"
                    onChange={uploadFileHandler}
                    accept="image/*"
                  /> */}
                </div>
                <div>
                  <button className="update-button" disabled={isUpdating}>
                    {isUpdating ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
