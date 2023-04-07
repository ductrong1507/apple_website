import Axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./SidebarCategory.module.css";
const categoryList = {
  iphone: ["Iphone", "Ipad", "Macbook"],
  wireless: ["Airpod", "Watch"],
  other: ["Mouse", "Keyboard", "Other"],
};

export default function SidebarCategory() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiProductList();
  }, []);

  // hàm gọi APi danh sách sản phẩm
  const fetchApiProductList = () => {
    const promise = Axios({
      url: "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74",
      method: "GET",
    });

    promise
      .then((res) => {
        dispatch({
          type: "SHOP_SHOW_ALL",
          data: res.data,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // render những category
  const renderCategoryList = (data) => {
    return data.map((category, index) => {
      return (
        <li
          onClick={() => {
            clickCategoryHandle(category);
          }}
          key={index}
        >
          {category}
        </li>
      );
    });
  };

  // click vào những category nhất định sẽ filter danh sách sản phẩm theo catergory đó
  const clickCategoryHandle = (category) => {
    const promise = Axios({
      url: "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74",
      method: "GET",
    });

    promise
      .then((res) => {
        const filterList = res.data.filter((item) => {
          return item.category.toLowerCase() === category.toLowerCase();
        });
        dispatch({
          type: "FILTER_PRODUCT",
          data: { filterList, category },
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <nav id={styles.sidebar_category}>
      <h1>Categories</h1>
      <div className={styles.sidebar_container}>
        <div className={styles.sidebar_item}>
          <h2>Apple</h2>
          <ul>
            <li onClick={fetchApiProductList}>All</li>
          </ul>
        </div>

        <div className={styles.sidebar_item}>
          <h3>Iphone & Mac</h3>
          <ul>{renderCategoryList(categoryList.iphone)}</ul>
        </div>

        <div className={styles.sidebar_item}>
          <h3>Wireless</h3>
          <ul>{renderCategoryList(categoryList.wireless)}</ul>
        </div>

        <div className={styles.sidebar_item}>
          <h3>Other</h3>
          <ul>{renderCategoryList(categoryList.other)}</ul>
        </div>
      </div>
    </nav>
  );
}
