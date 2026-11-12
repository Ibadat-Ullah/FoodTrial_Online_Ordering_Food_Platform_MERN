import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  foodId: z.string().trim().min(1, "Enter a food ID.").max(64, "Food ID is too long."),
  confirmDelete: z.boolean().refine(Boolean, "Confirm the deletion."),
});

function DeleteFood() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(() => {})}
      noValidate
      className="mx-auto max-w-xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Delete Food</h2>
      <label className="block">
        Food ID
        <input
          {...register("foodId")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.foodId && <p className="text-sm text-red-600">{errors.foodId.message}</p>}
      </label>
      <label className="flex items-start gap-2">
        <input {...register("confirmDelete")} type="checkbox" className="mt-1" />
        <span>
          Confirm deletion of this food item.
          {errors.confirmDelete && <span className="block text-sm text-red-600">{errors.confirmDelete.message}</span>}
        </span>
      </label>
      <button type="submit" className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700">
        Delete food
      </button>
      <p className="text-sm text-gray-500">
        Form only; backend submission is not connected.
      </p>
    </form>
  );
}

export default DeleteFood;
