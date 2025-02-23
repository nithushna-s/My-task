"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserPage.module.css";

export default function UserPage() {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8); 
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3003/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const toggleShowMore = () => {
    if (showMore) {
      setVisibleItems(items.length); 
    } else {
      setVisibleItems(8); 
    }
    setShowMore(!showMore); 
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pricingTitle}>Products</h1>
      <ul className={styles.ulList}>
        {items.slice(0, visibleItems).map((item) => (
          <li key={item.id} className={styles.liItem}>
            <div className={styles.itemDetail}>{item.name}</div>
            <div className={styles.itemDetail}> Rs. {item.price.toFixed(2)}</div>
            <div className={styles.itemDetail}>Quantity: {item.quantity}</div>
          </li>
        ))}
      </ul>
      <p onClick={toggleShowMore} className={styles.buttonShowMore}>
        {showMore ? "Show More" : "Show Less"}
      </p>
    </div>
  );
}
