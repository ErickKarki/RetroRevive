import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";
import Swal from "sweetalert2";
import ConfirmationModal from "./ConfirmationModel";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 50vw;
  max-width: 600px;
  transition: all 0.3s ease-in-out;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #2b4f73;
  text-align: center;
`;

const Content = styled.div`
  width: 100%;
`;

const Label = styled.label`
  margin: 10px 0 5px;
  color: #555;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:focus {
    border-color: #3a9cab;
    box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.2);
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background: linear-gradient(145deg, #2b4f73, #3a9cab);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(145deg, #3a9cab, #2b4f73);
  }
`;

const PaymentOptions = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const PaymentButton = styled.button`
  width: 48%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background: ${(props) => (props.selected ? "#2b4f73" : "white")};
  color: ${(props) => (props.selected ? "white" : "#2b4f73")};
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.selected ? "#2b4f73" : "#f0f0f0")};
  }
`;

const NepalPayContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const CheckoutModal = ({ isOpen, onRequestClose, product }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [username, setNepalPayUsername] = useState("");
  const [password, setNepalPayPassword] = useState("");
  const [nepalPayLoggedIn, setNepalPayLoggedIn] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleNepalPayLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/qpay/login",
        {
          username: username,
          password: password,
        }
      );
      if (response.status === 200) {
        setNepalPayLoggedIn(true);
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Login credentials mismatch",
        icon: "error",
      });
    }
  };

  const handleProceed = () => {
    if (!name || !email || !address || !contact || !paymentMethod) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all the required fields.",
        icon: "error",
      });
      return;
    }

    if (paymentMethod === "nepalPay" && !nepalPayLoggedIn) {
      Swal.fire({
        title: "Error!",
        text: "Please log in to Nepal Pay.",
        icon: "error",
      });
      return;
    }

    setShowConfirmationModal(true);
  };

  const handleConfirmPurchase = () => {
    // Handle the purchase confirmation logic here
    // console.log("Purchase confirmed");
    // Swal.fire({
    //   title: "Confirmed!",
    //   text: "Ordered Successfully",
    //   icon: "success",
    // });
    // // Close the confirmation modal and checkout modal
    setShowConfirmationModal(false);
    onRequestClose();
  };

  return (
    <>
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
        <ModalContainer>
          <CloseButton onClick={onRequestClose}>&times;</CloseButton>
          <Title>Checkout Now</Title>
          <Content>
            <Label>Name:</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Label>Email:</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Label>Shipping Address:</Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <Label>Contact No.:</Label>
            <Input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />

            <PaymentOptions>
              <PaymentButton
                selected={paymentMethod === "cash"}
                onClick={() => setPaymentMethod("cash")}
              >
                Cash on Delivery
              </PaymentButton>
              <PaymentButton
                selected={paymentMethod === "nepalPay"}
                onClick={() => setPaymentMethod("nepalPay")}
              >
                Nepal Pay
              </PaymentButton>
            </PaymentOptions>

            {paymentMethod === "nepalPay" && !nepalPayLoggedIn && (
              <NepalPayContainer>
                <Label>Nepal Pay Username:</Label>
                <Input
                  value={username}
                  onChange={(e) => setNepalPayUsername(e.target.value)}
                />
                <Label>Nepal Pay Password:</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setNepalPayPassword(e.target.value)}
                />
                <CheckoutButton onClick={handleNepalPayLogin}>
                  Login to Nepal Pay
                </CheckoutButton>
              </NepalPayContainer>
            )}

            {paymentMethod === "nepalPay" && nepalPayLoggedIn && (
              <p>Nepal Pay logged in successfully!</p>
            )}

            <CheckoutButton onClick={handleProceed}>Proceed</CheckoutButton>
          </Content>
        </ModalContainer>
      </Modal>
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onRequestClose={() => setShowConfirmationModal(false)}
        cartDetails={[product]} // Pass the cart details here
        onConfirm={handleConfirmPurchase}
      />
    </>
  );
};

export default CheckoutModal;
