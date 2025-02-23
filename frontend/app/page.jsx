import styles from "./Home.module.css";
import '../app/globals.css';
export default function Home() {
  return (
    <div className={styles.container}>
      <a href="http://localhost:3000/admin">
        <button className={styles.buttonadmin}>
          Admin
        </button>
      </a>
      <a href="http://localhost:3000/products">
        <button className={styles.buttonuser}>
          User
        </button>
      </a>
    </div>
  );
}
