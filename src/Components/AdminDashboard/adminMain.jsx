import { useState } from "react";
import { Link } from "react-router-dom";
import CreateFood from "./food/CreateFood";
import DeleteFood from "./food/DeleteFood";
import UpdateFood from "./food/UpdateFood";
import CreateRider from "./riders/CreateRider";
import DeleteRider from "./riders/DeleteRider";
import UpdateRider from "./riders/UpdateRider";
import Navigation from "./navigation";

const forms = {
  createFood: CreateFood,
  updateFood: UpdateFood,
  deleteFood: DeleteFood,
  createRider: CreateRider,
  updateRider: UpdateRider,
  deleteRider: DeleteRider,
};

function AdminMain() {
  const [activeForm, setActiveForm] = useState(null);
  const ActiveForm = activeForm ? forms[activeForm] : null;

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex gap-3">
          <Link
            to="/"
            className="rounded-md border border-orange-600 px-4 py-2 font-medium text-orange-700 hover:bg-orange-50"
          >
            Back to Home
          </Link>
          <button
            type="button"
            className="rounded-md bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-73px)]">
        <Navigation activeForm={activeForm} onSelect={setActiveForm} />
        <section className="min-w-0 flex-1 p-6 sm:p-8">
          {ActiveForm ? (
            <ActiveForm />
          ) : (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
              Choose a food or rider action from the navigation.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminMain;
