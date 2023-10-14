import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

/**
 * This function handles adding orders.
 *
 * @desc create new order
 * @route POST /kampala/orders/
 * @access Private
 */
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
    const orders = await Order.find({ user: req.user._id });
    if (orders.length === 0) {
      res.status(404).send("No orders found for the user");
    } else {
      res.status(200).json(orders);
    }
  } catch (error) {
    res.status(500).send(`Error occurred: ${error.message}`);
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
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          isDelivered: true,
          deliveredOn: Date.now()
        },
        { new: true }
      );
      if (updatedOrder) {
        res.status(200).json(updatedOrder);
      } else {
        res.status(404).send("Order not found");
      }
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
 * This function gets all orders.
 * @route GET /kampala/orders
 * @access Private/Admin
 */
const getOrders = async (req, res) => {
  try {
    const orders =await Order.find({}).populate('user','id name')
    res.status(200).json(orders);
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
