// Test ID: IIDSAT
// Order.jsx
import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

function Order() {
  const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <h2>Status</h2>
      <div>
        {priority && <span>Priority</span>}
        <span>{status} order</span>
      </div>
      <p>
        {deliveryIn >= 0
          ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
          : "Order should have arrived"}
      </p>
      <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      <p>Price pizza: {formatCurrency(orderPrice)}</p>
      {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
      <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
