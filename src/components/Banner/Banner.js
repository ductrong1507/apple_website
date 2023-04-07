import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./Banner.module.css";

export default function Banner() {
  const history = useHistory();

  // xử lý khi click vào nút trong banner
  const bannerClickHandle = () => {
    history.push("/shop");
  };

  return (
    <section
      style={{
        backgroundImage: `url('./assets/images/banner1.jpg')`,
      }}
      id={styles.banner}
    >
      <h3 className={styles.banner_title}>New inspiration 2020</h3>
      <h1 className={styles.banner_content}>20% off on new season</h1>

      <button onClick={bannerClickHandle} className={styles.banner_btn}>
        Browse collections
      </button>
    </section>
  );
}
