import styles from "./Home.module.css";
import '../app/globals.css';
export default function Home() {
  return (
    <div className={styles.container}>
      <a href="https://my-project-seven-sage.vercel.app/admin">
        <button className={styles.buttonadmin}>
          Admin
        </button>
      </a>
      <a href="https://my-project-seven-sage.vercel.app/products">
        <button className={styles.buttonuser}>
          User
        </button>
      </a>
    </div>
  );
}
