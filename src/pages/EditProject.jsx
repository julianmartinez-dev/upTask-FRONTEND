import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import Loading from '../components/Loading';
import FormProject from '../components/FormProject';

const EditProject = () => {
  const { id } = useParams();
  const { getProject, project, loading, deleteProject } = useProjects();

  useEffect(() => {
    getProject(id);
  }, []);

  const handleDelete = async () => {
    if(confirm('Are you sure?')){
      deleteProject(id)
    }
  }

  if(loading) return (<Loading/>)
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">Edit Project: {project.name}</h1>

        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <button className="uppercase font-bold" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <FormProject project={project} />
      </div>
    </>
  );
};

export default EditProject;
