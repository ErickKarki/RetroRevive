import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import { mobile } from "../responsive";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search).get("search") || "";
  const [price, setPrice] = useState("asc");

  const handlePriceChange = (e) => {
    const selectedPrice = e.target.value;
    setPrice(selectedPrice);
    navigate(
      `/products?category=${category}&search=${search}&price=${selectedPrice}`
    );
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{category ? category : "Apparel"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select value={price} onChange={handlePriceChange}>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} search={search} price={price} />
    </Container>
  );
};

export default ProductList;
