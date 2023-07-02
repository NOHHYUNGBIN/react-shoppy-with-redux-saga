import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/product/action";

export default function Product() {
  const product = useSelector((state) => state.product);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  console.debug("product", product);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getProducts());
  }, []);
  return <>ㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹ</>;
}
