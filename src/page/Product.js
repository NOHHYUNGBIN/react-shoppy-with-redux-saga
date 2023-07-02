import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/product/action";
import { Spin } from "antd";
import ProductCard from "../component/ProductCard";

export default function Product() {
  const product = useSelector((state) => state.product);
  const { productList } = product;

  const dispatch = useDispatch();

  console.debug("product", product);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      {product.error && <p>{product.error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4">
        {productList ? (
          productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <Spin tip="제품을 가져오는중!" size="large">
            <div className="content" />
          </Spin>
        )}
      </ul>
    </>
  );
}
