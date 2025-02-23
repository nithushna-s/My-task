"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";

export default function Home() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [itemToDelete, setItemToDelete] = useState(null); // Item to delete

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3001/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addItem = async () => {
    if (name && price && quantity) {
      await axios.post("http://localhost:3001/items", {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });
      fetchItems();
      resetForm();
    }
  };

  const deleteItem = (id) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const handleDeleteConfirmation = async (confirmed) => {
    if (confirmed && itemToDelete) {
      await axios.delete(`http://localhost:3001/items/${itemToDelete}`);
      fetchItems();
    }
    setShowModal(false);
    setItemToDelete(null);
  };


  const resetForm = () => {
    setName("");
    setPrice("");
    setQuantity("");
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setName(item.name);
    setPrice(item.price.toString());
    setQuantity(item.quantity.toString());
    setEditId(item.id);
    setShowForm(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pricingTitle}>Pricing Plans</h1>

      {!showForm && (
        <a href="http://localhost:3000/admin/add-Products">
          <button
            className={`${styles.button} ${styles.buttonAdd}`}
          >
            Add Item
          </button>
        </a>
      )}

      {showForm && (
        <div className={styles.formContainer}>
      
          <h3 className={styles.h3}>Update Item</h3>
          <button className={styles.buttonCancel} onClick={resetForm}>
            x
          </button>
          <input
            className={styles.input}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
          <input
            className={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
          />
          <button
            className={`${styles.button} ${editId ? styles.buttonEdit : styles.buttonAdd}`}
            onClick={addItem}
          >
          submit
          </button>
        
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>Rs. {item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  className={styles.liItemButton1}
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button className={styles.liItemButton} onClick={() => deleteItem(item.id)}>
              Delete
            </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>
              Are you sure you want to <span className={styles.deleteText}>delete</span> this item?
            </p>
            <div className={styles.modalButtons}>
              <button onClick={() => handleDeleteConfirmation(true)} className={styles.modalButtonYes}>
                Yes
              </button>
              <button onClick={() => handleDeleteConfirmation(false)} className={styles.modalButtonNo}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
