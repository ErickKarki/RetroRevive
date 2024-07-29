import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Product from "./Product";
import { Link, useLocation } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Products = ({ category, search, price }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "http://localhost:5001/api/products";
        if (category || search || price) {
          url += "?";
        }
        if (category) {
          url += `category=${category}&`;
        }
        if (search) {
          url += `search=${search}&`;
        }
        if (price) {
          url += `price=${price}&`;
        }
        url = url.slice(0, -1); // Remove trailing '&' or '?'

        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [category, search, price]);

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
