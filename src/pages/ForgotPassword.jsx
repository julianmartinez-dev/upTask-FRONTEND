import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email === ''){
      setAlert({ msg: "Please enter your email address", error: true });
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/forgot-password`;
      const { data } = await axios.post(url, { email });
      setAlert({ msg: data.msg, error: false });
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }

  }

  const { msg } = alert;
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recover your access and don't lose your{' '}
        <span className="text-slate-700">projects</span>
      </h1>

      <form action="" className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
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
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Send me instructions"
          className=" bg-sky-700 py-3 text-white uppercase font-bold rounded w-full hover:cursor-pointer hover:bg-sky-800 transition-colors mt-5"
        />

        { msg && <Alert alert={alert}/>}
      </form>

      <nav className="lg:flex lg:justify-between text-center px-4">
        <Link
          to="/"
          className="text-sky-700 hover:text-sky-800 block mb-3 md:mb-0"
        >
          Already have an account? Sign In
        </Link>
        <Link
          to="/register"
          className="text-sky-700 hover:text-sky-800 block mb-3 md:mb-0"
        >
          Sign up for an Account
        </Link>
      </nav>
    </>
  );
}

export default ForgotPassword