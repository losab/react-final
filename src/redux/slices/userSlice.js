import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers";

export const authenticateUser = createAsyncThunk("user/authenticateUser",
async({formValues, isLogin},{rejectWithValue})=>{
    try{
        const route =`/users/${isLogin ? 'login' : 'register'}`;
        const{data} = await axiosInstance.post(route,formValues);
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken)
        return data;
    } catch(error) {
       return rejectWithValue("something went wrong")
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        loading: false,
        error:  null,
    },
    reducers: {
        logout: (state) =>{
            state.userData = null;
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
        },
    },
        
    extraReducers: (builder) => {
        builder.addCase(authenticateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authenticateUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.userData=action.payload.user;
        });
        builder.addCase(authenticateUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
});

export const {logout} = userSlice.actions;

export const userReducer = userSlice.reducer