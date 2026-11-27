import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";
import { orderController } from "../controllers/orderController";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80, "Name is too long."),
  phone: z.string().trim().regex(/^(?=.*\d)\+?[0-9()\-\s]{7,20}$/, "Enter a valid phone number."),
  address: z.string().trim().min(10, "Enter a full delivery address.").max(500, "Address is too long."),
});

function CartView() {
  const { user } = useAuth();
  const { items, total, setQuantity, removeItem, clearCart } = useCart();
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: user.name },
  });

  const onSubmit = async (delivery) => {
    setError("");
    try {
      const order = await orderController.create({
        items: items.map(({ id, quantity, toppingOptions, addOns }) => ({
          foodId: id,
          quantity,
          toppingOptionIds: toppingOptions.map((option) => option.id),
          addOnIds: addOns.map((option) => option.id),
        })),
        delivery,
      });
      clearCart();
      setPlacedOrder(order);
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="font-semibold text-orange-700 hover:underline">
          ← Continue shopping
        </Link>
        <h1 className="my-6 text-3xl font-bold text-gray-900">Your cart</h1>

        {placedOrder ? (
          <section className="rounded-xl bg-white p-6 shadow-sm" role="status">
            <h2 className="text-xl font-semibold text-green-700">Order placed</h2>
            <p className="mt-2 text-gray-700">
              Order #{placedOrder._id} is pending. Pay PKR {placedOrder.total.toFixed(2)} on delivery.
            </p>
            <Link to="/orders" className="mt-4 inline-block text-orange-700 underline">
              View your orders
            </Link>
          </section>
        ) : items.length === 0 ? (
          <section className="rounded-xl bg-white p-6 text-gray-700 shadow-sm">
            Your cart is empty. Add food from the menu to get started.
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
            <section className="space-y-4">
              {items.map((item) => (
                <article key={item.key} className="flex gap-4 rounded-xl bg-white p-4 shadow-sm">
                  <img
                    src={item.image}
                    alt=""
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-gray-900">{item.name}</h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Base price: PKR {item.basePrice.toFixed(2)}
                    </p>
                    {item.toppingOptions.map((option) => (
                      <p key={option.id} className="mt-1 text-sm text-gray-600">
                        Topping — {option.name}: +PKR {option.price.toFixed(2)}
                      </p>
                    ))}
                    {item.addOns.map((option) => (
                      <p key={option.id} className="mt-1 text-sm text-gray-600">
                        Add-on — {option.name}: +PKR {option.price.toFixed(2)}
                      </p>
                    ))}
                    <div className="mt-3 flex items-center gap-3">
                      <label className="text-sm text-gray-700">
                        Quantity
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={item.quantity}
                          onChange={(event) => {
                            const quantity = Number(event.target.value);
                            if (event.target.value && Number.isInteger(quantity)) {
                              setQuantity(item.key, quantity);
                            }
                          }}
                          className="ml-2 w-20 rounded border p-1"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="text-sm text-red-700 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="shrink-0 font-semibold text-gray-900">
                    PKR {((item.basePrice + item.toppingOptions.reduce((sum, option) => sum + option.price, 0) + item.addOns.reduce((sum, option) => sum + option.price, 0)) * item.quantity).toFixed(2)}
                  </p>
                </article>
              ))}
            </section>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="h-fit space-y-4 rounded-xl bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold">Delivery details</h2>
              <label className="block text-sm">
                Name
                <input {...register("name")} className="mt-1 w-full rounded border p-2" />
                {errors.name && <span className="text-red-600">{errors.name.message}</span>}
              </label>
              <label className="block text-sm">
                Phone
                <input type="tel" {...register("phone")} className="mt-1 w-full rounded border p-2" />
                {errors.phone && <span className="text-red-600">{errors.phone.message}</span>}
              </label>
              <label className="block text-sm">
                Delivery address
                <textarea {...register("address")} rows="3" className="mt-1 w-full rounded border p-2" />
                {errors.address && <span className="text-red-600">{errors.address.message}</span>}
              </label>
              <p className="text-sm text-gray-600">Payment: Cash on delivery</p>
              <p className="flex justify-between border-t pt-3 font-semibold">
                <span>Estimated total</span>
                <span>PKR {total.toFixed(2)}</span>
              </p>
              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
              >
                {isSubmitting ? "Placing order..." : "Place order"}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartView;
