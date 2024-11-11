import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./Nav.module.css";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

const Nav = () => {
  const { totalPrice, checkout, totalItems } = useCart();

  return (
    <nav className={styles.nav}>
      <div className={styles.main}>
        <p className={styles.navTitle}>EcoPet Hub</p>
        <p className={styles.description}>
          Sustainable, eco-friendly products for your beloved pets!
        </p>
      </div>
      <div className={styles.cartButtonWrapper}>
        <Link href="/cart">
          <button className={styles.cartButton} aria-label="View cart">
            <FaShoppingCart size={22} color="whitesmoke" />
            {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
            <p>{totalPrice} €</p>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
