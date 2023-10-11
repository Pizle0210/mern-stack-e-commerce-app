import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { savePaymentMethod } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <Container className="h-screen">
      <CheckoutSteps step1 step2 step3 />

      <h1 className="font-bold text-2xl my-3">Payment Method</h1>
      <form onSubmit={submitHandler}>
        <label className="mb-3" id="PayPal">
          Select Payment Method
        </label>
        <div className="col flex items-center space-x-2">
          <input
            type="radio"
            name="paymentMethod"
            value='PayPal'
            id="PayPal"
            onChange={(e) => setPaymentMethod(e.target.value)}
            checked
            className="h-4 w-4 text-green-500 focus:ring-green-500"
          />
          <label>PayPal or Credit Card</label>
        </div>
        <button className="shadow-lg hover:shadow-xl p-2 px-2 mt-3 rounded bg-green-500 hover:bg-green-600 text-white transition-all transform hover:scale-95 ease-out duration-150">
          Continue
        </button>
      </form>
    </Container>
  );
}
