import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCategoryProducts as fetchProductsCategory,
  fetchHomePageProducts,
  fetchSingleProduct,
  saveProduct as SaveProductHandler,
  setSelectedProduct as selectProduct,
  rateProduct as reviewProduct,
  queryProduct,
  clearSearchResults,
} from "../redux/slices";

export const useProduct = () => {
  const dispatch = useDispatch();

  const homePageProducts = useSelector(
    (state) => state.product.homePageProducts
  );

  const fetchCategoryProducts = (url) => {
    dispatch(fetchProductsCategory(url));
  };
  const singleProduct = useSelector((state) => state.product.singleProduct);

  const navigate = useNavigate();
  const setSelectedProduct = (data) => {
    dispatch(selectProduct(data));
  };

  const getHomePageProducts = () => {
    dispatch(fetchHomePageProducts());
  };

  const getSingleProduct = (data) => {
    dispatch(fetchSingleProduct(data));
  };
  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  const isProductLoading = useSelector((state) => state.product.loading);

  const categories = useSelector((state) => state.product.categories);

  const searchResults = useSelector((state) => state.product.searchResults);

  const categoryProduct = useSelector((state) => state.product.categoryProduct);

  const saveProduct = (data) => {
    dispatch(
      SaveProductHandler({
        product: data.product,
        isUpdating: data.isUpdating,
        id: data.id,
      })
    )
      .unwrap()
      .then(() => {
        setSelectedProduct(null);
        navigate("/");
      });
  };
  const rateProduct = (data) => {
    dispatch(reviewProduct(data));
  };
  const searchProducts = (data) => {
    dispatch(queryProduct(data));
  };
  const clearSearch = () => {
    dispatch(clearSearchResults());
  };
  return {
    saveProduct,
    isProductLoading,
    homePageProducts,
    getHomePageProducts,
    clearSearch,
    setSelectedProduct,
    selectedProduct,
    categories,
    categoryProduct,
    fetchCategoryProducts,
    getSingleProduct,
    rateProduct,
    searchProducts,
    searchResults,
    singleProduct,
  };
};
