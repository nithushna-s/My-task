"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleSuccess = (message) => {
    setShowSuccess(message);
    setTimeout(() => {
      setShowSuccess(false);
      router.push("/admin");
    }, 2000);
  };

  const addItem = async () => {
    if (name && price && quantity) {
      await axios.post("http://localhost:3003/items", {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });
      setName("");
      setPrice("");
      setQuantity("");
      handleSuccess("Item added successfully!");
    }
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
        className={styles.buttonAdd}
        onClick={addItem}
      >
        Add Item
      </button>
    </div>
  );
}
