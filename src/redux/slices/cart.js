import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers";

export const fetchCart = createAsyncThunk("cart/fetchCart",async(userId, {rejectWithValue})=>{
    try {
        const {data} = await axiosInstance.get(`/users/${userId}/cart`);
        return data;
    } catch(error){
        return rejectWithValue("could not fetch Cart")
    }
})

export const saveCart = createAsyncThunk(
    "cart/saceCart",
    async({userId, cartItem}, {dispatch, rejectWithValue})=>{
        try {
            await axiosInstance.put(`/users/${userId}/cart`, {products:cartItem})
            dispatch(fetchCart(userId))
        }catch(error) {
            return rejectWithValue("could not save Cart")
        }
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        loading:false,
        error:null,
        cartItem:[],
    },
    reducers:{
        clearCart:(state)=>{
            state.cartItem=[];
        },
        addToCart:(state,action)=>{
            const product  = action.payload; 
            const productId =product._id;
            const cartItem = state.cartItem?.find(
                (item)=> item.product._id === productId
            );
        
            if(cartItem) {
                const updatedCart = state.cartItem.map((item)=>
                item.product._id ===productId
                ? {...item, quantity:item.quantity + 1}
                :item
                );
                state.cartItem = updatedCart;
            }else{
                state.cartItem.push({product, quantity: 1})
            }
        },
        removeFromCart:(state,action)=>{
            const productId = action.payload;
            const cartItem = state.cartItem?.find(
                (item) => item.product._id === productId
            );
            if (cartItem.quantity === 1) {
                state.cartItem = state.cartItem.filter((item)=>item.product._id !==productId)
            } else {
                state.cartItem = state.cartItem.map((item) =>
                item.product._id === productId
                ?{...item, quantity: item.quantity -1}
                : item
                );
            }
        },
    },
    extraReducers:(builder)=> {
        builder.addCase(fetchCart.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(fetchCart.fulfilled, (state,action)=>{
            state.loading = false;
            state.cartItem = action.payload.cart || [];
        })
        builder.addCase(fetchCart.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        builder.addCase(saveCart.pending, (state)=>{
            state.loading = true;
        })
        builder.addCase(saveCart.fulfilled, (state,action)=>{
            state.loading = false;
            state.cartItem = action.payload.cart;
        })
        builder.addCase(saveCart.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payloadtype
        })
        
    }
});

export const {addToCart, removeFromCart,clearCart} =cartSlice.actions;
export const cartReducer = cartSlice.reducer;