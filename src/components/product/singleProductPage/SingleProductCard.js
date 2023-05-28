import { Box, styled } from "@mui/material";
import React from "react";
import { Text } from "../../atoms";

const StyledBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
}));
const StyledImage = styled("img")(() => ({
  width: "350px",
  height: "350px",
  objectFit: "cover",
}));
export const SingleProductCard = ({ product }) => {
  const { image, name, category, brand, description } = product;
  return (
    <Box>
      <StyledBox>
        <StyledImage src={image} />
        <Box>
          <Text variant={"h4"}>name: {name}</Text>
          <Text variant={"h4"}>category: {category}</Text>
          <Text variant={"h4"}>brand: {brand}</Text>
        </Box>
      </StyledBox>
      <Text variant={"h4"}>description: </Text>
      <Text>{description}</Text>
    </Box>
  );
};
