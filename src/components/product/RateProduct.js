import { Rating } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

export const RateProduct = ({
  value,
  userData,
  onChange,
  product,
  category,
}) => {
  const { pathname, search } = useLocation();
  const onRatingChange = (e) => {
    const { value } = e.target;
    onChange({
      productId: product._id,
      userId: userData._id,
      rating: Number(value),
      isHome: pathname === "/",
      url: `${category}${search}&size=1`,
    });
  };
  return (
    <Rating value={value} disabled={!userData} onChange={onRatingChange} />
  );
};
