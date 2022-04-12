import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import Loading from '../components/Loading';
import ModalTaskForm from '../components/ModalTaskForm';

const Project = () => {
  const { id } = useParams();
  const { getProject, project, loading, handleModalTask } = useProjects();
  
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getProject(id);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <div className="flex justify-between md:mt-3">
        <h1 className="font-black text-4xl">{project.name}</h1>
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>

          <Link to={`/projects/edit/${id}`} className="uppercase font-bold">
            Edit
          </Link>
        </div>
      </div>
      <button
        type="button"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex items-center gap-1 justify-center"
        onClick={handleModalTask}
      >
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
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        New Task
      </button>

      <ModalTaskForm/>
    </>
  );
};

export default Project;
