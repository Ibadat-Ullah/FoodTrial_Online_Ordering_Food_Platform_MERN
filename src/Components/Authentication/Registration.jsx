import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(60, "Name is too long."),
  email: z.string().trim().email("Enter a valid email.").max(254, "Email is too long."),
  password: z.string().min(8, "Password must be at least 8 characters.").max(128, "Password is too long."),
  confirmPassword: z.string().min(8, "Confirm your password."),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match.",
});

function Registration() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <section className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow">
        <Link to="/" className="text-2xl font-bold text-orange-600">
          FoodTrial
        </Link>
        <h1 className="text-2xl font-bold">Register</h1>
        <form onSubmit={handleSubmit(() => navigate("/admin"))} noValidate className="space-y-4">
          <label className="block">
            Full name
            <input {...register("name")} className="mt-1 w-full rounded border p-2" />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </label>
          <label className="block">
            Email
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full rounded border p-2"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </label>
          <label className="block">
            Password
            <input
              type="password"
              {...register("password")}
              className="mt-1 w-full rounded border p-2"
            />
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </label>
          <label className="block">
            Confirm password
            <input
              type="password"
              {...register("confirmPassword")}
              className="mt-1 w-full rounded border p-2"
            />
            {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
          </label>
          <button type="submit" className="w-full rounded bg-orange-600 p-2 font-semibold text-white hover:bg-orange-700">
            Register
          </button>
        </form>
        <p className="text-sm text-gray-500">
          Authentication is not connected yet.
        </p>
        <Link
          to="/"
          className="block text-sm text-orange-600 hover:underline"
        >
          Continue as guest
        </Link>
        <Link
          to="/login"
          className="inline-block rounded border border-orange-600 px-4 py-2 text-orange-600 hover:bg-orange-50"
        >
          Already have an account? Login
        </Link>
      </section>
    </main>
  );
}

export default Registration;
