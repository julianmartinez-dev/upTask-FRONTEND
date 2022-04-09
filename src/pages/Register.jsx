import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Sign up and manage your <span className="text-slate-700">projects</span>
      </h1>

      <form action="" className="my-10 bg-white shadow rounded-lg p-10">
        <div>
          <label
            htmlFor="name"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Name
          </label>
          <input
            type="name"
            id="name"
            placeholder="Your Name"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Repeat Password
          </label>
          <input
            type="password"
            id="password2"
            placeholder="Repeat password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value="Sign Up"
          className=" bg-sky-700 py-3 text-white uppercase font-bold rounded w-full hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between text-center px-4">
        <Link
          to="/"
          className="text-sky-700 hover:text-sky-800 block mb-3 md:mb-0"
        >
          Already have an account? Sign In
        </Link>
        <Link
          to="/forgot-password"
          className="text-sky-700 hover:text-sky-800 block"
        >
          Forgot Password?
        </Link>
      </nav>
    </>
  );
}

export default Register