"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editId, setEditId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

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

  const handleSuccess = (message) => {
    setShowSuccess(message);
    setTimeout(() => {
      setShowSuccess(false);
      router.push("/admin");
    }, 2000);
  };

  const addItem = async () => {
    if (name && price && quantity) {
      await axios.post("http://localhost:3001/items", {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });
      fetchItems();
      setName("");
      setPrice("");
      setQuantity("");
      handleSuccess("Item added successfully!");
    }
  };

  const updateItem = async () => {
    if (name && price && quantity && editId !== null) {
      await axios.put(`http://localhost:3001/items/${editId}`, {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });
      fetchItems();
      setName("");
      setPrice("");
      setQuantity("");
      setEditId(null);
      handleSuccess("Item updated successfully!");
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setPrice(item.price.toString());
    setQuantity(item.quantity.toString());
    setEditId(item.id);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pricingTitle}>Pricing Plans</h1>
      {showSuccess && <div className={styles.successMessage}>{showSuccess}</div>}
      
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
        onClick={editId ? updateItem : addItem}
      >
        {editId ? "Update Item" : "Add Item"}
      </button>
    </div>
  );
}
