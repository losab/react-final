import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { Text } from "../atoms";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchProducts, searchResults, clearSearch } = useProduct();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchProducts(searchQuery);
      } else {
        clearSearch();
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);
  return (
    <Autocomplete
      freeSolo
      sx={{ width: 300 }}
      disableClearable
      options={searchResults}
      getOptionLabel={(option) => option.name}
      renderOption={(_, option) => {
        const { name, category, _id, price } = option;
        return (
          <Link
            to={`/products/categories/${category}/${_id}`}
            key={_id}
            state={{ id: _id }}
          >
            <Box>
              <Text>{name}</Text>
              <Text>{price}</Text>
            </Box>
          </Link>
        );
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            label="Search products"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        );
      }}
    />
  );
};
