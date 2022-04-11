import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient.js";
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth.jsx";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(email === "" || password === "") {
      setAlert({msg : "Please fill in all fields", error : true})
      return;
    }
    setAlert({})
    try {
      const { data } = await axiosClient.post('/users/login', {email, password});
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/projects")
    } catch (error) {
      setAlert({msg : error.response.data.msg, error : true})
    }

  }

  const { msg } = alert;
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Sign In in and manage all your{' '}
        <span className="text-slate-700">projects</span>
      </h1>

      <form
        action=""
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div>
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
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Login"
          className=" bg-sky-700 py-3 text-white uppercase font-bold rounded w-full hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />

        {msg && <Alert alert={alert} />}
      </form>

      <nav className="lg:flex lg:justify-between text-center px-4">
        <Link
          to="/register"
          className="text-sky-700 hover:text-sky-800 block mb-3 md:mb-0"
        >
          Sign up for an Account
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

export default Login