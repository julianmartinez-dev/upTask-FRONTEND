import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProject = ({project}) => {

    const { auth } = useAuth();
    const { name, _id, client, creator } = project;
  return (
    <div className="border-b p-5 flex gap-4 items-center flex-wrap">
      <p>
        {name}
        <span className="text-sm text-gray-500 uppercase"> {client}</span>
      </p>

      {auth._id !== creator && <p className="p-2 bg-green-700/30 text-xs uppercase rounded-md border-2 border-green-800">Collaborator</p>}

      <Link
        to={`${_id}`}
        className="md:ml-auto text-gray-600 hover:text-gray-800 font-bold uppercase"
      >
        Show Project
      </Link>
    </div>
  );
}

export default PreviewProject