import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./SignInForm.module.css";

const currentUser = JSON.parse(localStorage.getItem("CURRENT_USER"));

export default function SignInForm(props) {
  const [inputHandle, setInputHandle] = useState({
    values: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
  });
  const { isAuth } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isAuth) {
      // alert("Bạn đã login thành công!!!");
      history.push("/");
    } else if (isAuth === false) {
      setInputHandle({
        ...inputHandle,
        values: {
          ...inputHandle.values,
          password: "",
        },
      });
    }
  }, [isAuth]);

  // chuyển trang login
  const registerClickHandle = () => {
    history.push("/register");
  };

  // xử lý các ô input
  const inputChangeHandle = (e) => {
    const { value, name } = e.target;
    const newValues = {
      ...inputHandle.values,
      [name]: value,
    };
    const newErrors = { ...inputHandle.errors };

    // Xử lý người dùng ko nhập
    if (value.trim() === "") {
      newErrors[name] = name + " không được để trống!!";
    } else {
      newErrors[name] = "";
    }

    setInputHandle({
      values: newValues,
      errors: newErrors,
    });
  };

  // Xử lý sự kiện submit form
  const submitFormHandle = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...inputHandle.errors };

    // kiểm tra xem trong values có trường nào rỗng ko
    for (let key in inputHandle.values) {
      if (inputHandle.values[key] === "") {
        valid = false;
        newErrors[key] = key + " không được để trống!!";
        setInputHandle({ ...inputHandle, errors: newErrors });
      }
    }

    if (valid) {
      dispatch({
        type: "ON_LOGIN",
        data: inputHandle.values,
      });
    }
  };

  return (
    <section id={styles.sign_in}>
      <div className={styles.sign_in_container}>
        <h1>Sign In</h1>
        <form onSubmit={submitFormHandle} className={styles.sign_in_form}>
          <div className={styles.form_group}>
            <p className="text_danger">{inputHandle.errors.email}</p>
            <input
              onChange={inputChangeHandle}
              value={inputHandle.values.email}
              type="email"
              name="email"
              className={styles.form_control}
              placeholder="Email"
            />
          </div>
          <div className={styles.form_group}>
            <p className="text_danger">{inputHandle.errors.password}</p>
            <input
              onChange={inputChangeHandle}
              value={inputHandle.values.password}
              type="password"
              name="password"
              className={styles.form_control}
              placeholder="Password"
            />
          </div>
          <p className="text_danger">
            {isAuth === false ? "Sai thông tin đăng nhập" : ""}
          </p>
          <button type="submit">Sign In</button>
        </form>
        <p>
          Create an account?
          <span onClick={registerClickHandle}> Sign Up</span>
        </p>
      </div>
    </section>
  );
}
