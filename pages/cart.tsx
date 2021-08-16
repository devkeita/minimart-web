import { FC, useContext } from "react";
import styles from "./cart.module.css";
import { Layout } from "../components/Layout";
import { CartContext } from "../contexts/cartContext";
import { useRouter } from "next/dist/client/router";
import { Product } from "../lib/product";
import { createOrder } from "../lib/order";
import OrderListItem from "../components/OrderListItem";

const CartPage: FC = () => {
  const { cartItems, totalPrice, addCartItem, removeCartItem, resetCartItem } = useContext(CartContext);
  const router = useRouter();

  const onClickAddButton = (product: Product) => {
    addCartItem(product);
  };

  const onClickRemoveButton = (product: Product) => {
    removeCartItem(product);
  };

  const onClickOrderButton = async () => {
    if (cartItems.length === 0) {
      window.alert("カートの中身が空です");
      return;
    }
    const order = await createOrder(cartItems);
    resetCartItem();
    router.push(`/orders/${order.id}`);
  };

  return (
    <Layout>
      <ul className={styles.list}>
        {cartItems.map((cartItem) => (
          <OrderListItem
            key={cartItem.product.id}
            cartItem={cartItem}
            onClickAddButton={onClickAddButton}
            onClickRemoveButton={onClickRemoveButton}
            showButton
          />
        ))}
      </ul>
      <p className={styles.totalPrice}>合計：{totalPrice}円</p>
      <button className={styles.orderButton} onClick={onClickOrderButton}>
        注文する
      </button>
    </Layout>
  );
};

export default CartPage;
