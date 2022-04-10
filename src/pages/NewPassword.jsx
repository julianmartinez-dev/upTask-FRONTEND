import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient.js";

const NewPassword = () => {
  
  const [validToken, setValidToken ] = useState(false)
  const [alert, setAlert] = useState({})
  const [password, setPassword] = useState("")
  const [passwordChanged, setPasswordChanged] = useState(false)

  const { token } = useParams();

  useEffect(() => {
    const checkToken = async () => {
      try {
        //Check if token is valid and user exists
        await axiosClient(`/users/forgot-password/${token}`)
        setValidToken(true) 
      } catch (error) {
        setAlert({ msg : error.response.data.msg, error: true })
      }
    }
    checkToken()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(password === ''){
      setAlert({ msg: "Password is required", error: true })
      return
    }
    if(password.length < 6) {
      setAlert({ msg: "Password must be at least 6 characters long", error: true })
      return
    }

    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const { data } = await axios.post(`${url}/api/users/forgot-password/${token}`, { password })
      setAlert({ msg: data.msg, error: false })
      setPasswordChanged(true)
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true })
    }
  }

  const { msg } = alert;
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restart password and don't lose your{' '}
        <span className="text-slate-700">projects</span>
      </h1>

      {validToken ? (
        <form
          action=""
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              New Password
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
            value="Change password"
            className=" bg-sky-700 py-3 text-white uppercase font-bold rounded w-full hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />

          {msg && <Alert alert={alert} />}
          {passwordChanged && (
            <Link
              to="/"
              className="text-sky-700 block mb-3 md:mb-0 text-center font-bold border-2 border-sky-800 rounded-lg p-3 hover:text-white hover:bg-sky-800 uppercase transition-colors"
            >
              Sign In
            </Link>
          )}
        </form>
      ) : (
        <Alert alert={alert} />
      )}
    </>
  );
}

export default NewPassword