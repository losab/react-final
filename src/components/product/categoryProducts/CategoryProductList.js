import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryParams } from "../../../hooks";
import { useProduct } from "../../../hooks/useProduct";
import { GridContainer, LoadingWrapper } from "../../atoms";
import { ProductCard } from "../ProductCard";
import { Paginate } from "./Paginate";
import { Sort } from "./Sort";

export const CategoryProductList = () => {
  const { categoryProduct, fetchCategoryProducts, isProductLoading } =
    useProduct();
  const { products, totalPages } = categoryProduct;
  const { categoryName } = useParams();
  const { value: page, changeQueryValue: changePage } = useQueryParams("page");
  const { value: sort, changeQueryValue: changeSort } = useQueryParams("sort");

  useEffect(() => {
    changePage("page", 1);
  }, [sort]);
  useEffect(() => {
    fetchCategoryProducts(
      `${categoryName}?page=${page || 1}&size=1&sort=price,descending`
    );
  }, [categoryName, page, sort]);
  return (
    <LoadingWrapper isLoading={isProductLoading}>
      <Sort value={sort} changeSort={changeSort} />
      <GridContainer>
        {products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
        <Paginate
          totalPages={totalPages}
          currentPage={Number(page)}
          changePage={changePage}
        />
      </GridContainer>
    </LoadingWrapper>
  );
};
