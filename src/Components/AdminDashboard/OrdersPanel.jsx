import { useEffect, useState } from "react";
import { orderController } from "../../controllers/orderController";

const statuses = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const formatStatus = (status) =>
  status.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

function OrdersPanel() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    orderController
      .listAll()
      .then((data) => {
        if (!cancelled) setOrders(data);
      })
      .catch((requestError) => {
        if (!cancelled) setError(requestError.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const changeStatus = async (id, status) => {
    setError("");
    setUpdatingId(id);
    try {
      const updatedOrder = await orderController.updateStatus(id, status);
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === id
            ? { ...updatedOrder, customer: order.customer }
            : order,
        ),
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setUpdatingId("");
    }
  };

  if (loading) return <p className="text-gray-600">Loading orders...</p>;
  if (error && orders.length === 0) {
    return <p role="alert" className="text-red-700">{error}</p>;
  }
  if (orders.length === 0) {
    return <p className="rounded-lg bg-white p-6 text-gray-700">No orders yet.</p>;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Customer orders</h2>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      {orders.map((order) => (
        <article key={order._id} className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">Order #{order._id}</h3>
              <p className="mt-1 text-sm text-gray-600">
                {order.customer?.name || "Customer"} · {order.customer?.email || ""}
              </p>
            </div>
            <label className="text-sm text-gray-700">
              Status
              <select
                aria-label={`Status for order ${order._id}`}
                value={order.status}
                disabled={updatingId === order._id}
                onChange={(event) => changeStatus(order._id, event.target.value)}
                className="ml-2 rounded border p-2"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{formatStatus(status)}</option>
                ))}
              </select>
            </label>
          </div>
          <ul className="mt-4 space-y-1 text-sm text-gray-700">
            {order.items.map((item) => (
              <li key={`${order._id}-${item.food}`}>
                <p>
                  {item.quantity} × {item.name} — PKR {(
                    (item.price +
                      (item.toppingOptions || []).reduce((sum, option) => sum + option.price, 0) +
                      (item.addOns || []).reduce((sum, option) => sum + option.price, 0)) *
                    item.quantity
                  ).toFixed(2)}
                </p>
                {item.toppingOptions?.length > 0 && (
                  <p className="text-xs text-gray-500">
                    Toppings: {item.toppingOptions.map((option) => `${option.name} (+PKR ${option.price.toFixed(2)})`).join(", ")}
                  </p>
                )}
                {item.addOns?.length > 0 && (
                  <p className="text-xs text-gray-500">
                    Add-ons: {item.addOns.map((option) => `${option.name} (+PKR ${option.price.toFixed(2)})`).join(", ")}
                  </p>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-2 border-t pt-3 text-sm text-gray-600 sm:grid-cols-2">
            <p><span className="font-medium">Deliver to:</span> {order.delivery.name}</p>
            <p><span className="font-medium">Phone:</span> {order.delivery.phone}</p>
            <p className="sm:col-span-2"><span className="font-medium">Address:</span> {order.delivery.address}</p>
            <p><span className="font-medium">Payment:</span> Cash on delivery</p>
            <p className="font-semibold text-gray-900">Total: PKR {order.total.toFixed(2)}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default OrdersPanel;
