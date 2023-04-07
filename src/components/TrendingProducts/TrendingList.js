import Axios from "axios";
import React, { useEffect, useState } from "react";
import TrendingItem from "./TrendingItem";
import styles from "./TrendingList.module.css";

export default function TrendingList() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchApiProductList();
  }, []);

  const fetchApiProductList = () => {
    const promise = Axios({
      url: "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74",
      method: "GET",
    });

    promise
      .then((res) => {
        setProductList(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // render danh sách trending
  const renderTrendingList = () => {
    //xử lý chỉ lấy 8 sản phẩm đầu tiên trong list API trả về
    return productList.slice(0, 8).map((product, index) => {
      return <TrendingItem key={index} productDetail={product} />;
    });
  };

  return (
    <section id={styles.trending_products}>
      <h3>Made the hard way</h3>
      <h1>Top trending products</h1>
      <div className={styles.product_list_container}>
        {renderTrendingList()}
      </div>
    </section>
  );
}
