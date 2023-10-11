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
  const product = await Product.find({});
  res.status(200).json(product);
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


export {getProducts,getProductById};