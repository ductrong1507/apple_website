import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./ProductDetail.module.css";

export default function ProductDetail(props) {
  const [isShow, setIsShow] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  // Khi click vào sản phẩm liên quan
  const clickRelatedHandle = (product) => {
    setInputValue(0);
    history.push(`/detail/${product._id.$oid}`);
  };

  // Render phần sản phẩm liên quan
  const renderRelatedProduct = () => {
    return props.productRelated.map((product) => {
      return (
        <div
          onClick={() => {
            clickRelatedHandle(product);
          }}
          key={product._id.$oid}
          className={styles.product_detail_related_item}
        >
          <div className={styles.product_detail_related_item_img}>
            <img src={product.img1} alt="" />
          </div>

          <div className={styles.product_detail_related_item_info}>
            <h5>{product.name}</h5>
            <p>{Number(product.price).toLocaleString()} VND</p>
          </div>
        </div>
      );
    });
  };

  // Show Description
  const showDescriptionHandle = () => {
    setIsShow((prevState) => !prevState);
  };

  // xử lý ô input
  const inputChangeHandle = (e) => {
    setInputValue(+e.target.value);
  };

  // Xử lý nút tăng giảm
  const changeAmountHandle = (type) => {
    if (type > 0) {
      setInputValue((prevState) => +prevState + 1);
      return;
    }

    setInputValue((prevState) => prevState - 1);
    if (inputValue <= 1) {
      setInputValue(1);
      return;
    }
  };

  // Xử lý Add cart
  const addCartHandle = () => {
    dispatch({
      type: "ADD_CART",
      data: {
        product: props.productDetail[0],
        amount: inputValue || 1,
      },
    });
    alert("Đã thêm thành công!!!");
    setInputValue(0);
  };

  return (
    <section id={styles.product_detail}>
      {/* phần tổng quan sản phẩm */}
      <div className={styles.product_detail_overview}>
        <div className={styles.product_detail_overview_image}>
          {/* Phần sub images */}
          <div className={styles.product_detail_sub_img}>
            <img
              onClick={() => {
                props.changeMainImg(props.productDetail[0].img1);
              }}
              src={props.productDetail.length && props.productDetail[0].img1}
              alt=""
            />
            <img
              onClick={() => {
                props.changeMainImg(props.productDetail[0].img2);
              }}
              src={props.productDetail.length && props.productDetail[0].img2}
              alt=""
            />
            <img
              onClick={() => {
                props.changeMainImg(props.productDetail[0].img3);
              }}
              src={props.productDetail.length && props.productDetail[0].img3}
              alt=""
            />
            <img
              onClick={() => {
                props.changeMainImg(props.productDetail[0].img4);
              }}
              src={props.productDetail.length && props.productDetail[0].img4}
              alt=""
            />
          </div>

          {/* Phần main images */}
          <div className={styles.product_detail_main_img}>
            <img src={props.mainImg} alt="" />
          </div>
        </div>

        <div className={styles.product_detail_overview_content}>
          <h1>{props.productDetail.length && props.productDetail[0].name}</h1>
          <h3>
            {props.productDetail.length &&
              Number(props.productDetail[0].price).toLocaleString()}{" "}
            VND
          </h3>
          <p>
            {props.productDetail.length && props.productDetail[0].short_desc}
          </p>
          <h4>
            Category:{" "}
            <span>
              {props.productDetail.length && props.productDetail[0].category}
            </span>
          </h4>
          <div className={styles.product_detail_overview_content_form}>
            <input
              onChange={inputChangeHandle}
              type="text"
              name="amount"
              value={inputValue === 0 ? "" : inputValue}
              placeholder="QUANTITY"
            />
            <div className={styles.product_detail_form_action}>
              <button
                onClick={() => {
                  changeAmountHandle(-1);
                }}
              >
                <i className="fa-solid fa-caret-left" />
              </button>
              <p>{inputValue === 0 ? 1 : inputValue}</p>
              <button
                onClick={() => {
                  changeAmountHandle(1);
                }}
              >
                <i className="fa-solid fa-caret-right" />
              </button>
            </div>

            <button onClick={addCartHandle}>Add to cart</button>
          </div>
        </div>
      </div>

      {/*  Phần mô tả chi tiết */}
      <div className={styles.product_detail_description}>
        <button onClick={showDescriptionHandle}>Description</button>

        {/*  Phần mô tả chi tiết nội dung ẩn/hiện */}
        <div
          style={{ display: isShow ? "block" : "none" }}
          className={styles.product_detail_description_content}
        >
          <h1>Product Description</h1>
          <p>
            {props.productDetail.length && props.productDetail[0].long_desc}
          </p>
        </div>
      </div>

      {/* Phần những sản phẩm có liên quan */}
      <div className={styles.product_detail_related}>
        <h1>Related product</h1>
        <div className={styles.product_detail_related_container}>
          {/* Phần từng sản phẩm cụ thể */}
          {renderRelatedProduct()}
        </div>
      </div>
    </section>
  );
}
