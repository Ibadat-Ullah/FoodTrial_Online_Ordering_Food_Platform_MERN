function DeleteFood() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="mx-auto max-w-xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Delete Food</h2>
      <label className="block">
        Food ID
        <input
          name="foodId"
          required
          className="mt-1 w-full rounded-md border p-2"
        />
      </label>
      <label className="flex items-start gap-2">
        <input name="confirmDelete" type="checkbox" required className="mt-1" />
        Confirm deletion of this food item.
      </label>
      <button className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700">
        Delete food
      </button>
      <p className="text-sm text-gray-500">
        Form only; backend submission is not connected.
      </p>
    </form>
  );
}

export default DeleteFood;
