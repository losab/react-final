import { Drawer,Box, styled, Button  } from '@mui/material';
import React from 'react';
import { useCart, useUser } from '../../hooks';
import {Text} from '../atoms';

const StyledCartItem = styled(Box)(()=>({
    width: 400,
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
    marginBottom:20,
}));
const StyledButtonContainer = styled(Box)(()=>({
    display: "flex",
    justifyContent: "center",
}));

export const CartDrawer = ({cartItem, isCartOpen, setIsCartOpen}) => {
    const {userData} = useUser();
    const {saveCart,clearCart}= useCart();
  return <Drawer open={isCartOpen} 
  onClose={()=> setIsCartOpen(false)}
  anchor="right">
    {cartItem?.map((item)=>{
        const {product, quantity} =item;
        const {price,name, _id, image} = product;
        return (
            <StyledCartItem>
                <img src={image} 
                alt={`${name}-img`} 
                width="70px" 
                height="70px" 
                style={{objectFit:"cover",
                borderRadius:5}} />
                <Box sx={{paddingLeft:5, display:"flex", flexDirection:"column"}}>
                    <Text>{name}</Text>
                    <Text>{quantity}</Text>
                    <Text>total: ${price*quantity}</Text>
                </Box>
            </StyledCartItem>
        )
})}
<StyledButtonContainer>
    <Button onClick={()=>clearCart(userData?._id)}>clear cart</Button>
    {!!userData && <Button onClick={()=>saveCart({userId:userData?._id, cartItem})}> save cart</Button>}
</StyledButtonContainer>
   </Drawer>
}

