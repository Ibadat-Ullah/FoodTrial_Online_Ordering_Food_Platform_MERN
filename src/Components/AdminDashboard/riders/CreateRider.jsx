import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import riderController from "../../../controllers/riderController";

const profileImage = z.custom(
  (files) =>
    !files?.length ||
    (typeof FileList !== "undefined" &&
      files instanceof FileList &&
      files.length === 1 &&
      ["image/jpeg", "image/png", "image/webp"].includes(files[0].type) &&
      files[0].size <= 4 * 1024 * 1024),
  "Choose a JPEG, PNG, or WebP image up to 4 MB.",
);

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(60, "Name is too long."),
  email: z.string().trim().email("Enter a valid email.").max(254, "Email is too long."),
  phone: z.string().trim().regex(/^(?=.*\d)\+?[0-9()\-\s]{7,20}$/, "Enter a valid phone number."),
  deliveryZone: z.string().trim().max(100, "Delivery zone is too long."),
  vehicleType: z.enum(["bicycle", "motorcycle", "car"], {
    error: "Select a vehicle type.",
  }),
  vehicleRegistration: z.string().trim().min(3, "Registration must be at least 3 characters.").max(15, "Registration is too long.").regex(/^[A-Za-z0-9][A-Za-z0-9 -]*$/, "Use letters, numbers, spaces, or hyphens."),
  profileImage,
});

function CreateRider() {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { deliveryZone: "" },
  });

  const onSubmit = async (values) => {
    setMessage("");
    try {
      await riderController.create(values);
      reset();
      setMessage("Rider created.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        Delivery zone (optional)
        <input
          {...register("deliveryZone")}
          placeholder="e.g. Gulberg"
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.deliveryZone && <p className="text-sm text-red-600">{errors.deliveryZone.message}</p>}
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
      <label className="block">
        Rider profile photo (optional)
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          {...register("profileImage")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.profileImage && <p className="text-sm text-red-600">{errors.profileImage.message}</p>}
      </label>
      <button disabled={isSubmitting} className="rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 disabled:opacity-50">
        {isSubmitting ? "Saving..." : "Create rider"}
      </button>
      {message && <p role="status" className="text-sm text-gray-700">{message}</p>}
    </form>
  );
}

export default CreateRider;
