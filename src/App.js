import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LiveChat from "./components/LiveChat/LiveChat";
import { useSelector } from "react-redux";

function App() {
  const { isAuth, currentUser } = useSelector((state) => state.AuthReducer);
  // new commit
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/detail/:productId" component={DetailPage} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/checkout" component={CheckoutPage} />

        {/* Chuyển hướng trang login khi chưa hoặc đã đăng nhập */}
        <Route exact path="/login">
          {
            // JSON.parse(localStorage.getItem("CURRENT_USER"))
            currentUser ? <Redirect to="/" /> : <LoginPage />
          }
        </Route>

        {/* Chuyển hướng trang register khi chưa hoặc đã đăng nhập */}
        <Route exact path="/register">
          {
            // JSON.parse(localStorage.getItem("CURRENT_USER"))

            currentUser ? <Redirect to="/" /> : <RegisterPage />
          }
        </Route>

        {/* Chuyển hướng khi nhập url ko đúng */}
        <Route exact path="/*" component={NotFoundPage} />
      </Switch>
      <Footer />
      <LiveChat />
    </BrowserRouter>
  );
}

export default App;
