import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { 
    addToCart as addInCart,
    removeFromCart as deleteFromCart,
    fetchCart as getCart,
    saveCart as saveCartToBe,
clearCart as emptyCart } from '../redux/slices';

export const useCart = () => {
    const dispatch = useDispatch();

    const cartItem = useSelector((state)=>state.cart.cartItem)

    const addToCart =(data)=>{
        dispatch(addInCart(data));
    }
    
    const removeFromCart = (id)=> {
        dispatch(deleteFromCart(id));
    }
    const fetchCart = (data)=>{
        dispatch(getCart(data));
    }
    const saveCart = (data)=> {
        dispatch(saveCartToBe(data));
    }
    const clearCart = (userId)=> {
        dispatch(emptyCart());
        if(userId) {
            saveCart({userId, cartItem: []});
        }
    };
  return {
    addToCart,
    cartItem,
    removeFromCart,
    fetchCart,
    saveCart,
    clearCart,
}
    
}
