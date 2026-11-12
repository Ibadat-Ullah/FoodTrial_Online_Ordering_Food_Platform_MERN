import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(80, "Name is too long."),
  category: z.string().trim().min(2, "Category must be at least 2 characters.").max(40, "Category is too long."),
  description: z.string().trim().min(10, "Description must be at least 10 characters.").max(500, "Description is too long."),
  price: z.coerce.number().finite().positive("Price must be greater than zero.").max(100000, "Price is too high."),
  image: z.string().trim().url("Enter a valid image URL.").max(2048, "Image URL is too long."),
});

function CreateFood() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(() => {})}
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
        Price
        <input
          type="number"
          step="0.01"
          {...register("price")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
      </label>
      <label className="block">
        Image URL
        <input
          type="url"
          {...register("image")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}
      </label>
      <button type="submit" className="rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-700">
        Create food
      </button>
      <p className="text-sm text-gray-500">
        Form only; backend submission is not connected.
      </p>
    </form>
  );
}

export default CreateFood;
