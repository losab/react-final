import { Pagination } from "@mui/material";
import React from "react";

export const Paginate = ({ totalPages, currentPage, changePage }) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(_, value) => {
        changePage("page", value);
      }}
    />
  );
};
