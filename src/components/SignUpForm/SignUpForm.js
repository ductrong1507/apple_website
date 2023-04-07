import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./SignUpForm.module.css";

const userArr = JSON.parse(localStorage.getItem("USER_ARRAY")) || [];

export default function SignUpForm() {
  const [inputHandle, setInputHandle] = useState({
    values: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
    },
    errors: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
    },
  });
  const history = useHistory();

  // chuyển trang login
  const loginClickHandle = () => {
    history.push("/login");
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

    // Xử lý trùng email
    if (name === "email") {
      const index = userArr.findIndex((user) => user.email === value);
      if (index !== -1) {
        newErrors[name] = name + " đã được sử dụng";
      }
    }

    // Xử lý password
    if (name === "password") {
      if (value.trim().length <= 8 && value.trim().length >= 1) {
        newErrors[name] = name + " phải trên 8 ký tự!!";
      } else if (value.trim() === "") {
        // newErrors[name] = name + " không được để trống!!";
      } else {
        // newErrors[name] = "";
      }
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
        // return;
      }
    }

    // kiểm tra xem trong errors có trường nào rỗng ko
    for (let key in inputHandle.errors) {
      if (inputHandle.errors[key] !== "") {
        valid = false;
        // return;
      }
    }

    if (valid) {
      userArr.push(inputHandle.values);
      localStorage.setItem("USER_ARRAY", JSON.stringify(userArr));
      alert("Tạo thành công!!!");
      history.push("/login");
    }
  };

  return (
    <section id={styles.sign_up}>
      <div className={styles.sign_up_container}>
        <h1>Sign Up</h1>
        <form onSubmit={submitFormHandle} className={styles.sign_up_form}>
          <div className={styles.form_group}>
            <p className="text_danger">{inputHandle.errors.fullName}</p>
            <input
              onChange={inputChangeHandle}
              value={inputHandle.values.fullName}
              type="text"
              name="fullName"
              className={styles.form_control}
              placeholder="Full Name"
            />
          </div>
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

          <div className={styles.form_group}>
            <p className="text_danger">{inputHandle.errors.phone}</p>

            <input
              onChange={inputChangeHandle}
              value={inputHandle.values.phone}
              type="text"
              name="phone"
              className={styles.form_control}
              placeholder="Phone"
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Login?
          <span onClick={loginClickHandle}> Click</span>
        </p>
      </div>
    </section>
  );
}
