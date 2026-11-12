import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  riderId: z.string().trim().min(1, "Enter a rider ID.").max(64, "Rider ID is too long."),
  confirmDelete: z.boolean().refine(Boolean, "Confirm the deletion."),
});

function DeleteRider() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(() => {})}
      noValidate
      className="mx-auto max-w-xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Delete Rider</h2>
      <label className="block">
        Rider ID
        <input
          {...register("riderId")}
          className="mt-1 w-full rounded-md border p-2"
        />
        {errors.riderId && <p className="text-sm text-red-600">{errors.riderId.message}</p>}
      </label>
      <label className="flex items-start gap-2">
        <input {...register("confirmDelete")} type="checkbox" className="mt-1" />
        <span>
          Confirm deletion of this rider.
          {errors.confirmDelete && <span className="block text-sm text-red-600">{errors.confirmDelete.message}</span>}
        </span>
      </label>
      <button type="submit" className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700">
        Delete rider
      </button>
      <p className="text-sm text-gray-500">
        Form only; backend submission is not connected.
      </p>
    </form>
  );
}

export default DeleteRider;
