import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import riderController from "../../../controllers/riderController";

const optionalText = z.string().trim().min(2, "Use at least 2 characters.").max(60, "Value is too long.").or(z.literal(""));
const optionalImage = z.custom(
  (files) =>
    !files?.length ||
    (typeof FileList !== "undefined" &&
      files instanceof FileList &&
      files.length === 1 &&
      ["image/jpeg", "image/png", "image/webp"].includes(files[0].type) &&
      files[0].size <= 5 * 1024 * 1024),
  "Choose a JPEG, PNG, or WebP image up to 5 MB.",
);
const schema = z.object({
  riderId: z.string().trim().min(1, "Enter a rider ID.").max(64, "Rider ID is too long."),
  name: optionalText,
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email.").max(254, "Email is too long.")]),
  phone: z.string().trim().regex(/^(?=.*\d)\+?[0-9()\-\s]{7,20}$/, "Enter a valid phone number.").or(z.literal("")),
  deliveryZone: z.string().trim().max(100, "Delivery zone is too long."),
  vehicleType: z.enum(["", "bicycle", "motorcycle", "car"]),
  vehicleRegistration: z.string().trim().regex(/^(?=.*[A-Za-z0-9])[A-Za-z0-9 -]{3,15}$/, "Enter a valid registration.").or(z.literal("")),
  status: z.enum(["", "active", "inactive"]),
  profileImage: optionalImage,
}).refine(
  ({ name, email, phone, deliveryZone, vehicleType, vehicleRegistration, status, profileImage }) =>
    [name, email, phone, deliveryZone, vehicleType, vehicleRegistration, status].some((value) => value !== "") ||
    Boolean(profileImage?.length),
  { path: ["name"], message: "Enter at least one field to update." },
);

function UpdateRider() {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      deliveryZone: "",
      vehicleType: "",
      vehicleRegistration: "",
      status: "",
    },
  });

  const onSubmit = async ({ riderId, profileImage, ...fields }) => {
    setMessage("");
    const values = Object.fromEntries(
      Object.entries(fields).filter(([, value]) => value !== ""),
    );
    if (profileImage?.length) values.profileImage = profileImage;
    try {
      await riderController.update(riderId, values);
      reset();
      setMessage("Rider updated.");
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
      <h2 className="text-xl font-semibold">Update Rider</h2>
      <label className="block">
        Rider ID
        <input
          {...register("riderId")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.riderId && <p className="text-sm text-red-600">{errors.riderId.message}</p>}
      </label>
      <p className="text-sm text-gray-500">
        Enter only the fields that should change.
      </p>
      <label className="block">
        Full name
        <input {...register("name")} className="mt-1 w-full rounded-md border p-2" />
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
        Delivery zone
        <input {...register("deliveryZone")} className="mt-1 w-full rounded-md border p-2" />
        {errors.deliveryZone && <p className="text-sm text-red-600">{errors.deliveryZone.message}</p>}
      </label>
      <label className="block">
        Vehicle type
        <select
          {...register("vehicleType")}
          defaultValue=""
          className="mt-1 w-full rounded-md border p-2"
        >
          <option value="">No change</option>
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
        Status
        <select
          {...register("status")}
          defaultValue=""
          className="mt-1 w-full rounded-md border p-2"
        >
          <option value="">No change</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.status && <p className="text-sm text-red-600">{errors.status.message}</p>}
      </label>
      <label className="block">
        Replace rider profile photo (optional)
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          {...register("profileImage")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.profileImage && <p className="text-sm text-red-600">{errors.profileImage.message}</p>}
      </label>
      <button disabled={isSubmitting} className="rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 disabled:opacity-50">
        {isSubmitting ? "Updating..." : "Update rider"}
      </button>
      {message && <p role="status" className="text-sm text-gray-700">{message}</p>}
    </form>
  );
}

export default UpdateRider;
