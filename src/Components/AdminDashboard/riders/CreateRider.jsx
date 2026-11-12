function CreateRider() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="mx-auto max-w-xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Create Rider</h2>
      <label className="block">
        Full name
        <input
          name="name"
          required
          className="mt-1 w-full rounded-md border p-2"
        />
      </label>
      <label className="block">
        Email
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border p-2"
        />
      </label>
      <label className="block">
        Phone
        <input
          name="phone"
          type="tel"
          required
          className="mt-1 w-full rounded-md border p-2"
        />
      </label>
      <label className="block">
        Vehicle type
        <select
          name="vehicleType"
          required
          defaultValue=""
          className="mt-1 w-full rounded-md border p-2"
        >
          <option value="" disabled>
            Select a vehicle
          </option>
          <option value="bicycle">Bicycle</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="car">Car</option>
        </select>
      </label>
      <label className="block">
        Vehicle registration
        <input
          name="vehicleRegistration"
          required
          className="mt-1 w-full rounded-md border p-2"
        />
      </label>
      <button className="rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700">
        Create rider
      </button>
      <p className="text-sm text-gray-500">
        Form only; backend submission is not connected.
      </p>
    </form>
  );
}

export default CreateRider;
