import { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [email, setEmail] = useState(shippingAddress?.email || "");
  const [zipCode, setZipCode] = useState(shippingAddress?.zipCode || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ email, address, zipCode, city, country }));
    navigate("/payment");
    toast.success("Shipping address saved!");
  };

  return (
    <Container className="justify-center min-h-screen ">
      <CheckoutSteps step1 step2 />
      <div className="flex justify-center">
        <form className="max-w-max" onSubmit={handleSubmit}>
          <h1 className="text-2xl mb-3 font-semibold">Shipping</h1>
          <div className="mb-3 form-floating">
            <input
              type="email"
              placeholder="Email"
              className="w-full form-control rounded border-green-100 focus:ring-1 focus:ring-green-500 shadow-md focus:border-green-500 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Enter email</label>
          </div>
          <div className="mb-3 form-floating">
            <input
              type="text"
              placeholder="Address"
              className="w-full form-control rounded border-green-100 focus:ring-1 focus:ring-green-500 shadow-md focus:border-green-500 "
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <label>Address</label>
          </div>
          <div className="flex flex-col md:flex md:flex-row md:space-x-3 space-x-0 space-y-2 md:space-y-0  mb-3">
            <div className="col form-floating">
              <input
                type="text"
                placeholder="City"
                className="w-full form-control rounded border-green-100 focus:ring-1 focus:ring-green-500 shadow-md focus:border-green-500 "
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <label className="ml-3">City</label>
            </div>
            <div className="col form-floating">
              <input
                type="text"
                placeholder="Zip Code"
                className="w-full form-control rounded border-green-100 focus:ring-1 focus:ring-green-500 shadow-md focus:border-green-500 "
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
              <label className="ml-3">Zip Code</label>
            </div>
            <div className="col form-floating">
              <input
                type="text"
                placeholder="Country"
                className="w-full form-control rounded border-green-100 focus:ring-1 focus:ring-green-500 shadow-md focus:border-green-500 "
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <label className="ml-3">Country</label>
            </div>
          </div>
          <button className="px-2 p-2 text-lg text-white rounded-md bg-green-500 hover:bg-green-600 transform transition-all hover:scale-95 shadow hover:shadow-lg">
            Proceed
          </button>
        </form>
      </div>
    </Container>
  );
}
