import Image from "next/image";
import HomePage from "./Components/home"
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h2>BookStore</h2>
      </nav>
    </header>
      <HomePage />
    </main>
  );
}
