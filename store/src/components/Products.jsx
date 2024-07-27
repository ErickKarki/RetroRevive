import React, { useEffect, useState } from "react";
import axios from "axios";

import styled from "styled-components";
// import { popularProducts } from "../data";
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
const Products = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:5001/api/products?category=${category}`
            : "http://localhost:5001/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [category]);
  return (
    <Container>
      {products.map((item) => (
        <StyledLink to={`/product/${item._id}`} key={item._id}>
          <Product item={item} />
        </StyledLink>
      ))}
    </Container>
  );
};

export default Products;
