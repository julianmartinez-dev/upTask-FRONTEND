import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import Loading from '../components/Loading';
import FormProject from '../components/FormProject';

const EditProject = () => {
  const { id } = useParams();
  const { getProject, project, loading } = useProjects();

  useEffect(() => {
    getProject(id);
  }, []);

  if(loading) return (<Loading/>)
  return (
    <>
      <h1 className="font-black text-4xl">Edit Project: {project.name}</h1>
      <div className="mt-10 flex justify-center">
        <FormProject project={project}/>
      </div>
    </>
  );
};

export default EditProject;
