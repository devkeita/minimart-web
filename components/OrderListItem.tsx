import { FC } from "react";
import styles from "./OrderListItem.module.css";
import { CartItem } from "../lib/cart";
import { Product } from "../lib/product";

type Props = {
  cartItem: CartItem;
  showButton: boolean;
  onClickAddButton?: (product: Product) => void;
  onClickRemoveButton?: (product: Product) => void;
};

const OrderListItem: FC<Props> = ({ cartItem, showButton, onClickAddButton, onClickRemoveButton }) => {
  return (
    <li key={cartItem.product.id} className={styles.listItem}>
      <div className={styles.listItemLeft}>
        <img className={styles.full} src={cartItem.product.imageUrl} alt={`${cartItem.product.name}の写真`} />
      </div>
      <div className={styles.listItemRight}>
        <p>
          {cartItem.product.name} {cartItem.product.price}円
        </p>
        <p>
          {cartItem.quantity}個
          {(showButton && onClickAddButton && onClickRemoveButton) && (
            <span>
              &nbsp;
              <button onClick={() => onClickAddButton(cartItem.product)}>+</button>
              &nbsp;
              <button onClick={() => onClickRemoveButton(cartItem.product)}>-</button>
            </span>
          )}
        </p>
      </div>
    </li>
  );
};

export default OrderListItem;
