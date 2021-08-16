import { graphqlRequest } from "./graphqlClient";
import { CartItem } from "./cart";

export type Order = {
  id: string;
  orderedAt: Date;
  deliveryDate: Date;
  totalAmount: number;
  pickupLocation: {
    id: string;
    name: string;
  };
  items: CartItem[];
};

const createOrderMutation = `
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      order {
        id
      }
    }
  }
`;

const getOrderQuery = `
  query getOrder($id: ID!) {
    order(id: $id) {
      id
      orderedAt
      deliveryDate
      pickupLocation {
        id
        name
      }
      items {
        product {
          id
          name
          price
          imageUrl
        }
        quantity
      }
      totalAmount
    }
  }
`;

export async function createOrder(cartItems: CartItem[]): Promise<Order> {
  const inputCartItems = cartItems.map((cartItem) => {
    return {
      productId: cartItem.product.id,
      quantity: cartItem.quantity,
    };
  });
  const input = { items: inputCartItems };
  const data = await graphqlRequest({ query: createOrderMutation, variables: { input } });
  return data.createOrder.order;
}

export async function getOrder(id: string): Promise<Order> {
  const data = await graphqlRequest({ query: getOrderQuery, variables: { id } });
  return data.order;
}
