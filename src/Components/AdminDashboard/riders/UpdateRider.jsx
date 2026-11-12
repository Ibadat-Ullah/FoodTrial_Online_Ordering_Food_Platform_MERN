function UpdateRider() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="mx-auto max-w-xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Update Rider</h2>
      <label className="block">
        Rider ID
        <input
          name="riderId"
          required
          className="mt-1 w-full rounded-md border p-2"
        />
      </label>
      <p className="text-sm text-gray-500">
        Enter only the fields that should change.
      </p>
      <label className="block">
        Full name
        <input name="name" className="mt-1 w-full rounded-md border p-2" />
      </label>
      <label className="block">
        Email
        <input
          name="email"
          type="email"
          className="mt-1 w-full rounded-md border p-2"
        />
      </label>
      <label className="block">
        Phone
        <input
          name="phone"
          type="tel"
          className="mt-1 w-full rounded-md border p-2"
        />
      </label>
      <label className="block">
        Vehicle type
        <select
          name="vehicleType"
          defaultValue=""
          className="mt-1 w-full rounded-md border p-2"
        >
          <option value="">No change</option>
          <option value="bicycle">Bicycle</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="car">Car</option>
        </select>
      </label>
      <label className="block">
        Vehicle registration
        <input
          name="vehicleRegistration"
          className="mt-1 w-full rounded-md border p-2"
        />
      </label>
      <label className="block">
        Status
        <select
          name="status"
          defaultValue=""
          className="mt-1 w-full rounded-md border p-2"
        >
          <option value="">No change</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
      <button className="rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700">
        Update rider
      </button>
      <p className="text-sm text-gray-500">
        Form only; backend submission is not connected.
      </p>
    </form>
  );
}

export default UpdateRider;
