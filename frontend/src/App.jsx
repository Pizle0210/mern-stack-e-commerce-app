import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProductScreen } from "./pages/ProductScreen";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from "./store/store";
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
import ProfilePage from "./pages/ProfilePage";
import AdminRoute from "./components/AdminRoute";
import OrderListScreen from "./pages/admin/OrderListScreen";
import ProductsListPage from "./pages/admin/ProductsListPage";
import ProductEditScreen from "./pages/admin/ProductEditScreen";
import UsersList from "./pages/admin/UsersListScreen";
import UserEditScreen from "./pages/admin/UserEditScreen";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <HelmetProvider>
        <Provider store={store}>
          <Header />
          <PayPalScriptProvider deferLoading={false}>
            <Routes>
              <Route index={true} path="/" element={<Home />} />
              <Route path="/search/:keyword" element={<Home />} />
              <Route path="/page/:pageNumber" element={<Home />} />
              <Route
                path="/search/:keyword/page/:pageNumber"
                element={<Home />}
              />

              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/login" element={<SignInPage />} />
              <Route path="/register" element={<RegistrationPage />} />

              <Route path="" element={<PrivateRoute />}>
                <Route path="/shipping" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              <Route path="" element={<AdminRoute />}>
                <Route path="/admin/orderlist" element={<OrderListScreen />} />
                <Route
                  path="/admin/productlist"
                  element={<ProductsListPage />}
                />
                <Route
                  path="/admin/productlist/:pageNumber"
                  element={<ProductsListPage />}
                />
                <Route
                  path="/admin/product/:id/edit"
                  element={<ProductEditScreen />}
                />
                <Route path="/admin/userlist" element={<UsersList />} />
                <Route
                  path="/admin/user/:id/edit"
                  element={<UserEditScreen />}
                />
              </Route>
              <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
            <ToastContainer />
          </PayPalScriptProvider>
        </Provider>
      </HelmetProvider>
    </>
  );
}
export default App;
