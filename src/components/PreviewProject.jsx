import { Link } from "react-router-dom";

const PreviewProject = ({project}) => {

    const { name, _id, client } = project;
  return (
    <div className="border-b p-5 flex">

        <p>
            {name}
            <span className="text-sm text-gray-500 uppercase">{' '}{client}</span>
        </p>

        <Link to={`${_id}`} className="ml-auto text-gray-600 hover:text-gray-800 font-bold uppercase">Show Project</Link>
    </div>
  )
}

export default PreviewProject