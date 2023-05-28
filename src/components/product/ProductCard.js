import { Box, Card, CardActions, Grid, Rating, styled } from "@mui/material";
import React from "react";
import { Link, Text, Button } from "../atoms";
import { isUserAdmin } from "../../helpers";
import { useUser, useCart } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { RateProduct } from "./RateProduct";

const StyledCard = styled(Card)(() => ({
  width: 350,
  borderRadius: 3,
}));
const StyledInfoContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "0 10px",
}));

const StyledCardActionsContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
export const ProductCard = ({ product }) => {
  const { name, _id, image, price, category, averageRating } = product;
  const { userData } = useUser();
  const navigate = useNavigate();
  const { setSelectedProduct, rateProduct } = useProduct();
  const { addToCart, cartItem, removeFromCart } = useCart();

  const onEdit = () => {
    navigate(`/products/edit/${name}`);
    setSelectedProduct(product);
  };

  const isProductInCard = cartItem?.find((item) => item.product._id === _id);
  return (
    <Grid item>
      <StyledCard>
        <Link linkTo={`/products/categories/${category}/${_id}`}>
          <img
            src={image}
            alt={`${category}-${name}`}
            style={{ objectFit: "cover", width: "100%", height: "200px" }}
          />
          <StyledInfoContainer>
            <Text>{name}</Text>
            <Text>${price}</Text>
          </StyledInfoContainer>
        </Link>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <RateProduct
            value={averageRating}
            userData={userData}
            product={product}
            onChange={rateProduct}
            category={category}
          />
          <StyledCardActionsContainer>
            {isProductInCard ? (
              <>
                <Button onClick={() => removeFromCart(_id)}>-</Button>
                <Text>{isProductInCard?.quantity}</Text>
                <Button onClick={() => addToCart(product)}>+</Button>
              </>
            ) : (
              <Button onClick={() => addToCart(product)}>add to cart</Button>
            )}

            {isUserAdmin(userData) && (
              <Button onClick={onEdit}>edit product</Button>
            )}
          </StyledCardActionsContainer>
        </CardActions>
      </StyledCard>
    </Grid>
  );
};
