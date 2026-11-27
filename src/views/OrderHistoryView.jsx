import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orderController } from "../controllers/orderController";

const formatStatus = (status) =>
  status.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

function OrderHistoryView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    orderController
      .listMine()
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

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="font-semibold text-orange-700 hover:underline">
          ← Back to menu
        </Link>
        <h1 className="my-6 text-3xl font-bold text-gray-900">Your orders</h1>
        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p role="alert" className="text-red-700">{error}</p>
        ) : orders.length === 0 ? (
          <section className="rounded-xl bg-white p-6 text-gray-700 shadow-sm">
            You haven’t placed an order yet.
          </section>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <article key={order._id} className="rounded-xl bg-white p-5 shadow-sm">
                <div className="flex flex-wrap justify-between gap-2">
                  <h2 className="font-semibold">Order #{order._id}</h2>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800">
                    {formatStatus(order.status)}
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-gray-700">
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
                <p className="mt-3 font-semibold">Total: PKR {order.total.toFixed(2)}</p>
                <p className="mt-1 text-sm text-gray-600">
                  Cash on delivery · {new Date(order.createdAt).toLocaleString()}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default OrderHistoryView;
