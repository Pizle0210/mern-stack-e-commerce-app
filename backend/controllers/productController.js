import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

/**
 * Retrieves all products from the database.
 *
 * @param {object} req - The request object containing information about the HTTP request.
 * @param {object} res - The response object used to send the HTTP response.
 * @returns {Promise<Array>} - An array of products retrieved from the database, returned as a JSON response with a status code of 200.
 */
const getProducts = asyncHandler(async (req, res) => {
  // pagination and search
  const pageContent = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  // search
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({...keyword});

  const products = await Product.find({...keyword})
    .limit(pageContent)
    .skip(pageContent * (page - 1));
  res
    .status(200)
    .json({ products, page, pages: Math.ceil(count / pageContent) });
});

/**
 * Retrieves a product by its ID from the database and sends a JSON response.
 * If the product is found, it sends a JSON response with the product data and a status code of 200.
 * If the product is not found, it sends a JSON response with an error message and a status code of 400.
 * If an error occurs during the execution of the function, it sends a JSON response with an internal server error message and a status code of 500.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
const getProductById = asyncHandler(async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findById(productId);
    product
      ? res.status(200).json(product)
      : res.status(400).json({ error: `data not found` });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error` });
  }
});

/**
 * Creates a new product and saves it to the database.
 * @param {Object} req - The request object containing information about the HTTP request.
 * @param {Object} res - The response object used to send a response back to the client.
 * @returns {Promise<void>} - A promise that resolves when the product is created and saved.
 */
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      user: req.user._id,
      name: "Product name",
      formerPrice: 0,
      price: 0,
      image: "/images/macbookair-silver.jpeg",
      brand: "Apple",
      category: "Electronics",
      countInStock: 0,
      numReviews: 0,
      description: "Product description",
      rating: 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

/**
 * Updates a product in the database.
 * @param {Object} req - The request object containing the product ID and updated data.
 * @param {Object} res - The response object used to send the updated product as a JSON response.
 * @returns {Object} - The updated product object.
 */
const updateProducts = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    image,
    description,
    category,
    formerPrice,
    price,
    countInStock,
    rating,
    numReviews,
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.brand = brand;
    product.image = image;
    product.description = description;
    product.category = category;
    product.formerPrice = formerPrice;
    product.countInStock = countInStock;
    product.rating = rating;
    product.numReviews = numReviews;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    // Handle case when product does not exist
    res.status(400).json("Product was not found");
  }
});
const deleteProducts = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (product) {
    res.status(200).json("deleted");
  } else {
    res.json("could not delete product");
  }
});

const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.string()
    );
    if (alreadyReviewed) {
      res.status(400).json({ error: "Product already reviewed" });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    try {
      await product.save();
      res.status(201).json({ message: "Reviewed Successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save product" });
    }
  }
});

// Get top rated products
//route: kampala/products/top
const getTopRatedProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({rating:-1}).limit(4)
      res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error` });
  }
});



export {
  getProducts,
  getProductById,
  createProduct,
  updateProducts,
  deleteProducts,
  createReview,
  getTopRatedProducts
};
