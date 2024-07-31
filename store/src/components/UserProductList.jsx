import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import styled from "styled-components";
import Modal from "react-modal";
import Swal from "sweetalert2";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 300px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const EditButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  align-self: flex-end;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 30vw;
  max-width: 400px;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 95%;
  font-size: 16px;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
`;

const UserProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/products/user/products",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Fetched products:", res.data);
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("Unexpected data format:", res.data);
          setProducts([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user products:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = { name, price };
      const res = await axios.put(
        `http://localhost:5001/api/products/${editingProduct._id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProducts(
        products.map((product) =>
          product._id === editingProduct._id ? res.data : product
        )
      );
      setEditingProduct(null);
      setIsModalOpen(false);

      // Show SweetAlert2 notification
      Swal.fire({
        title: "Updated",
        text: "Product Details Updated Successfully",
        icon: "success",
      });
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err);
    }
  };

  const handleDelete = async (productId) => {
    console.log("Deleting product with id:", productId); // Debugging log

    try {
      await axios.delete(`http://localhost:5001/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProducts(products.filter((product) => product._id !== productId));
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <Container>
      {products.length === 0 ? (
        <div>No products found</div>
      ) : (
        products.map((item) => (
          <ProductContainer key={item._id}>
            <Product
              item={item}
              showDeleteButton={true}
              handleDelete={handleDelete}
            />
            <EditButton onClick={() => handleEdit(item)}>Edit</EditButton>
          </ProductContainer>
        ))
      )}
      {editingProduct && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
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
              transform: "translateY(-50%)",
              padding: "0",
              border: "none",
              borderRadius: "10px",
              width: "30%",
              height: "auto",
            },
          }}
        >
          <ModalContainer>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <EditForm onSubmit={handleUpdate}>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
              />
              <Button type="submit">Update</Button>
            </EditForm>
          </ModalContainer>
        </Modal>
      )}
    </Container>
  );
};

export default UserProductList;
