import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Products from "../../pages/Products/Products";
import AboutUs from "../../pages/AboutUs/AboutUs";
import Contact from "../../pages/Contact/Contact";
import ProductDetails from "../../pages/ProductDetails/ProductDetails";
import Error404 from "../Error404/Error404";
import Cart from "../../pages/Cart/Cart";
import SignIn from "../../pages/SignIn/SignIn";
import SignUp from "../../pages/SignUp/SignUp";
import ScrollToTopOnRouteChange from "../ScrollToTopOnRouteChange/ScrollToTopOnRouteChange";
import MyAccount from "../MyAccount/MyAccount";
import { useSelector } from "react-redux";
import Orders from "../../pages/Orders/Orders";
import Payment from "../../pages/Payment/Payment";
import PaymentCancel from "../PaymentCancel/PaymentCancel";
import PaymentSuccess from "../PaymentSuccess/PaymentSuccess";


const AllRoutes = () => {
  const isLogin = useSelector((state: any) => state.login.token)
  const user = useSelector((state: any) => state.login.user)
  return (
    <>
      <ScrollToTopOnRouteChange />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myaccount" element={isLogin ? <MyAccount /> : <Navigate to="/" />} />
        <Route path="/orders" element={isLogin && user.email === "superadmin9090@gmail.com" ? <Orders /> : <Navigate to="/orders" />} />
        <Route path="/orders/:id" element={isLogin && user.email === "superadmin9090@gmail.com" ? <Orders /> : <Navigate to="/orders" />} />
        <Route path="/create-checkout-session" element={<Payment />} />
        <Route path="/login" element={
          isLogin ? <Navigate to="/" /> : <SignIn />
        } />
        <Route path="/signup" element={
          isLogin ? <Navigate to="/" /> : <SignUp />
        } />
        <Route path="/payment-cancelled" element={
          isLogin ? <PaymentCancel /> : <Navigate to="/" />
        } />
        <Route path="/payment-success" element={
          isLogin ? <PaymentSuccess /> : <Navigate to="/" />
        } />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
