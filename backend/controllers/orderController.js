import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

/**
 * This function handles adding orders.
 *
 * @desc create new order
 * @route POST /kampala/orders/
 * @access Private
 */
//   const addOrders = asyncHandler(async (req, res) => {
//     try {
//       const {
//         orderItems,
//         shippingAddress,
//         paymentMethod,
//         itemsPrice,
//         taxPrice,
//         shippingPrice,
//         totalAmount,
//       } = req.body;
//       if (orderItems && orderItems.length === 0) {
//         res.status(400).json({ message: "Order items cannot be empty" });
//       } else {
//         const order = new Order({
//           orderItems: orderItems.map((x) => ({
//             ...x,
//             product: x._id,
//             _id: undefined,
//           })),
//           user: req.user._id,
//           shippingPrice,
//           shippingAddress,
//           paymentMethod,
//           itemsPrice,
//           taxPrice,
//         totalAmount,
//       });
//       const createOrder = await order.save();
//       resstatus(201).json(createOrder );
//     }
//   } catch (error) {
//     logger.error(error);
//     res.status(500).send("Failed to add order. Please try again later.");
//   }
// });

const addOrders = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalAmount,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json(`No order items`);
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingPrice,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingAddress,
      totalAmount,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

/**
 * This function handles getting orders.
 *
 * @route GET /kampala/orders/myorders
 * @access Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const order = Order.find({ user: req.user._id });
    res.status(200).json({ order: order });
  } catch (error) {
    res.status(500).send("error occurred");
  }
});

/**
 * This function handles getting orders by id.
 *
 * @desc get logged in user orders by id
 * @route GET /kampala/orders/:id
 * @access Private
 */

const getOrdersById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
 * This function handles payment update.
 *
 * @route PUT /kampala/orders/:id
 * @access Private/Admin
 */

const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid=true;
      order.paidAt=Date.now();
      order.paymentResult={
        id:req.body.id,
        status:req.body.status,
        update_time:req.body.update_time,
        email_address:req.body.payer.email_address,
      };
      const updatedOrder= await order.save();
      res.status(200).json(updatedOrder)
    }else{
      res.status(400).json(`error with payment`)
    }
  } catch (error) {
    res.status(500).send("error occurred");
  }
});

/**
 * Updates the order status to "delivered".
 * @route PUT /kampala/orders/:id/deliver
 * @access Private/Admin
 */
const updateOrderToDelivered = async (req, res) => {
  try {
    res.status(200).send("Ordered items delivered");
  } catch (error) {
    res.status(500).send("An error occurred......");
  }
};

/**
 * This function gets all orders.
 * @route GET /kampala/orders
 * @access Private/Admin
 */
const getOrders = async (req, res) => {
  try {
    res.status(200).send("Get all orders");
  } catch (error) {
    res.status(500).send("An error occurred");
  }
};
export {
  updateOrderToDelivered,
  getMyOrders,
  getOrdersById,
  addOrders,
  getOrders,
  updateOrderToPaid,
};
