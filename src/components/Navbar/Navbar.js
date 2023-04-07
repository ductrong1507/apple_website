import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { isAuth, currentUser } = useSelector((state) => state.AuthReducer);
  const { cartArr } = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();

  // Xử lý nút log out
  const logoutClickHandle = () => {
    dispatch({
      type: "ON_LOGOUT",
    });
  };

  // xử lý nút mũi tên
  const showUserInfo = () => {
    alert(`Current user: ${currentUser.fullName}`);
  };

  return (
    <header id={styles.navbar} className="w-70">
      <div className={styles.nav_item}>
        <ul>
          <li>
            <NavLink
              exact
              activeClassName="link_active"
              className={styles.link}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              activeClassName="link_active"
              className={styles.link}
              to="/shop"
            >
              Shop
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.nav_title}>
        <h1>Boutique</h1>
      </div>
      <div className={styles.nav_item}>
        <ul>
          <li>
            <NavLink
              exact
              activeClassName="link_active"
              className={styles.link}
              to="/cart"
            >
              <i
                className={`fa-solid fa-cart-flatbed mr-8 ${styles.link_icon}`}
              />
              Cart
            </NavLink>
            <span>
              {cartArr.length
                ? `(${cartArr.reduce(
                    (total, item) => (total += item.quantity),
                    0
                  )})`
                : ""}
            </span>
          </li>
          {isAuth ? (
            <li>
              <p className={styles.link}>
                <i className={`fa-solid fa-user mr-8 ${styles.link_icon}`} />
                {currentUser.fullName}
                <i
                  onClick={showUserInfo}
                  className={`fa-sharp fa-solid fa-caret-down ${styles.link_icon_login}`}
                />
                <span onClick={logoutClickHandle}>{`(Logout)`}</span>
              </p>
            </li>
          ) : (
            <li>
              <NavLink
                exact
                activeClassName="link_active"
                className={styles.link}
                to="/login"
              >
                <i className={`fa-solid fa-user mr-8 ${styles.link_icon}`} />
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
