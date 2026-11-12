function CreateFood() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="mx-auto max-w-xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Create Food</h2>
      <label className="block">
        Food name
        <input
          name="name"
          required
          className="mt-1 w-full rounded-md border p-2"
        />
      </label>
      <label className="block">
        Category
        <input
          name="category"
          required
          className="mt-1 w-full rounded-md border p-2"
        />
      </label>
      <label className="block">
        Description
        <textarea
          name="description"
          required
          rows="3"
          className="mt-1 w-full rounded-md border p-2"
        />
      </label>
      <label className="block">
        Price
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          required
          className="mt-1 w-full rounded-md border p-2"
        />
      </label>
      <label className="block">
        Image URL
        <input
          name="image"
          type="url"
          required
          className="mt-1 w-full rounded-md border p-2"
        />
      </label>
      <button className="rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700">
        Create food
      </button>
      <p className="text-sm text-gray-500">
        Form only; backend submission is not connected.
      </p>
    </form>
  );
}

export default CreateFood;
