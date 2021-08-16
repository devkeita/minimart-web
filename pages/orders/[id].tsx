import { FC, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "./[id].module.css";
import { Layout } from "../../components/Layout";
import { getOrder, Order } from "../../lib/order";

const OrderPage: FC = () => {
  const [order, setOrder] = useState<Order>();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id === undefined) return;
    getOrder(id.toString()).then((order) => setOrder(order));
  }, [id]);

  return (
    <Layout>
      <h2 className={styles.h2}>注文の詳細</h2>
      <ul>
        <li>注文日時: {order?.orderedAt}</li>
        <li>配達日時: {order?.deliveryDate}</li>
        <li>受け取り場所: {order?.pickupLocation.name}</li>
      </ul>
      <h2 className={styles.h2}>注文した商品</h2>
      <ul className={styles.list}>
        {order?.items.map((cartItem) => (
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
    </Layout>
  );
};

export default OrderPage;
