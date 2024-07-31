import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ConfirmationModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 60vw;
  max-width: 700px;
  transition: all 0.3s ease-in-out;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #333;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }
`;

const Title = styled.h2`
  margin-bottom: 25px;
  font-size: 28px;
  color: #2b4f73;
  text-align: center;
`;

const CartDetails = styled.div`
  width: 100%;
  margin-bottom: 25px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;

  &:hover {
    background: #eaeaea;
  }
`;

const ItemName = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

const ItemPrice = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #2b4f73;
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  background: linear-gradient(145deg, #2b4f73, #3a9cab);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(145deg, #3a9cab, #2b4f73);
  }
`;

const ConfirmationModal = ({
  isOpen,
  onRequestClose,
  cartDetails,
  onConfirm,
}) => {
  const navigate = useNavigate();
  const handleConfirmClick = () => {
    Swal.fire({
      title: "Confirmed!",
      text: "Ordered Successfully",
      icon: "success",
    })
      .then(() => {
        onConfirm();
      })
      .then(navigate("/"));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "0",
          border: "none",
          borderRadius: "10px",
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      <ConfirmationModalContainer>
        <CloseButton onClick={onRequestClose}>&times;</CloseButton>
        <Title>Confirm Your Purchase</Title>
        <CartDetails>
          {cartDetails.map((item, index) => (
            <CartItem key={index}>
              <ItemName>{item.name}</ItemName>
              <ItemPrice>Rs. {item.price + 100}</ItemPrice>
            </CartItem>
          ))}
        </CartDetails>
        <ConfirmButton onClick={handleConfirmClick}>
          Confirm Purchase
        </ConfirmButton>
      </ConfirmationModalContainer>
    </Modal>
  );
};

export default ConfirmationModal;
