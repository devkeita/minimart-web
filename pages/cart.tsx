import { FC, useContext } from "react";
import styles from "./cart.module.css";
import { Layout } from "../components/Layout";
import { CartContext } from "../context/cartContext";
import { useRouter } from "next/dist/client/router";

const CartPage: FC = () => {
  const { cartItems, totalPrice, resetCartItem } = useContext(CartContext);
  const router = useRouter();

  const onClickOrder = () => {
    window.alert("注文しました");
    resetCartItem();
    router.push("/");
  };

  return (
    <Layout>
      <ul className={styles.list}>
        {cartItems.map((cartItem) => (
          <li key={cartItem.product.id} className={styles.listItem}>
            <div className={styles.listItemLeft}>
              <img className={styles.full} src={cartItem.product.imageUrl} alt={`${cartItem.product.name}の写真`} />
            </div>
            <div className={styles.listItemRight}>
              <p>
                {cartItem.product.name} {cartItem.product.price}円
              </p>
              <p>{cartItem.quantity}個</p>
            </div>
          </li>
        ))}
      </ul>
      <p className={styles.totalPrice}>合計：{totalPrice}円</p>
      <button className={styles.orderButton} onClick={onClickOrder}>
        注文する
      </button>
    </Layout>
  );
};

export default CartPage;
