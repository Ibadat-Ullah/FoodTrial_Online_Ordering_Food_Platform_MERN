function DeleteRider() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="mx-auto max-w-xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Delete Rider</h2>
      <label className="block">
        Rider ID
        <input
          name="riderId"
          required
          className="mt-1 w-full rounded-md border p-2"
        />
      </label>
      <label className="flex items-start gap-2">
        <input name="confirmDelete" type="checkbox" required className="mt-1" />
        Confirm deletion of this rider.
      </label>
      <button className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700">
        Delete rider
      </button>
      <p className="text-sm text-gray-500">
        Form only; backend submission is not connected.
      </p>
    </form>
  );
}

export default DeleteRider;
