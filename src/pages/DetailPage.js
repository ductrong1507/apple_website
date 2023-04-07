import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import Banner from "../components/Banner/Banner";
import MoreInfo from "../components/MoreInfo/MoreInfo";

export default function DetailPage(props) {
  const params = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [productRelated, setProductRelated] = useState([]);
  const [mainImg, setMainImg] = useState("");

  useEffect(() => {
    // lấy danh sách sản phẩm
    fetchApiProductList();
  }, [params.productId]);

  // Hàm call API lấy danh sách sản phẩm
  const fetchApiProductList = () => {
    const promise = Axios({
      url: "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74",
      method: "GET",
    });

    promise
      .then((res) => {
        const product = res.data.filter(
          (product) => product._id.$oid === params.productId
        );
        const related = res.data.filter(
          (relatedProduct) =>
            relatedProduct.category === product[0].category &&
            relatedProduct._id.$oid !== params.productId
        );
        setProductDetail(product);
        setMainImg(product[0].img1);
        setProductRelated(related);
        return {
          product,
          total: res.data,
        };
      })

      .catch((error) => {
        console.log("error", error);
      });
  };

  // Hàm thay đổi hình ảnh khi click vào những hỉnh nhỏ
  const changeMainImg = (img) => {
    setMainImg(img);
  };

  return (
    <main className="w-70">
      {/* <Banner /> */}
      <ProductDetail
        productDetail={productDetail}
        productRelated={productRelated}
        mainImg={mainImg}
        changeMainImg={changeMainImg}
      />
      <MoreInfo />
    </main>
  );
}
