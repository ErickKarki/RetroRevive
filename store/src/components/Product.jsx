// import {
//   FavoriteBorderOutlined,
//   SearchOutlined,
//   ShoppingCartOutlined,
// } from "@material-ui/icons";
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 10px;
  margin-bottom: 40px;
  min-width: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border-radius: 15px;
  /* background-color: #f5fbfd; */
  position: relative;
  /* box-shadow: 5px 5px 5px hsla(0, 0%, 0%, 0.2); */

  /* &:hover ${Info} {
    opacity: 1;
  } */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
  margin-bottom: 10px;
`;

// const Icon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 10px;
//   transition: all 0.5s ease;
//   &:hover {
//     background-color: #e9f5f5;
//     transform: scale(1.1);
//   }
// `;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid hsl(0, 0%, 80%);
  /* border-radius: 10px; */
  border: none;
  padding: 10px;
  background: linear-gradient(145deg, #2b4f73, #3a9cab);
  color: white;
  width: 80%;
  /* border-radius: 15px; */
`;
// const Details = styled.div`
//   display: flex;
//   flex-direction: column;
//   border: none;
//   padding: 15px;
//   background: linear-gradient(
//     145deg,
//     rgba(32, 124, 229, 0.9),
//     rgba(18, 82, 161, 0.9)
//   );
//   color: white;
//   width: 80%;
//   border-radius: 15px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
//   }
// `;

// const ProductName = styled.h1`
//   font-size: 22px;
//   font-weight: 500;
//   margin-bottom: 5px;
//   text-align: center;
// `;
// const ProductPrice = styled.h2`
//   font-size: 18px;
//   font-weight: 400;
//   text-align: center;
// `;
const ProductName = styled.h1`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 5px;
  text-align: center;
  color: #e0e0e0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

const ProductPrice = styled.h2`
  font-size: 18px;
  font-weight: 300;
  text-align: center;
  color: #f0f0f0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;
const Product = ({ item }) => {
  return (
    <Container>
      {/* <Circle /> */}
      <Image src={item.img} />
      <Info>
        {/* <Icon>
          <ShoppingCartOutlined />
          </Icon>
          <Icon>
          <SearchOutlined />
          </Icon>
          <Icon>
          <FavoriteBorderOutlined />
          </Icon> */}
      </Info>
      <Details>
        <ProductName>{item.name}</ProductName>
        <ProductPrice>Rs. {item.price}</ProductPrice>
      </Details>
    </Container>
  );
};

export default Product;
