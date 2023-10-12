import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProductScreen } from "./pages/ProductScreen";
import { Provider } from "react-redux";
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import store from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CartScreen } from "./pages/CartScreen";
import SignInPage from "./pages/SignInPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShippingScreen from "./pages/ShippingScreen";
import RegistrationPage from "./pages/RegistrationPage";
import Error404 from "./pages/Error404";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./pages/PaymentScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Provider store={store}>
            <Header />
          <PayPalScriptProvider deferLoading={true}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/login" element={<SignInPage />} />
              <Route path="/register" element={<RegistrationPage />} />

              <Route path="" element={<PrivateRoute />}>
                <Route path="/shipping" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
              </Route>
              <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
          </PayPalScriptProvider>
          <ToastContainer />
        </Provider>
      </QueryClientProvider>
    </>
  );
}
export default App;
