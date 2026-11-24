import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiError, ridersApi } from "../../../service/api";

const schema = z.object({
  riderId: z.string().trim().min(1, "Enter a rider ID.").max(64, "Rider ID is too long."),
  confirmDelete: z.boolean().refine(Boolean, "Confirm the deletion."),
});

function DeleteRider() {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ riderId }) => {
    setMessage("");
    try {
      await ridersApi.remove(riderId);
      reset();
      setMessage("Rider deleted.");
    } catch (error) {
      setMessage(apiError(error));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
      <button disabled={isSubmitting} className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50">
        {isSubmitting ? "Deleting..." : "Delete rider"}
      </button>
      {message && <p role="status" className="text-sm text-gray-700">{message}</p>}
    </form>
  );
}

export default DeleteRider;
