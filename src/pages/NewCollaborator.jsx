import { useEffect } from "react"
import useProjects from "../hooks/useProjects"
import { useParams } from "react-router-dom"
import FormCollaborator from "../components/FormCollaborator"
import Alert from "../components/Alert"

const NewCollaborator = () => {

    const { getProject, project, collaborator, addCollaborator,alert } =
      useProjects();
    const params = useParams();

    useEffect(() => {
        getProject(params.id);
    },[])
    
    const { msg } = alert;
  return (
    <>
        <h1 className="text-4xl font-black">Add Collaborator to project: <span className="text-gray-600">{project.name}</span></h1>

        <div className="mt-10 flex justify-center">
            <FormCollaborator />
        </div>

        { collaborator._id && (
        <div className="mt-10 flex justify-center">
            <div className="bg-white py-10 md:w-1/2 rounded-lg shadow">
                <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>
                <div className="flex justify-between items-center px-2">
                    <p>{collaborator.name}</p>
                    <button className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm" type="button"
                        onClick={() => addCollaborator(collaborator.email)}
                    >
                        Add collaborator to project
                    </button>
                </div>
            </div>
        </div>
        )}
    </>
  )
}

export default NewCollaborator