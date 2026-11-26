import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import foodController from "../../../controllers/foodController";

const imageFile = z.custom(
  (files) =>
    typeof FileList !== "undefined" &&
    files instanceof FileList &&
    files.length === 1 &&
    ["image/jpeg", "image/png", "image/webp"].includes(files[0].type) &&
    files[0].size <= 5 * 1024 * 1024,
  "Choose a JPEG, PNG, or WebP image up to 5 MB.",
);

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(80, "Name is too long."),
  category: z.string().trim().min(2, "Category must be at least 2 characters.").max(40, "Category is too long."),
  description: z.string().trim().min(10, "Description must be at least 10 characters.").max(500, "Description is too long."),
  price: z.coerce.number().finite().positive("Price must be greater than zero.").max(100000, "Price is too high."),
  image: imageFile,
});

function CreateFood() {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values) => {
    setMessage("");
    try {
      await foodController.create(values);
      reset();
      setMessage("Food created.");
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
      <h2 className="text-xl font-semibold">Create Food</h2>
      <label className="block">
        Food name
        <input
          {...register("name")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </label>
      <label className="block">
        Category
        <input
          {...register("category")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.category && <p className="text-sm text-red-600">{errors.category.message}</p>}
      </label>
      <label className="block">
        Description
        <textarea
          {...register("description")}
          rows="3"
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
      </label>
      <label className="block">
        Price (PKR)
        <input
          type="number"
          step="0.01"
          {...register("price")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
      </label>
      <label className="block">
        Food image
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          {...register("image")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}
      </label>
      <button disabled={isSubmitting} className="rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 disabled:opacity-50">
        {isSubmitting ? "Saving..." : "Create food"}
      </button>
      {message && <p role="status" className="text-sm text-gray-700">{message}</p>}
    </form>
  );
}

export default CreateFood;
