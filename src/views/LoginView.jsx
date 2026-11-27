import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../context/useAuth";
import { apiError } from "../service/api";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email.").max(254, "Email is too long."),
  password: z.string().min(8, "Password must be at least 8 characters.").max(72, "Password must be at most 72 characters."),
});

function LoginView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      const session = await signIn(values);
      const returnPath = location.state?.from?.pathname;
      const destination = session.user.role === "admin"
        ? "/admin"
        : returnPath && returnPath !== "/admin"
          ? returnPath
          : "/";
      navigate(destination, { replace: true });
    } catch (error) {
      setError("root", { message: apiError(error) });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <section className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow">
        <Link to="/" className="text-2xl font-bold text-orange-600">
          FoodTrial
        </Link>
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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
          {errors.root && <p role="alert" className="text-sm text-red-600">{errors.root.message}</p>}
          <button disabled={isSubmitting} type="submit" className="w-full rounded bg-orange-600 p-2 font-semibold text-white hover:bg-orange-700 disabled:opacity-50">
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <Link
          to="/"
          className="block text-sm text-orange-600 hover:underline"
        >
          Continue as guest
        </Link>
        <Link
          to="/register"
          state={location.state}
          className="inline-block rounded border border-orange-600 px-4 py-2 text-orange-600 hover:bg-orange-50"
        >
          Create an account
        </Link>
      </section>
    </main>
  );
}

export default LoginView;
