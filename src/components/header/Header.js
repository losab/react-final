import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  styled,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import { useCart } from "../../hooks";
import { Link } from "../atoms";
import { CartDrawer } from "./CartDrawer";
import { UserIcon } from "./UserIcon";
import { AiOutlineShoppingCart, AiOutlineHome } from "react-icons/ai";
import { MdViewSidebar } from "react-icons/md";
import { SearchBar } from "./SearchBar";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "purple",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    backgroundColor: "teal",
  },
  [theme.breakpoints.up("sm")]: {
    width: "calc(100% - 255px)",
    backgroundColor: "teal",
  },
  padding: " 0 37px 0 37px",
}));
const StyledToolBar = styled(Toolbar)(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
}));

export const Header = ({ setIsDrawerOpen }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItem } = useCart();
  return (
    <Box>
      <StyledAppBar>
        <StyledToolBar>
          <Button
            onClick={() => setIsDrawerOpen((prev) => !prev)}
            sx={{ display: { sm: "none" } }}
          >
            <MdViewSidebar size={30} color="#000" />
          </Button>
          <Link linkTo="/">
            <AiOutlineHome size={30} color="#e4e4e" />
          </Link>
          <SearchBar />
          <UserIcon />
          <Button onClick={() => setIsCartOpen(true)}>
            <AiOutlineShoppingCart size={30} color="#000" />
          </Button>
          <CartDrawer
            isCartOpen={isCartOpen}
            cartItem={cartItem}
            setIsCartOpen={setIsCartOpen}
          />
        </StyledToolBar>
      </StyledAppBar>
    </Box>
  );
};

export default Header;
