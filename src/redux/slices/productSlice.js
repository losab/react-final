import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../helpers";

export const saveProduct = createAsyncThunk(
  "product/saveProduct",
  async ({ product, isUpdating, id }, { rejectWithValue, dispatch }) => {
    try {
      const endpoint = isUpdating ? `/products/${id}` : "/products";
      const method = isUpdating ? "put" : "post";
      const { data } = await axiosInstance[method](endpoint, { product });
      return data;
    } catch (error) {
      return rejectWithValue("could not save product");
    }
  }
);
export const fetchHomePageProducts = createAsyncThunk(
  "product/fetchHomePageProducts",
  async (_, { rejectwithvalue }) => {
    try {
      const { data } = await axiosInstance.get("/products");
      return data;
    } catch (error) {
      return rejectwithvalue("could not fetch product");
    }
  }
);

export const fetchCategoryProducts = createAsyncThunk(
  "product/fetchCategoryProducts",
  async (url, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/products/categories/${url}`);
      return data;
    } catch (error) {
      return rejectWithValue("couldn't fetchb category products");
    }
  }
);
export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async ({ id, category }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/products/category/${category}/${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue("couldn't fetch product");
    }
  }
);

export const rateProduct = createAsyncThunk(
  "product/rateProduct",
  async (
    { productId, userId, rating, isHome, url },
    { rejectWithValue, dispatch }
  ) => {
    try {
      await axiosInstance.post(`/products/${productId}/users/${userId}/rate`, {
        rating,
      });
      if (isHome) {
        dispatch(fetchHomePageProducts());
      } else {
        dispatch(fetchCategoryProducts(url));
      }
    } catch (error) {
      return rejectWithValue("could not rate product");
    }
  }
);
export const queryProduct = createAsyncThunk(
  "product/queryProduct",
  async (searchValue, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/products?name=${searchValue}`);
      return data;
    } catch (error) {
      return rejectWithValue("product not found");
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    product: null,
    error: null,
    homePageProducts: [],
    selectedProduct: null,
    categories: [],
    categoryProduct: {
      products: [],
    },
    singleProduct: {},
    searchResults: [],
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomePageProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchHomePageProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.categories;
      state.homePageProducts = action.payload.products;
    });
    builder.addCase(fetchHomePageProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(saveProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveProduct.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(saveProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchCategoryProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryProduct = action.payload;
    });
    builder.addCase(fetchCategoryProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProduct = action.payload.product;
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(queryProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(queryProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.searchResults = action.payload.products;
    });
    builder.addCase(queryProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const productReducer = productSlice.reducer;

export const { setSelectedProduct, clearSearchResults } = productSlice.actions;
