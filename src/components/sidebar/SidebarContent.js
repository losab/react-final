import { List, styled, Box, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "../atoms";
import { SidebarHeader } from "./SidebarHeader";

const StyledListItem = styled(ListItem)(() => ({
  padding: "5px 8px 3px 15px",
  margin: "8px",
}));

export const SidebarContent = ({ sidebarItems }) => {
  return (
    <>
      <SidebarHeader />
      <List>
        {sidebarItems?.map((item) => {
          const { _id, name } = item;
          return (
            <React.Fragment key={_id}>
              <Link
                linkTo={`/products/categories/${name}?page=1&sort=price,desc`}
              >
                <Box sx={{ display: "flex" }}>
                  <StyledListItem>
                    <ListItemText secondary={name} />
                  </StyledListItem>
                </Box>
              </Link>
            </React.Fragment>
          );
        })}
      </List>
    </>
  );
};
