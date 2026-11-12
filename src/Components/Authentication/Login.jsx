function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <section className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow">
        <a href="#home" className="text-2xl font-bold text-orange-600">
          FoodTrial
        </a>
        <h1 className="text-2xl font-bold">Login</h1>
        <form
          onSubmit={(event) => event.preventDefault()}
          className="space-y-4"
        >
          <label className="block">
            Email
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <label className="block">
            Password
            <input
              name="password"
              type="password"
              minLength={8}
              required
              className="mt-1 w-full rounded border p-2"
            />
          </label>
          <button className="w-full rounded bg-orange-600 p-2 font-semibold text-white hover:bg-orange-700">
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500">
          Authentication is not connected yet.
        </p>
        <a
          href="#home"
          className="block text-sm text-orange-600 hover:underline"
        >
          Continue as guest
        </a>
        <a
          href="#register"
          className="inline-block rounded border border-orange-600 px-4 py-2 text-orange-600 hover:bg-orange-50"
        >
          Create an account
        </a>
      </section>
    </main>
  );
}

export default Login;
