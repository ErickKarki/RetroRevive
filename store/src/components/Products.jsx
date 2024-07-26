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

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);
  return (
    <Link to="/cart">
      <Container>
        {products.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </Container>
    </Link>
  );
};

export default Products;
