import { useState } from "react";
import useProjects from "../hooks/useProjects";
import { useNavigate } from "react-router-dom";

import Alert from "./Alert";

const FormCollaborator = () => {
  
  const [email, setEmail] = useState('')

  const { submitCollaborator, alert, setAlert } = useProjects()
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if(email === ''){
      setAlert({msg: 'Email is required', error: true})
    }else{
      await submitCollaborator(email)
      setEmail('')
    }
  }
  
  const { msg } = alert;
  return (
    <form action="" className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
     onSubmit={handleSubmit}
    >
      <div className="mb-5">
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email Address:
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email collaborator..."
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Search collaborator"
        className="py-2 px-4 uppercase font-bold bg-sky-500 text-white text-center w-full rounded-md hover:cursor-pointer mt-3 hover:bg-sky-600 transition-colors"
      />

      {msg && <Alert alert={alert} />}
    </form>
  );
}

export default FormCollaborator