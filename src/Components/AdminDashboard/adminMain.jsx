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

const sampleRecords = {
  Users: {
    columns: ["ID", "Name", "Email", "Role"],
    rows: [
      ["U001", "Alex Morgan", "alex@example.com", "Customer"],
      ["U002", "Jamie Lee", "jamie@example.com", "Customer"],
    ],
  },
  Riders: {
    columns: ["ID", "Name", "Phone", "Status"],
    rows: [
      ["R001", "Sam Taylor", "555-0101", "Active"],
      ["R002", "Riley Jordan", "555-0102", "Inactive"],
    ],
  },
  Food: {
    columns: ["ID", "Name", "Category", "Price"],
    rows: [
      ["F001", "Garden Salad", "Salad", "$8.99"],
      ["F002", "Margherita Pizza", "Main course", "$12.99"],
    ],
  },
  Payment: {
    columns: ["ID", "Order ID", "Method", "Amount", "Status"],
    rows: [
      ["P001", "O001", "Card", "$21.98", "Paid"],
      ["P002", "O002", "Cash", "$10.99", "Pending"],
    ],
  },
  Orders: {
    columns: ["ID", "Customer", "Items", "Total", "Status"],
    rows: [
      ["O001", "Alex Morgan", "Garden Salad, Juice", "$21.98", "Preparing"],
      ["O002", "Jamie Lee", "Chicken Tacos", "$10.99", "Delivered"],
    ],
  },
};

function AdminMain() {
  const [activeForm, setActiveForm] = useState(null);
  const [viewAllFilter, setViewAllFilter] = useState("");
  const ActiveForm = activeForm && activeForm !== "viewAll"
    ? forms[activeForm]
    : null;

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex flex-wrap items-center gap-3">
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
        <Navigation
          activeForm={activeForm}
          onSelect={setActiveForm}
        />
        <section className="min-w-0 flex-1 p-6 sm:p-8">
          {activeForm === "viewAll" ? (
            <>
              <div className="flex justify-end">
                <select
                  aria-label="Filter records"
                  value={viewAllFilter}
                  onChange={(event) => setViewAllFilter(event.target.value)}
                  className="w-52 rounded-md border border-orange-600 bg-white px-3 py-2 text-gray-700"
                >
                  <option value="">Choose a category</option>
                  {Object.keys(sampleRecords).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {viewAllFilter && (
                <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow-sm">
                  <p className="px-4 pt-4 text-sm text-gray-500">
                    Sample data for layout preview
                  </p>
                  <table className="w-full text-left text-sm">
                    <thead className="bg-orange-50 text-gray-700">
                      <tr>
                        {sampleRecords[viewAllFilter].columns.map((column) => (
                          <th key={column} className="whitespace-nowrap px-4 py-3 font-semibold">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sampleRecords[viewAllFilter].rows.map((row) => (
                        <tr key={row[0]} className="text-gray-700">
                          {row.map((value, index) => (
                            <td key={`${row[0]}-${index}`} className="whitespace-nowrap px-4 py-3">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : ActiveForm ? (
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
