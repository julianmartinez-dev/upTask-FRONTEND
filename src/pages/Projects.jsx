import useProjects from '../hooks/useProjects';
import { useEffect } from 'react';
import PreviewProject from '../components/PreviewProject';

const Projects = () => {
  const { projects, getProjects } = useProjects();

  useEffect(() => {
    getProjects();
  }, []);
  return (
    <>
      <h1 className="text-4xl font-black">Projects</h1>
      <div className="bg-white shadow mt-10 rounded-lg text-center">
        {projects.length ? (
          projects.map((project) => (
            <PreviewProject key={project._id} project={project} />
          ))
        ) : (
          <p className="mt-5 text-center text-gray-600 uppercase p-5">
            There's no projects to show
          </p>
        )}
      </div>
    </>
  );
};

export default Projects;
