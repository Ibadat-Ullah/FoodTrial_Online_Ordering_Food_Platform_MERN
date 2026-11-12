import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(60, "Name is too long."),
  email: z.string().trim().email("Enter a valid email.").max(254, "Email is too long."),
  phone: z.string().trim().regex(/^(?=.*\d)\+?[0-9()\-\s]{7,20}$/, "Enter a valid phone number."),
  vehicleType: z.enum(["bicycle", "motorcycle", "car"], {
    error: "Select a vehicle type.",
  }),
  vehicleRegistration: z.string().trim().min(3, "Registration must be at least 3 characters.").max(15, "Registration is too long.").regex(/^[A-Za-z0-9][A-Za-z0-9 -]*$/, "Use letters, numbers, spaces, or hyphens."),
});

function CreateRider() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(() => {})}
      noValidate
      className="mx-auto max-w-xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Create Rider</h2>
      <label className="block">
        Full name
        <input
          {...register("name")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </label>
      <label className="block">
        Email
        <input
          type="email"
          {...register("email")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </label>
      <label className="block">
        Phone
        <input
          type="tel"
          {...register("phone")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
      </label>
      <label className="block">
        Vehicle type
        <select
          {...register("vehicleType")}
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
        {errors.vehicleType && <p className="text-sm text-red-600">{errors.vehicleType.message}</p>}
      </label>
      <label className="block">
        Vehicle registration
        <input
          {...register("vehicleRegistration")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.vehicleRegistration && <p className="text-sm text-red-600">{errors.vehicleRegistration.message}</p>}
      </label>
      <button type="submit" className="rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700">
        Create rider
      </button>
      <p className="text-sm text-gray-500">
        Form only; backend submission is not connected.
      </p>
    </form>
  );
}

export default CreateRider;
