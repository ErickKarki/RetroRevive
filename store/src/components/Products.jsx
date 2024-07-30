import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Product from "./Product";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  text-decoration: none; // This removes the underline
  color: inherit; // This ensures the text color is inherited from the parent component
`;

const Products = ({ category, searchQuery, products: initialProducts }) => {
  const [products, setProducts] = useState(initialProducts || []);

  useEffect(() => {
    if (!initialProducts || initialProducts.length === 0) {
      const fetchProducts = async () => {
        try {
          let url = `http://localhost:5001/api/products`;
          if (category || searchQuery) {
            url += `?`;
            if (category) {
              url += `category=${category}&`;
            }
            if (searchQuery) {
              url += `search=${searchQuery}`;
            }
          }
          console.log("Fetching from URL:", url); // Add this line

          const res = await axios.get(url);
          console.log("Response data:", res.data); // Add this line

          if (Array.isArray(res.data)) {
            setProducts(res.data);
          } else {
            console.error("Unexpected data format", res.data);
            setProducts([]);
          }
        } catch (err) {
          console.error(err);
          setProducts([]);
        }
      };

      fetchProducts();
    } else {
      setProducts(initialProducts);
    }
  }, [category, searchQuery, initialProducts]);

  return (
    <Container>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((item) => (
          <StyledLink to={`/product/${item._id}`} key={item._id}>
            <Product item={item} />
          </StyledLink>
        ))
      ) : (
        <p>No products found</p>
      )}
    </Container>
  );
};

export default Products;
